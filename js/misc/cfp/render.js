import { deadlines } from './data_cfp.js';

let state = {
    sortBy: 'deadline', // 'deadline' | 'name'
    showPast: false,
    selectedDomains: new Set(), // Set of strings (original tags, e.g. "#OPERATING SYSTEMS")
    filterLogic: 'OR', // 'OR' | 'AND'
    isDomainExpanded: false
};

// Extracted unique tags from data
const allTags = Array.from(new Set(
    deadlines.flatMap(d => d.tags || [])
)).sort();

export function renderCFP() {
    // 1. Controls Section
    const controlsHtml = renderControls();

    // 2. Filter & Sort Data
    let filteredData = filterData();

    if (state.sortBy === 'deadline') {
        filteredData.sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
    } else {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 3. List Section
    const listHtml = `
        <ul id="cfp-list" class="cfp-list">
             ${renderDeadlines(filteredData)}
        </ul>
    `;

    return `
        <div class="publication-group" id="cfp-container">
            <h3>Upcoming Deadlines</h3>
            ${controlsHtml}
            ${filteredData.length > 0 ? listHtml : '<p style="color: var(--text-secondary); padding: 1rem;">No deadlines found matching criteria.</p>'}
        </div>
    `;
}

function renderControls() {
    const domainCount = state.selectedDomains.size;
    const domainBtnLabel = domainCount > 0 ? `Domains (${domainCount})` : 'Domains';

    // Domain Filter Panel (Expanded)
    let filterPanel = '';
    if (state.isDomainExpanded) {
        const domainButtons = allTags.map(tag => {
            const isSelected = state.selectedDomains.has(tag);
            return `<button class="cfp-filter-pill ${isSelected ? 'active' : ''}" data-tag="${tag}">${formatTag(tag)}</button>`;
        }).join('');

        filterPanel = `
            <div class="cfp-filter-panel" id="domain-panel">
                 <div class="filter-panel-header">
                    <span class="filter-label">Logic:</span>
                    <div class="cfp-logic-toggle">
                        <button class="logic-btn ${state.filterLogic === 'OR' ? 'active' : ''}" data-logic="OR">OR</button>
                        <button class="logic-btn ${state.filterLogic === 'AND' ? 'active' : ''}" data-logic="AND">AND</button>
                    </div>
                 </div>
                 <div class="filter-tags-container">
                    ${domainButtons}
                 </div>
            </div>
        `;
    }

    return `
        <div class="cfp-controls-wrapper">
            <div class="cfp-controls">
                <select id="sort-field" class="cfp-select">
                    <option value="deadline" ${state.sortBy === 'deadline' ? 'selected' : ''}>Sort by Deadline</option>
                    <option value="name" ${state.sortBy === 'name' ? 'selected' : ''}>Sort by Name</option>
                </select>
                
                <button id="domain-toggle" class="cfp-toggle-btn ${state.isDomainExpanded || state.selectedDomains.size > 0 ? 'active' : ''}">
                    ${domainBtnLabel} <i class="fas ${state.isDomainExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size: 0.8em; margin-left: 5px;"></i>
                </button>
    
                <button id="past-toggle" class="cfp-toggle-btn ${state.showPast ? 'active' : ''}">Show Past</button>
            </div>
            ${filterPanel}
        </div>
    `;
}

function filterData() {
    return deadlines.filter(d => {
        // Show Past Logic 
        if (!state.showPast && d.deadline) {
            const today = new Date().toISOString().split('T')[0];
            if (d.deadline < today) return false;
        }
        
        // Domain Filtering
        if (state.selectedDomains.size > 0) {
            const itemTags = d.tags || [];
            if (state.filterLogic === 'OR') {
                // Return true if ANY selected domain is present in itemTags
                const hasMatch = itemTags.some(tag => state.selectedDomains.has(tag));
                if (!hasMatch) return false;
            } else {
                // AND: Return true if ALL selected domains are present in itemTags
                const allMatch = Array.from(state.selectedDomains).every(selTag => itemTags.includes(selTag));
                if (!allMatch) return false;
            }
        }

        return true;
    });
}

function formatTag(tag) {
    // Remove '#' and Title Case
    return tag.replace('#', '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}


// --- Events ---

export function setupCFPEvents() {
    const container = document.getElementById('cfp-container');
    if (!container) return; 

    // Sort
    const sortSelect = document.getElementById('sort-field');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            updateList();
        });
    }

    // Past Toggle
    const pastBtn = document.getElementById('past-toggle');
    if (pastBtn) {
        pastBtn.addEventListener('click', () => {
            state.showPast = !state.showPast;
            pastBtn.classList.toggle('active', state.showPast);
            updateList();
        });
    }

    const domainBtn = document.getElementById('domain-toggle');
    if (domainBtn) {
        domainBtn.addEventListener('click', (e) => {
            state.isDomainExpanded = !state.isDomainExpanded;
            reRender(); // Structure change implies re-render (for panel open/close)
        });
    }

    // Attach internal filter panel events
    attachFilterPanelEvents();
}

function attachFilterPanelEvents() {
    const panel = document.getElementById('domain-panel');
    if (!panel) return;

    // Logic Toggles
    const logicBtns = panel.querySelectorAll('.logic-btn');
    logicBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.filterLogic = btn.getAttribute('data-logic');
            
            // Visual update
            logicBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateList();
        });
    });

    // Filter Pills
    const pills = panel.querySelectorAll('.cfp-filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            const tag = pill.getAttribute('data-tag');
            if (state.selectedDomains.has(tag)) {
                state.selectedDomains.delete(tag);
                pill.classList.remove('active');
            } else {
                state.selectedDomains.add(tag);
                pill.classList.add('active');
            }
            updateList();
        });
    });
}

function updateList() {
    // 1. Filter & Sort
    let filteredData = filterData();
    if (state.sortBy === 'deadline') {
        filteredData.sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
    } else {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 2. Update List HTML
    const listContainer = document.getElementById('cfp-list');
    if (listContainer) {
        listContainer.innerHTML = renderDeadlines(filteredData);
    }

    // 3. Update 'Domains (N)' label
    const domainBtn = document.getElementById('domain-toggle');
    if (domainBtn) {
        const count = state.selectedDomains.size;
        // Keep the icon
        const iconHtml = `<i class="fas ${state.isDomainExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size: 0.8em; margin-left: 5px;"></i>`;
        domainBtn.innerHTML = (count > 0 ? `Domains (${count})` : 'Domains') + ' ' + iconHtml; 
    }
}

function reRender() {
    const container = document.getElementById('cfp-container');
    if (container && container.parentElement) {
        container.outerHTML = renderCFP(); // Replacing outerHTML directly
        setupCFPEvents();
    }
}

function renderDeadlines(data) {
    if (!data || data.length === 0) return '';
    
    return data.map(item => {
        let dDayDisplay = item.dDay;
        let isUrgent = false;

        if (item.deadline) {
            const today = new Date();
            const target = new Date(item.deadline);
            const diffTime = target - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if (diffDays >= 0) {
                dDayDisplay = `D-${diffDays}`;
                isUrgent = diffDays <= 7;
            } else {
                 dDayDisplay = `D+${Math.abs(diffDays)}`;
            }
        }
        
        const dDayClass = isUrgent ? 'd-day-badge urgent' : 'd-day-badge';

        return `
        <li class="pub-item cfp-card">
            <!-- Row 1: Header -->
            <div class="pub-header-row">
                <div style="display: flex; align-items: baseline;">
                    ${item.link ? `<a href="${item.link}" target="_blank" class="conference-name">${item.name}</a>` : `<span class="conference-name">${item.name}</span>`}
                    ${item.cycle ? `<span class="conference-cycle">(${item.cycle})</span>` : ''}
                </div>
                ${dDayDisplay ? `<span class="${dDayClass}">${dDayDisplay}</span>` : ''}
            </div>

            <!-- Row 2: Tags & Badges -->
            <div class="pub-tags-row">
                ${(item.tags||[]).map(tag => `<span class="tag-hashtag">${tag}</span>`).join('')}
                ${item.badges?.bk_score ? `<span class="badge-bk21">${item.badges.bk_score}</span>` : ''}
                ${item.badges?.kiise_score ? `<span class="badge-kiise">${item.badges.kiise_score}</span>` : ''}
            </div>

            <!-- Row 3: Details -->
            <div class="pub-details-row">
                <div>
                    <span class="detail-label">Deadline:</span>
                    <span class="detail-value">${item.deadline || 'TBD'}</span>
                </div>
                ${item.location ? `
                <div class="detail-location">
                    <i class="fa-solid fa-location-dot" style="margin-right: 0.3rem;"></i>${item.location}
                </div>` : ''}
            </div>

            <!-- Row 4: Keywords -->
            ${item.keywords && item.keywords.length > 0 ? `
            <div class="pub-keywords-row">
                ${item.keywords.map(kw => `<span class="keyword-pill">${kw}</span>`).join('')}
            </div>` : ''}
        </li>
    `}).join('');
}
