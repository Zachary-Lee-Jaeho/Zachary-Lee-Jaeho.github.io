import { profile } from '../common/data_profile.js';
import { misc_tabs } from './data_misc.js';
import { renderCFP, setupCFPEvents } from './cfp/render.js';
import { renderBlog } from './blog/render.js';

// --- Rendering Logic ---

function renderMiscSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const backNavHTML = `
        <a href="index.html" class="nav-link" style="color: var(--accent);">
            <i class="fas fa-arrow-left" style="margin-right: 8px;"></i> Back to Main CV
        </a>
    `;

    // Profile Section
    let contactHTML = profile.contact.map(item => `
        <div class="contact-item">
            <i class="${item.icon}" style="width: 20px;"></i>
            ${item.link ? `<a href="${item.link}" target="${item.link.startsWith('http') ? '_blank' : '_self'}">${item.text}</a>` : `<span>${item.text}</span>`}
        </div>
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
            ${backNavHTML}
        </nav>
    `;
}


function renderMiscContent() {
    const main = document.getElementById('misc-main');
    if (!main) return;

    // Map Tab IDs to Render Functions
    const renderMap = {
        cfp: renderCFP,
        blog: renderBlog
    };

    // Render Tabs Header
    const tabsHeaderHTML = misc_tabs.map((tab, index) => `
        <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">
            ${tab.title}
        </button>
    `).join('');

    // Render Tabs Content Containers
    const tabsContentHTML = misc_tabs.map((tab, index) => `
        <div class="tab-content ${index === 0 ? 'active' : ''}" id="tab-${tab.id}">
            ${renderMap[tab.id] ? renderMap[tab.id]() : 'Content not found'}
        </div>
    `).join('');

    main.innerHTML = `
        <section id="misc-page">
            <div class="tabs-container">
                <div class="tabs-header" style="justify-content: flex-end; display: flex; gap: 1rem; margin-bottom: 2rem;">
                    ${tabsHeaderHTML}
                </div>
                <div class="tabs-body">
                    ${tabsContentHTML}
                </div>
            </div>
        </section>
    `;

    // Initial Setup for CFP if it's the first tab
    if (misc_tabs.length > 0 && misc_tabs[0].id === 'cfp') {
        setupCFPEvents();
    }

    // Setup Tab Logic
    const tabButtons = main.querySelectorAll('.tab-button');
    const tabContents = main.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
             // Remove active class
             tabButtons.forEach(b => b.classList.remove('active'));
             tabContents.forEach(c => c.classList.remove('active'));

             // Add active class
             btn.classList.add('active');
             const tabId = btn.getAttribute('data-tab');
             const targetContent = document.getElementById(`tab-${tabId}`);
             if(targetContent) {
                 targetContent.classList.add('active');
                 // If switching to CFP, re-setup events just in case (though reRender handles it internally usually, this is safe)
                 if (tabId === 'cfp') {
                     // We might need to re-render if we want to reset state or just ensure events bound
                     // But for now assumes content is static until interacted with.
                     // Actually, if we just show/hide via CSS, events persist.
                     // The renderMap is called once at init.
                 }
             }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('misc-main')) {
        renderMiscSidebar();
        renderMiscContent();
    }
});
