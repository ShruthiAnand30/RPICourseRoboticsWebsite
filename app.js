// ================================================
// MAIN APPLICATION LOGIC
// ================================================

(function () {
    'use strict';

    // ===========================
    // AUTO-LOAD IMAGES FROM SERVER
    // Fetches the images/ folder contents so the
    // admin picker always shows newly added images.
    // ===========================
    fetch('/api/images')
        .then(r => r.json())
        .then(data => {
            if (data.success) window.siteImages = data.images;
        })
        .catch(() => {
            // Running without server (e.g. file://) — siteImages stays empty
        });

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
    // Supports: grouped subsections, internal (professor-only) sections
    // ===========================
    function buildSidebarLinks(kit) {
        const isLoggedIn = window.Auth && window.Auth.isLoggedIn();
        let html = '';
        let openGroup = null;
        let firstLink = true;

        // Recursive helper to render a section and its children
        // Parents with children get a chevron and expand/collapse on click
        function renderNavItem(sec, kitId, depth) {
            if (sec.internal && !isLoggedIn) return '';
            const internalBadge = sec.internal ? '<span class="nav-internal-badge">🔒</span>' : '';
            const activeClass = firstLink ? ' active' : '';
            if (firstLink) firstLink = false;

            const visibleChildren = (sec.children || []).filter(c => !c.internal || isLoggedIn);
            const depthClass = depth > 0 ? ' doc-nav-sublink' : '';
            const paddingStyle = depth > 0 ? `padding-left:${0.75 + depth * 0.9}rem` : '';

            let out = '';
            if (visibleChildren.length > 0) {
                // Parent: clicking activates section AND toggles children open/closed
                const childrenId = `sub-${kitId}-${sec.id}`;
                out += `
                    <a href="#doc-${kitId}-${sec.id}"
                       class="doc-nav-link doc-nav-has-children${activeClass}${depthClass}"
                       style="${paddingStyle}"
                       onclick="activateSectionAndToggle(this, '${kitId}', '${sec.id}', '${childrenId}')">
                        ${depth > 0 ? '<span class="sub-bullet"></span>' : ''}
                        <span class="nav-link-label">${sec.label}${internalBadge}</span>
                        <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </a>
                    <div class="doc-nav-children" id="${childrenId}" style="display:none">
                `;
                visibleChildren.forEach(child => { out += renderNavItem(child, kitId, depth + 1); });
                out += `</div>`;
            } else {
                out += `
                    <a href="#doc-${kitId}-${sec.id}"
                       class="doc-nav-link${activeClass}${depthClass}"
                       style="${paddingStyle}"
                       onclick="activateSection(this, '${kitId}', '${sec.id}')">
                        ${depth > 0 ? '<span class="sub-bullet"></span>' : ''}
                        <span class="nav-link-label">${sec.label}${internalBadge}</span>
                    </a>`;
            }
            return out;
        }

        kit.sections.forEach((sec) => {
            if (!sec) return;
            if (sec.internal && !isLoggedIn) return;
            const isGroup = sec.group;

            if (isGroup && isGroup !== openGroup) {
                if (openGroup) html += '</div></div>';
                html += `
                    <div class="doc-nav-group">
                        <button class="doc-nav-group-header" onclick="toggleNavGroup(this)" aria-expanded="true">
                            <svg class="group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            <span>${isGroup}</span>
                        </button>
                        <div class="doc-nav-group-items">
                `;
                openGroup = isGroup;
            } else if (!isGroup && openGroup) {
                html += '</div></div>';
                openGroup = null;
            }

            html += renderNavItem(sec, kit.id, 0);
        });

        if (openGroup) html += '</div></div>';
        return html;
    }

    // Recursive section block renderer
    function buildSectionBlocks(kit) {
        const isLoggedIn = window.Auth && window.Auth.isLoggedIn();
        let blocks = '';
        let first = true;

        function dedentPres(html) {
            return html.replace(/<pre>([\s\S]*?)<\/pre>/g, (_, inner) => {
                const lines = inner.split('');
                const nonEmpty = lines.filter(l => l.trim().length > 0);
                if (!nonEmpty.length) return '<pre>' + inner + '</pre>';
                const indent = Math.min(...nonEmpty.map(l => l.match(/^(\s*)/)[1].length));
                const dedented = lines.map(l => l.slice(indent)).join(' ').replace(/^/, '').replace(/$/, '');
                return '<pre>' + dedented + '</pre>';
            });
        }

        function renderBlock(sec) {
            if (!sec) return;
            if (sec.internal && !isLoggedIn) return;
            blocks += `<div class="doc-section${first ? ' active' : ''}" id="doc-${kit.id}-${sec.id}">${dedentPres(sec.content)}</div>`;
            first = false;
            if (sec.children) sec.children.forEach(renderBlock);
        }

        kit.sections.forEach(renderBlock);
        return blocks;
    }

    function renderDocPanels() {
        const tabsContainer = document.querySelector('.tabs-container');

        window.roboticsKits.forEach(kit => {
            const panel = document.createElement('div');
            panel.className = 'tab-panel';
            panel.id = `panel-${kit.id}`;
            panel.innerHTML = buildKitPanelHTML(kit);
            tabsContainer.appendChild(panel);
        });
    }

    function buildKitPanelHTML(kit) {
        const sidebarLinks = buildSidebarLinks(kit);
        const sections = buildSectionBlocks(kit);
        return `
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
    }

    // Refresh a single kit panel (called by admin after edits)
    window.refreshKitPanel = function (kitId) {
        const kit = window.roboticsKits.find(k => k.id === kitId);
        if (!kit) return;
        const panel = document.getElementById(`panel-${kitId}`);
        if (!panel) return;
        panel.innerHTML = buildKitPanelHTML(kit);
    };

    // Refresh internal section visibility across all panels
    window.refreshInternalSections = function () {
        window.roboticsKits.forEach(kit => {
            window.refreshKitPanel(kit.id);
        });
    };


    // ===========================
    // SECTION SWITCHING (sidebar)
    // ===========================
    window.activateSection = function (clickedLink, kitId, sectionId) {
        const panel = document.getElementById(`panel-${kitId}`);
        panel.querySelectorAll('.doc-nav-link').forEach(l => l.classList.remove('active'));
        clickedLink.classList.add('active');
        panel.querySelectorAll('.doc-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`doc-${kitId}-${sectionId}`);
        if (target) target.classList.add('active');
    };

    // Activate section AND toggle its children open/closed
    window.activateSectionAndToggle = function (clickedLink, kitId, sectionId, childrenId) {
        const panel = document.getElementById(`panel-${kitId}`);
        const childrenEl = document.getElementById(childrenId);
        const isOpen = childrenEl && childrenEl.style.display !== 'none';

        // If clicking an already-active parent, just toggle children
        // Otherwise activate it AND open children
        if (!clickedLink.classList.contains('active')) {
            // Activate section
            panel.querySelectorAll('.doc-nav-link').forEach(l => l.classList.remove('active'));
            clickedLink.classList.add('active');
            panel.querySelectorAll('.doc-section').forEach(s => s.classList.remove('active'));
            const target = document.getElementById(`doc-${kitId}-${sectionId}`);
            if (target) target.classList.add('active');
            // Open children
            if (childrenEl) {
                childrenEl.style.display = 'block';
                clickedLink.classList.add('nav-open');
            }
        } else {
            // Already active — just toggle children
            if (childrenEl) {
                const nowOpen = !isOpen;
                childrenEl.style.display = nowOpen ? 'block' : 'none';
                clickedLink.classList.toggle('nav-open', nowOpen);
            }
        }
    };

    // Expand/collapse nav group
    window.toggleNavGroup = function (btn) {
        const items = btn.nextElementSibling;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        items.style.display = expanded ? 'none' : 'block';
        btn.querySelector('.group-chevron').style.transform = expanded ? 'rotate(-90deg)' : '';
    };

    // toggleSubNav kept as no-op (subcategories are always visible)
    window.toggleSubNav = function () {};

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