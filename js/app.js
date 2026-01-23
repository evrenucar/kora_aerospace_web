// Main Entry Point
console.log('Kora Aerospace App Initialized');

// Listen for content ready to apply specific page logic
window.addEventListener('contentReady', () => {
    const lang = getLang();
    document.documentElement.lang = lang;

    // Example: Update title based on lang
    if (siteData && siteData.site) {
        // Simple helper to pick language
        const t = (obj) => obj[lang] || obj['en'] || obj;

        document.title = t(siteData.site.title);
    }
});
