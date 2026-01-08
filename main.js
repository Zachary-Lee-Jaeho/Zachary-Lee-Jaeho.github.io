import { profile, navigation, sections, publications } from './data.js';

// --- Rendering Logic ---

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Profile Section
    let contactHTML = profile.contact.map(item => `
        <div class="contact-item">
            <i class="${item.icon}" style="width: 20px;"></i>
            ${item.link ? `<a href="${item.link}" target="${item.link.startsWith('http') ? '_blank' : '_self'}">${item.text}</a>` : `<span>${item.text}</span>`}
        </div>
    `).join('');

    // Navigation Section
    let navHTML = navigation.map(nav => `
        <a href="${nav.link || '#' + nav.id}" class="nav-link">
            ${nav.icon ? `<i class="${nav.icon}" style="margin-right: 8px; font-size: 0.9em;"></i>` : ''}${nav.label}
        </a>
    `).join('');

    sidebar.innerHTML = `
        <div class="profile-section">
            <img src="${profile.image}" alt="${profile.name}" class="profile-img">
            <div>
                <a href="index.html" style="text-decoration: none; color: inherit;">
                    <h1 class="profile-name">${profile.name}</h1>
                </a>
                <div class="profile-role">${profile.role}</div>
            </div>
            
            <div class="contact-info">
                ${contactHTML}
            </div>
        </div>

        <nav class="nav-menu">
            ${navHTML}
        </nav>
    `;
}

function renderCVContent() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Education
    const eduHTML = sections.education.map(item => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            <div class="item-subtitle">${item.subtitle}</div>
            ${item.details ? `<div class="item-details">${item.details}</div>` : ''}
        </div>
    `).join('');

    // 2. Experience
    const expHTML = sections.experience.map(item => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            <div class="item-subtitle">${item.subtitle}</div>
            <div class="location">${item.location}</div>
            <div class="item-details">
                <ul class="details-list">
                    ${item.detailsList.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // 3. Publications
    // Helper to render pub list
    const renderPubList = (list) => {
        return list.map(pub => {
            const isInteractive = (pub.type === 'journal' || pub.type === 'conf');
            
            return `
            <div class="pub-item type-${pub.type}" ${isInteractive ? `data-id="${pub.id}"` : ''}>
                <div class="pub-title">${pub.title}</div>
                <div class="pub-authors">${pub.authors}</div>
                <div class="pub-venue">${pub.venue}</div>
                ${pub.note ? `<div class="pub-note">${pub.note}</div>` : ''}
            </div>
            `;
        }).join('');
    };

    // 4. Activities
    const actHTML = sections.activities.map(item => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            <div class="item-details">${item.details}</div>
        </div>
    `).join('');

    // 5. Teaching
    const teachHTML = sections.teaching.map(item => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            <div class="item-subtitle">${item.subtitle}</div>
            <div class="item-details">${item.detailsHTML}</div>
        </div>
    `).join('');

    // Assemble Main HTML
    main.innerHTML = `
        <section id="education">
            <h2>Education</h2>
            ${eduHTML}
        </section>

        <section id="experience">
            <h2>Experience</h2>
            ${expHTML}
        </section>

        <section id="publications">
            <h2>Publications</h2>
            
            <div class="publication-group">
                <h3>Refereed Journal Publications</h3>
                <div class="pub-list">
                    ${renderPubList(publications.journals)}
                </div>
            </div>

            <div class="publication-group">
                <h3>Refereed Conference Publications</h3>
                <div class="pub-list">
                    ${renderPubList(publications.conferences)}
                </div>
            </div>

            <div class="publication-group">
                <h3>Refereed Poster Publications</h3>
                <div class="pub-list">
                    ${renderPubList(publications.posters)}
                </div>
            </div>

            <div class="publication-group">
                <h3>Patents</h3>
                <div class="pub-list">
                    ${renderPubList(publications.patents)}
                </div>
            </div>
        </section>

        <section id="activities">
            <h2>Activities</h2>
            ${actHTML}
        </section>

        <section id="teaching">
            <h2>Teaching</h2>
            ${teachHTML}
        </section>
    `;
    
    // Setup click listeners for publications AFTER rendering
    document.querySelectorAll('.pub-item').forEach(item => {
        item.addEventListener('click', () => {
             const id = item.getAttribute('data-id');
             if(id) openModal(id);
        });
    });
}

function renderMiscPage() {
    const main = document.getElementById('misc-main');
    if (!main) return;

    // Check if sections.misc exists to avoid error
    if (!sections.misc || !sections.misc.tabs) {
        main.innerHTML = "<h2>Miscellaneous</h2><p>Content under construction.</p>";
        return;
    }

    const miscTabsHeader = sections.misc.tabs.map((tab, index) => `
        <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">${tab.title}</button>
    `).join('');

    const miscTabsContent = sections.misc.tabs.map((tab, index) => `
        <div class="tab-content ${index === 0 ? 'active' : ''}" id="tab-${tab.id}">
            ${tab.content}
        </div>
    `).join('');

    main.innerHTML = `
        <section id="misc-page">
            <h2>Miscellaneous</h2>
            <div class="tabs-container">
                <div class="tabs-header">
                    ${miscTabsHeader}
                </div>
                <div class="tabs-body">
                    ${miscTabsContent}
                </div>
            </div>
            
            <div style="margin-top: 2rem;">
               <a href="index.html" style="color: var(--accent); text-decoration: none;">&larr; Back to Main CV</a>
            </div>
        </section>
    `;

    // Setup click listeners for Tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active to current
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const content = document.getElementById(`tab-${tabId}`);
            if(content) content.classList.add('active');
        });
    });

    // Mock/Auto Update CFP (Simple Simulation)
    const cfpList = document.getElementById('cfp-list');
    if (cfpList) {
        // Simulating data fetch
        setTimeout(() => {
            const deadlines = [
                { name: "ICLR 2026", date: "Oct 2025 (Expected)", tags: ["AI", "ML"] },
                { name: "ICML 2026", date: "Jan 2026 (Expected)", tags: ["ML"] },
                { name: "NeurIPS 2026", date: "May 2026 (Expected)", tags: ["AI", "ML"] },
                { name: "CVPR 2026", date: "Nov 2025 (Expected)", tags: ["Vision"] }
            ];
            
            cfpList.innerHTML = deadlines.map(d => `
                <li style="margin-bottom: 0.5rem;">
                    <strong>${d.name}</strong> - <span style="color: var(--text-secondary)">${d.date}</span>
                    <br><span style="font-size: 0.8em; opacity: 0.7;">${d.tags.join(', ')}</span>
                </li>
            `).join('');
        }, 500);
    }
}


// --- Modal Logic ---

// Flatten publications for easy lookup
const allPubs = {};
[...publications.journals, ...publications.conferences].forEach(p => {
    if(p.id) allPubs[p.id] = p;
});

const modal = document.getElementById('pub-modal');
const modalTitle = document.getElementById('modal-title');
const modalVenue = document.getElementById('modal-venue');
const modalAbstract = document.getElementById('modal-abstract-text');
const modalLinks = document.getElementById('modal-links');

function openModal(id) {
    const data = allPubs[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalVenue.textContent = data.venue;
    modalAbstract.textContent = data.abstract || "Abstract currently unavailable.";
    
    // Clear links
    modalLinks.innerHTML = '';
    if (data.links && data.links.length > 0) {
        data.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = "_blank";
            a.className = "modal-link-btn";
            
            let iconClass = "fas fa-external-link-alt";
            if (link.type === 'github') {
                iconClass = "fab fa-github";
            } else if (link.type === 'pdf') {
                iconClass = "fas fa-file-pdf";
            }
            
            a.innerHTML = `<i class="${iconClass}"></i> ${link.name}`;
            modalLinks.appendChild(a);
        });
    }

    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Global Expo for close button in HTML (if needed, or add listener)
window.closeModal = closeModal;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Setup Modal Listeners if modal exists
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    renderSidebar();
    
    // Dispatch Render based on Page
    if (document.getElementById('main')) {
        renderCVContent();
    } else if (document.getElementById('misc-main')) {
        renderMiscPage();
    }
});
