// js/app.js - Header and Footer Templates
// Remote Control System v2.0

const headerTemplate = `
<header class="header">
    <div class="container">
        <nav class="nav">
            <a href="#/" class="logo" data-page="home">Remote Control System v2.0</a>
            <div class="nav-links">
                <a href="#/" data-page="home">Home</a>
                <a href="#/features" data-page="features">Features</a>
                <a href="#/security" data-page="security">Security</a>
                <a href="#/installation" data-page="installation">Installation</a>
                <a href="#/docs" data-page="docs">Documentation</a>
                <a href="#/api" data-page="api">API</a>
                <a href="https://github.com/yourusername/remote-control-system" target="_blank">GitHub</a>
            </div>
        </nav>
    </div>
</header>
`;

const footerTemplate = `
<footer class="footer">
    <div class="container">
        <div class="footer-links">
            <a href="#/">Home</a>
            <a href="#/docs">Documentation</a>
            <a href="https://github.com/yourusername/remote-control-system">GitHub</a>
            <a href="https://github.com/yourusername/remote-control-system/issues">Issues</a>
            <a href="https://github.com/yourusername/remote-control-system/discussions">Discussions</a>
        </div>
        <p>Remote Control System v2.0 | MIT License | Built with ❤️ for secure remote access</p>
        <p style="margin-top: 0.5rem;">⭐ Star us on GitHub if you find this project useful!</p>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    
    if (header) header.innerHTML = headerTemplate;
    if (footer) footer.innerHTML = footerTemplate;
});
