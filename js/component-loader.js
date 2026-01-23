/**
 * Component Loader - Loads and injects shared HTML components
 */

class ComponentLoader {
    constructor() {
        this.cache = new Map();
        this.componentsPath = '/components';
    }

    /**
     * Load a component HTML file
     * @param {string} componentName - Name of component (without .html extension)
     * @returns {Promise<string>} HTML content
     */
    async loadComponent(componentName) {
        if (this.cache.has(componentName)) {
            return this.cache.get(componentName);
        }

        try {
            const response = await fetch(`${this.componentsPath}/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            const html = await response.text();
            this.cache.set(componentName, html);
            return html;
        } catch (error) {
            console.error(`Error loading component: ${componentName}`, error);
            return null;
        }
    }

    /**
     * Inject a component into a target element
     * @param {string} componentName - Name of component
     * @param {string|Element} target - CSS selector or DOM element
     * @param {string} position - 'replace', 'prepend', 'append', 'beforebegin', 'afterend'
     * @returns {Promise<Element|null>} Injected element(s)
     */
    async injectComponent(componentName, target, position = 'replace') {
        const html = await this.loadComponent(componentName);
        if (!html) return null;

        const targetEl = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (!targetEl) {
            console.error(`Target element not found: ${target}`);
            return null;
        }

        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();

        switch (position) {
            case 'replace':
                targetEl.innerHTML = html;
                return targetEl;
            case 'prepend':
                targetEl.prepend(...temp.childNodes);
                return targetEl.firstElementChild;
            case 'append':
                targetEl.append(...temp.childNodes);
                return targetEl.lastElementChild;
            case 'beforebegin':
                targetEl.insertAdjacentHTML('beforebegin', html);
                return targetEl.previousElementSibling;
            case 'afterend':
                targetEl.insertAdjacentHTML('afterend', html);
                return targetEl.nextElementSibling;
            default:
                targetEl.innerHTML = html;
                return targetEl;
        }
    }

    /**
     * Load multiple components and inject them
     * @param {Array<{name: string, target: string, position?: string}>} components
     */
    async loadAll(components) {
        const promises = components.map(({ name, target, position }) =>
            this.injectComponent(name, target, position)
        );
        return Promise.all(promises);
    }

    /**
     * Initialize common page components (navbar, footer, mobile-nav)
     * Call this on every page after DOMContentLoaded
     */
    async initPage() {
        // Load navbar if placeholder exists
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            await this.injectComponent('navbar', navPlaceholder);
        }

        // Load footer if placeholder exists
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            await this.injectComponent('footer', footerPlaceholder);
        }

        // Load mobile nav if placeholder exists
        const mobileNavPlaceholder = document.getElementById('mobile-nav-placeholder');
        if (mobileNavPlaceholder) {
            await this.injectComponent('mobile-nav', mobileNavPlaceholder);
        }

        // Dispatch event for other scripts to know components are ready
        document.dispatchEvent(new CustomEvent('components-loaded'));
    }
}

// Create global instance
const componentLoader = new ComponentLoader();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComponentLoader, componentLoader };
}
