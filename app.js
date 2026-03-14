// ================================================
// MAIN APPLICATION LOGIC
// ================================================

(function () {
    'use strict';

    // ===========================
    // DARK MODE
    // ===========================
    const darkToggle = document.getElementById('dark-mode-toggle');

    function initDarkMode() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'dark' || (!saved && prefersDark)) {
            document.documentElement.classList.add('dark');
        }
    }

    darkToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    initDarkMode();


    // ===========================
    // RENDER KIT CARDS
    // ===========================
    function renderKitCards() {
        const grid = document.querySelector('.kits-grid');
        grid.innerHTML = window.roboticsKits.map(kit => `
            <label for="tab-${kit.id}" class="kit-card" onclick="scrollToTop()">
                <div class="kit-card-wrapper">
                    <div class="kit-card-image">
                        <img src="${kit.image}" alt="${kit.name}" loading="lazy">
                    </div>
                    <div class="kit-card-content-wrapper">
                        <div class="kit-card-header">
                            <div class="kit-card-title-row">
                                <h4 class="kit-card-title">${kit.name}</h4>
                                <span class="badge badge-${kit.difficulty.toLowerCase()}">${kit.difficulty}</span>
                            </div>
                            <p class="kit-card-description">${kit.description}</p>
                        </div>
                        <div class="kit-card-content">
                            <div class="kit-card-tags">
                                ${kit.tags.map(tag => `<span class="badge badge-secondary">${tag}</span>`).join('')}
                            </div>
                            <span class="btn-primary kit-card-button">
                                View Documentation
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </label>
        `).join('');
    }


    // ===========================
    // RENDER DOC PANELS
    // Each kit gets a full tab-panel with slim header + sidebar + content
    // ===========================
    function renderDocPanels() {
        const tabsContainer = document.querySelector('.tabs-container');

        window.roboticsKits.forEach(kit => {
            const panel = document.createElement('div');
            panel.className = 'tab-panel';
            panel.id = `panel-${kit.id}`;

            // Build sidebar nav links
            const sidebarLinks = kit.sections.map((sec, i) => `
                <a href="#doc-${kit.id}-${sec.id}" class="doc-nav-link${i === 0 ? ' active' : ''}"
                   onclick="activateSection(this, '${kit.id}', '${sec.id}')">
                    ${sec.label}
                </a>
            `).join('');

            // Build section content blocks
            const sections = kit.sections.map((sec, i) => `
                <div class="doc-section${i === 0 ? ' active' : ''}" id="doc-${kit.id}-${sec.id}">
                    ${sec.content}
                </div>
            `).join('');

            panel.innerHTML = `
                <!-- Slim doc header: back link + kit name only -->
                <div class="doc-header">
                    <div class="container">
                        <div class="doc-header-inner">
                            <label for="tab-home" class="back-link" onclick="scrollToTop()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                All Kits
                            </label>
                            <div class="doc-header-kit">
                                <span class="badge badge-${kit.difficulty.toLowerCase()}">${kit.difficulty}</span>
                                <span class="doc-header-name">${kit.name}</span>
                                <div class="doc-header-tags">
                                    ${kit.tags.map(t => `<span class="badge badge-secondary">${t}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar + Content layout -->
                <div class="doc-layout">
                    <aside class="doc-sidebar">
                        <nav class="doc-nav">
                            <div class="doc-nav-label">Contents</div>
                            ${sidebarLinks}
                        </nav>
                    </aside>
                    <main class="doc-main">
                        ${sections}
                    </main>
                </div>
            `;

            tabsContainer.appendChild(panel);
        });
    }


    // ===========================
    // SECTION SWITCHING (sidebar)
    // ===========================
    window.activateSection = function (clickedLink, kitId, sectionId) {
        // Deactivate all nav links in this kit's sidebar
        const panel = document.getElementById(`panel-${kitId}`);
        panel.querySelectorAll('.doc-nav-link').forEach(l => l.classList.remove('active'));
        clickedLink.classList.add('active');

        // Hide all sections, show the clicked one
        panel.querySelectorAll('.doc-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`doc-${kitId}-${sectionId}`);
        if (target) target.classList.add('active');
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'instant' });
    };


    // ===========================
    // HERO: hide when on a doc tab
    // ===========================
    const heroSection = document.getElementById('hero-section');
    const docTabIds = ['tab-dofbot', 'tab-rosmaster', 'tab-raspbot', 'tab-dogzilla'];

    docTabIds.forEach(id => {
        const radio = document.getElementById(id);
        if (radio) {
            radio.addEventListener('change', () => {
                heroSection.style.display = 'none';
            });
        }
    });

    ['tab-home', 'tab-search'].forEach(id => {
        const radio = document.getElementById(id);
        if (radio) {
            radio.addEventListener('change', () => {
                heroSection.style.display = '';
            });
        }
    });


    // ===========================
    // SEARCH
    // ===========================
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clear-btn');
    const filterControls = document.getElementById('filter-controls');
    const kitFilters = document.querySelectorAll('.kit-filter');
    const filterCount = document.getElementById('filter-count');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const searchResultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    const tabSearch = document.getElementById('tab-search');
    const tabHome = document.getElementById('tab-home');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        clearBtn.style.display = query ? 'flex' : 'none';

        if (!query) {
            tabHome.checked = true;
            filterControls.style.display = 'none';
            heroSection.style.display = '';
            return;
        }

        filterControls.style.display = 'flex';
        heroSection.style.display = '';

        const activeFilters = Array.from(kitFilters).filter(cb => cb.checked).map(cb => cb.value);
        const uncheckedCount = Array.from(kitFilters).filter(cb => !cb.checked).length;

        filterCount.textContent = activeFilters.length;
        filterCount.style.display = uncheckedCount > 0 ? 'inline-flex' : 'none';
        clearFiltersBtn.style.display = uncheckedCount > 0 ? 'inline-flex' : 'none';

        // Search across kit name, description, tags, and each section's content text
        const results = [];
        window.roboticsKits.forEach(kit => {
            if (!activeFilters.includes(kit.id)) return;
            kit.sections.forEach(sec => {
                // Strip HTML from content for searching
                const div = document.createElement('div');
                div.innerHTML = sec.content;
                const plainText = div.textContent || '';
                const searchable = (kit.name + ' ' + kit.description + ' ' + kit.tags.join(' ') + ' ' + sec.label + ' ' + plainText).toLowerCase();
                if (searchable.includes(query)) {
                    results.push({ kit, sec, plainText });
                }
            });
        });

        displaySearchResults(results, query);
        tabSearch.checked = true;
        heroSection.style.display = '';
    }

    function displaySearchResults(results, query) {
        searchResultsList.innerHTML = '';
        resultsCount.textContent = `(${results.length})`;

        if (results.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        results.forEach(({ kit, sec, plainText }) => {
            const idx = plainText.toLowerCase().indexOf(query);
            let snippet = '';
            if (idx !== -1) {
                const start = Math.max(0, idx - 60);
                const end = Math.min(plainText.length, idx + 150);
                snippet = (start > 0 ? '…' : '') + plainText.substring(start, end).trim() + '…';
            } else {
                snippet = kit.description;
            }

            const card = document.createElement('div');
            card.className = 'search-result-card';
            card.innerHTML = `
                <div class="search-result-breadcrumb">
                    <span class="badge badge-outline">${kit.name}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px;">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span>${sec.label}</span>
                </div>
                <h4 class="search-result-title">${sec.label}</h4>
                <p class="search-result-content">${snippet}</p>
                <div class="search-result-tags">
                    ${kit.tags.map(t => `<span class="badge badge-secondary">${t}</span>`).join('')}
                </div>
            `;

            card.addEventListener('click', () => {
                // Switch to kit tab
                document.getElementById(`tab-${kit.id}`).checked = true;
                heroSection.style.display = 'none';
                // Activate the right section in the sidebar
                setTimeout(() => {
                    const panel = document.getElementById(`panel-${kit.id}`);
                    if (!panel) return;
                    // Find the nav link for this section
                    const link = panel.querySelector(`[href="#doc-${kit.id}-${sec.id}"]`);
                    if (link) activateSection(link, kit.id, sec.id);
                }, 50);
            });

            searchResultsList.appendChild(card);
        });
    }

    function clearSearch() {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterControls.style.display = 'none';
        tabHome.checked = true;
        heroSection.style.display = '';
    }

    function clearFilters() {
        kitFilters.forEach(cb => cb.checked = true);
        filterCount.style.display = 'none';
        clearFiltersBtn.style.display = 'none';
        performSearch();
    }

    searchInput.addEventListener('input', performSearch);
    clearBtn.addEventListener('click', clearSearch);
    clearFiltersBtn.addEventListener('click', clearFilters);
    kitFilters.forEach(f => f.addEventListener('change', performSearch));


    // ===========================
    // INIT
    // ===========================
    renderDocPanels();
    renderKitCards();

})();