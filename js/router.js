// js/router.js - Hash-based routing for GitHub Pages
// Remote Control System v2.0

const routes = {
    '#/': 'home',
    '#/home': 'home',
    '#/docs': 'docs',
    '#/features': 'features',
    '#/security': 'security',
    '#/installation': 'installation',
    '#/api': 'api'
};

let currentPage = 'home';

function getCurrentRoute() {
    const hash = window.location.hash || '#/';
    return routes[hash] || 'home';
}

async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    mainContent.innerHTML = '<div class="container" style="text-align: center; padding: 3rem;"><div class="video-loading">Loading Remote Control System...</div></div>';
    
    try {
        const basePath = window.BASE_PATH || '';
        const response = await fetch(`${basePath}/pages/${pageName}.html`);
        if (!response.ok) throw new Error(`Page ${pageName} not found`);
        const html = await response.text();
        mainContent.innerHTML = html;
        initializePageScripts();
        updateActiveNavLink(pageName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading page:', error);
        mainContent.innerHTML = `
            <div class="container" style="text-align: center; padding: 3rem;">
                <h2>Page Not Found</h2>
                <p>The requested page could not be loaded.</p>
                <a href="#/" class="btn btn-primary">Go Home</a>
            </div>
        `;
    }
}

function updateActiveNavLink(pageName) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#/${pageName}` || (pageName === 'home' && href === '#/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializePageScripts() {
    // Initialize tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.removeEventListener('click', tabClickHandler);
        tab.addEventListener('click', tabClickHandler);
    });
    
    // Initialize FAQ accordions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.removeEventListener('click', faqClickHandler);
        question.addEventListener('click', faqClickHandler);
    });
    
    // Initialize video placeholders
    document.querySelectorAll('.video-placeholder, .demo-card').forEach(el => {
        el.removeEventListener('click', videoClickHandler);
        el.addEventListener('click', videoClickHandler);
    });
    
    initBackToTop();
}

function tabClickHandler(e) {
    const tab = e.currentTarget;
    const tabId = tab.getAttribute('data-tab');
    const container = tab.closest('.tab-container') || tab.parentElement.parentElement;
    
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    container.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetContent = document.getElementById(tabId);
    if (targetContent) targetContent.classList.add('active');
}

function faqClickHandler(e) {
    const question = e.currentTarget;
    const faqItem = question.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    answer.classList.toggle('active');
    faqItem.classList.toggle('open');
}

function videoClickHandler(e) {
    let videoId = this.getAttribute('data-video-id');
    if (!videoId) {
        const title = this.querySelector('.demo-title')?.textContent || 
                      this.querySelector('.placeholder-text')?.textContent ||
                      'demo';
        videoId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    playVideo(videoId);
}

function playVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    if (!modal || !videoContainer) return;
    
    const videoNames = {
        'main-demo': 'Main Demo - Full Remote Control Walkthrough',
        'quickstart-video': 'Quick Start Guide',
        'windows-install-video': 'Windows Installation Guide',
        'linux-install-video': 'Linux Installation Guide',
        'macos-install-video': 'macOS Installation Guide',
        'install-demo': 'Quick Installation Demo',
        'control-demo': 'Remote Control Demo',
        'dashboard-demo': 'Dashboard Demo',
        'features-demo': 'Features Overview Demo',
        'security-demo': 'Security Features Demo'
    };
    
    const videoName = videoNames[videoId] || videoId;
    
    videoContainer.innerHTML = `
        <div class="video-placeholder-inline">
            🎬 Video: ${videoName}
            <div style="margin-top: 1rem;">Placeholder: ${videoId}.mp4</div>
            <div style="margin-top: 1rem;">
                <button class="btn btn-secondary" onclick="window.closeVideoModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) modal.style.display = 'none';
}

function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) {
        const btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'back-to-top';
        btn.innerHTML = '↑';
        document.body.appendChild(btn);
        window.backToTopBtn = btn;
    }
    
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const handler = () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    };
    
    const clickHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.removeEventListener('scroll', handler);
    window.addEventListener('scroll', handler);
    btn.removeEventListener('click', clickHandler);
    btn.addEventListener('click', clickHandler);
    handler();
}

function navigateTo(route) {
    window.location.hash = route;
}


// Analytics tracking for SPA navigation
function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': pageName,
            'page_location': window.location.origin + window.location.pathname + '#/' + pageName
        });
    }
    console.log('Page view tracked:', pageName);
}

// Override navigateTo to include tracking
const originalNavigateTo = window.navigateTo;
window.navigateTo = function(route) {
    trackPageView(route);
    if (originalNavigateTo) {
        originalNavigateTo(route);
    }
};

// Expose global functions
window.playVideo = playVideo;
window.closeVideoModal = closeVideoModal;
window.navigateTo = navigateTo;

// Handle hash changes
function handleHashChange() {
    const route = getCurrentRoute();
    if (route !== currentPage) {
        currentPage = route;
        loadPage(route);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
    initBackToTop();
    
    // Set up navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                navigateTo(href.substring(1));
            }
        });
    });
});

window.addEventListener('hashchange', handleHashChange);

