import { deadlines } from './data_cfp.js';

export function renderCFP() {
    // Basic Shell
    const html = `
        <h3>Upcoming Deadlines</h3>
        <ul id="cfp-list" class="cfp-list">
             ${renderDeadlines(deadlines)}
        </ul>
    `;
    return html;
}

function renderDeadlines(data) {
    if (!data || data.length === 0) return '<li>No upcoming deadlines found.</li>';
    
    return data.map(d => `
        <li style="margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
            <strong>${d.name}</strong> 
            <span style="float: right; color: var(--accent); font-weight: bold;">${d.date}</span>
            <br>
            <span style="font-size: 0.85em; color: var(--text-secondary);">${d.tags.join(', ')}</span>
        </li>
    `).join('');
}
