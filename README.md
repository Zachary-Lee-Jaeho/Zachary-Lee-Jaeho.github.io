# Jaeho Lee - Modular CV Website

A static, data-driven CV website built with modular HTML, CSS, and Vanilla JavaScript.

## 📂 Directory Structure

The project follows a deeply modular architecture to separate concerns and ensure maintainability.

- **`assets/`**: Contains static resources like images and fonts.
- **`css/`**: Contains stylesheets (e.g., `style.css`).
- **`js/`**: Core JavaScript logic and data, structured by domain.
    - **`common/`**: Shared resources used across the entire site (e.g., `data_profile.js`).
    - **`main/`**: Logic (`index.js`) and data (`data_cv.js`) specific to the **Main CV Page** (`index.html`).
    - **`misc/`**: Logic (`index.js`) and data (`data_misc.js`) specific to the **Miscellaneous Page** (`misc.html`).
        - Includes sub-modules for distinct features like **Call for Papers** (`cfp/`) and **Blog** (`blog/`).

## 📐 Design Principles

1.  **Modular Architecture**:
    Code is strictly separated by domain (`Main` vs `Misc`) and by layer (Logic vs Data). This prevents spaghetti code and makes it easy to add new pages or features without affecting the core CV.

2.  **Data-Driven Content**:
    Content is decoupled from the specific HTML structure. All dynamic information (CV entries, deadlines, profile info) is stored in `data_*.js` files. To update your CV, you only need to edit the data files, not the HTML.

3.  **Lightweight & Standard**:
    Built using standard Web components (ES6 Modules) without the need for heavy frameworks or complex build steps.

## 🚀 How to Run

### Local Development
Since this project uses ES Modules (`type="module"`), you need a local server to run it (browsers block file protocol imports for security).

1.  **Using VS Code Live Server** (Recommended):
    -   Right-click `index.html` → Select **Open with Live Server**.
2.  **Using Python**:
    -   Run `python3 -m http.server` in the project root.

### Deployment
Simply upload all files to any static hosting service (GitHub Pages, Vercel, Netlify). No build command is required.

## 📝 How to Update

-   **Update Profile**: Edit `js/common/data_profile.js`.
-   **Update CV (Education, Publications)**: Edit `js/main/data_cv.js`.
-   **Update Misc Page Tabs**: Edit `js/misc/data_misc.js` or `js/misc/cfp/data_cfp.js`.
