/**
 * Content Loader - Loads YAML content files with localization support
 * Uses js-yaml library for parsing (loaded via CDN)
 */

class ContentLoader {
    constructor() {
        this.cache = new Map();
        this.langStorageKey = 'kora_lang';
        this.supportedLangs = ['en', 'tr'];
        this.currentLang = this.getStoredLang();
    }

    /**
     * Get the stored language preference
     */
    getStoredLang() {
        const stored = localStorage.getItem(this.langStorageKey);
        if (stored && this.supportedLangs.includes(stored)) {
            return stored;
        }
        return 'en';
    }

    /**
     * Set the current language
     */
    setLang(lang) {
        if (this.supportedLangs.includes(lang)) {
            this.currentLang = lang;
            localStorage.setItem(this.langStorageKey, lang);
            document.documentElement.lang = lang;
            return true;
        }
        return false;
    }

    /**
     * Load a YAML content file
     * @param {string} contentFile - Name of content file (without extension)
     * @returns {Promise<Object>} Parsed YAML content
     */
    async loadContent(contentFile) {
        // Check cache first
        if (this.cache.has(contentFile)) {
            return this.cache.get(contentFile);
        }

        try {
            const response = await fetch(`/content/${contentFile}.yaml`);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${contentFile}`);
            }
            const yamlText = await response.text();
            const parsed = jsyaml.load(yamlText);

            // Cache the result
            this.cache.set(contentFile, parsed);
            return parsed;
        } catch (error) {
            console.error(`Error loading content file: ${contentFile}`, error);
            return null;
        }
    }

    /**
     * Get a localized value from a content object
     * Handles nested objects with en/tr keys
     * @param {Object|string} obj - Object with language keys or plain string
     * @returns {string} Localized value
     */
    getLocalizedValue(obj) {
        if (obj === null || obj === undefined) {
            return '';
        }

        if (typeof obj === 'string') {
            return obj;
        }

        if (typeof obj === 'object') {
            // Check if it has language keys
            if (obj[this.currentLang] !== undefined) {
                return obj[this.currentLang];
            }
            // Fallback to English
            if (obj['en'] !== undefined) {
                return obj['en'];
            }
        }

        return String(obj);
    }

    /**
     * Recursively localize all values in an object
     * @param {Object} obj - Object to localize
     * @returns {Object} Localized object
     */
    localizeObject(obj) {
        if (obj === null || obj === undefined) {
            return obj;
        }

        if (typeof obj !== 'object') {
            return obj;
        }

        // Check if this is a language object (has en and/or tr keys directly as strings)
        if (this.isLanguageObject(obj)) {
            return this.getLocalizedValue(obj);
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.localizeObject(item));
        }

        const localized = {};
        for (const [key, value] of Object.entries(obj)) {
            localized[key] = this.localizeObject(value);
        }
        return localized;
    }

    /**
     * Check if an object is a language object (has en/tr keys with string values)
     */
    isLanguageObject(obj) {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return false;
        }

        const keys = Object.keys(obj);
        const langKeys = keys.filter(k => this.supportedLangs.includes(k));

        // It's a language object if all keys are language codes
        // and the values are strings (not nested objects)
        if (langKeys.length === keys.length && langKeys.length > 0) {
            return keys.every(k => typeof obj[k] === 'string');
        }

        return false;
    }

    /**
     * Load and localize content in one step
     * @param {string} contentFile - Name of content file
     * @returns {Promise<Object>} Localized content
     */
    async loadLocalizedContent(contentFile) {
        const content = await this.loadContent(contentFile);
        if (!content) return null;
        return this.localizeObject(content);
    }

    /**
     * Clear the content cache (useful after language change)
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Apply translations to elements with data-i18n attributes
     * Uses content from a specific file
     * @param {string} contentFile - Content file to use
     * @param {string} prefix - Optional prefix for keys
     */
    async applyToDOM(contentFile, prefix = '') {
        const content = await this.loadContent(contentFile);
        if (!content) return;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const fullKey = el.dataset.i18n;
            const attr = el.dataset.i18nAttr;

            // Navigate to the value in content
            const value = this.getNestedValue(content, fullKey);
            if (value === undefined) return;

            const localizedValue = this.getLocalizedValue(value);
            if (!localizedValue) return;

            if (attr) {
                el.setAttribute(attr, localizedValue);
            } else {
                el.innerHTML = localizedValue;
            }
        });
    }

    /**
     * Get a nested value from an object using dot notation
     * @param {Object} obj - Object to search
     * @param {string} path - Dot-separated path
     * @returns {*} Value at path
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
}

// Create global instance
const contentLoader = new ContentLoader();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContentLoader, contentLoader };
}
