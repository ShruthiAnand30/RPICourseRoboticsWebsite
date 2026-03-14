// Search functionality for robotics documentation
(function() {
    // Get all documentation sections
    const docSections = document.querySelectorAll('.doc-section[data-kit]');
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clear-btn');
    const filterControls = document.getElementById('filter-controls');
    const kitFilters = document.querySelectorAll('.kit-filter');
    const filterCount = document.getElementById('filter-count');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const searchResultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    // Radio buttons for tab navigation
    const tabSearch = document.getElementById('tab-search');
    const tabHome = document.getElementById('tab-home');
    
    // Kit name mapping
    const kitNames = {
        'dofbot': 'DOFBOT-JetsonNANO',
        'rosmaster': 'ROSMASTER X3',
        'raspbot': 'Raspbot V2',
        'dogzilla': 'Dogzilla'
    };
    
    // Build search index from documentation sections
    const searchIndex = Array.from(docSections).map(section => ({
        kit: section.getAttribute('data-kit'),
        kitName: kitNames[section.getAttribute('data-kit')],
        section: section.getAttribute('data-section'),
        title: section.getAttribute('data-title'),
        keywords: section.getAttribute('data-keywords') || '',
        content: section.textContent.toLowerCase(),
        element: section
    }));
    
    // Search function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        // Show/hide clear button
        clearBtn.style.display = query ? 'flex' : 'none';
        
        if (query.length === 0) {
            // No search query - go back to home
            tabHome.checked = true;
            filterControls.style.display = 'none';
            return;
        }
        
        // Show filter controls when searching
        filterControls.style.display = 'flex';
        
        // Get active filters
        const activeFilters = Array.from(kitFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        // Update filter count
        const uncheckedCount = Array.from(kitFilters).filter(cb => !cb.checked).length;
        if (uncheckedCount > 0) {
            filterCount.textContent = kitFilters.length - uncheckedCount;
            filterCount.style.display = 'inline-flex';
            clearFiltersBtn.style.display = 'inline-flex';
        } else {
            filterCount.style.display = 'none';
            clearFiltersBtn.style.display = 'none';
        }
        
        // Search through index
        const results = searchIndex.filter(item => {
            // Check if kit matches filter
            if (!activeFilters.includes(item.kit)) return false;
            
            // Check if query matches
            const matchesTitle = item.title.toLowerCase().includes(query);
            const matchesKeywords = item.keywords.includes(query);
            const matchesContent = item.content.includes(query);
            
            return matchesTitle || matchesKeywords || matchesContent;
        });
        
        // Display results
        displayResults(results, query);
        
        // Switch to search results tab
        tabSearch.checked = true;
    }
    
    // Display search results
    function displayResults(results, query) {
        searchResultsList.innerHTML = '';
        resultsCount.textContent = `(${results.length})`;
        
        if (results.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        results.forEach((result, index) => {
            const resultCard = document.createElement('div');
            resultCard.className = 'search-result-card';
            resultCard.style.animationDelay = `${index * 0.05}s`;
            
            // Get a snippet of content
            const contentText = result.element.textContent;
            const queryIndex = contentText.toLowerCase().indexOf(query);
            let snippet = '';
            
            if (queryIndex !== -1) {
                const start = Math.max(0, queryIndex - 50);
                const end = Math.min(contentText.length, queryIndex + 150);
                snippet = '...' + contentText.substring(start, end) + '...';
            } else {
                snippet = contentText.substring(0, 200) + '...';
            }
            
            // Create result HTML
            resultCard.innerHTML = `
                <div class="search-result-header">
                    <div class="search-result-breadcrumb">
                        <span class="badge badge-outline">${result.kitName}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span>${result.title}</span>
                    </div>
                    <h4 class="search-result-title">${result.title}</h4>
                </div>
                <p class="search-result-content">${snippet}</p>
                <div class="search-result-tags">
                    ${result.keywords.split(' ').slice(0, 4).map(tag => 
                        `<span class="badge badge-secondary">${tag}</span>`
                    ).join('')}
                </div>
            `;
            
            // Make clickable - navigate to the section
            resultCard.addEventListener('click', () => {
                // Check the appropriate tab
                const kitTab = document.getElementById(`tab-${result.kit}`);
                if (kitTab) {
                    kitTab.checked = true;
                    
                    // Wait for tab to switch, then scroll to section
                    setTimeout(() => {
                        const targetSection = document.getElementById(result.element.id);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            });
            
            searchResultsList.appendChild(resultCard);
        });
    }
    
    // Clear search
    function clearSearch() {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterControls.style.display = 'none';
        tabHome.checked = true;
    }
    
    // Clear filters
    function clearFilters() {
        kitFilters.forEach(cb => cb.checked = true);
        filterCount.style.display = 'none';
        clearFiltersBtn.style.display = 'none';
        performSearch();
    }
    
    // Event listeners
    searchInput.addEventListener('input', performSearch);
    clearBtn.addEventListener('click', clearSearch);
    clearFiltersBtn.addEventListener('click', clearFilters);
    kitFilters.forEach(filter => filter.addEventListener('change', performSearch));
    
    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
})();