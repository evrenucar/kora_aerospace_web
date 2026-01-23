const loadComponent = async (id, path) => {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        container.innerHTML = html;

        // Dispatch event for any scripts that need to attach listeners to the new DOM
        window.dispatchEvent(new CustomEvent('componentLoaded', { detail: { id } }));
    } catch (e) {
        console.error(`Failed to load component ${path}:`, e);
    }
};

// Automatically load common components
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-container', '/components/navbar.html');
    loadComponent('footer-container', '/components/footer.html');

    // Inject bottom bar container if it doesn't exist (since we didn't add it to HTML files)
    const bottomBarContainer = document.createElement('div');
    bottomBarContainer.id = 'bottom-bar-container';
    document.body.appendChild(bottomBarContainer);
    loadComponent('bottom-bar-container', '/components/bottom-bar.html');
});
