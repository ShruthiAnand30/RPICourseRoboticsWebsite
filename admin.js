// ================================================
// ADMIN PANEL — PROFESSOR-ONLY
// ================================================

(function () {
    'use strict';

    // ===========================
    // LOGIN MODAL HTML
    // ===========================
    function createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box login-box">
                <div class="modal-header">
                    <div class="modal-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2>Professor Login</h2>
                    <p>Access internal documents and the admin panel</p>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="login-username">Username</label>
                        <input type="text" id="login-username" placeholder="e.g. prof.smith" autocomplete="username" />
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <div class="input-password-wrapper">
                            <input type="password" id="login-password" placeholder="Enter your password" autocomplete="current-password" />
                            <button type="button" class="toggle-password" id="toggle-pw" aria-label="Show password">
                                <svg class="eye-show" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                <svg class="eye-hide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div class="login-error" id="login-error" style="display:none">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        Incorrect username or password.
                    </div>
                    <button class="btn-primary btn-full" id="login-submit">Sign In</button>
                    <button class="btn-ghost btn-full" id="login-cancel">Cancel</button>
                </div>
            </div>
        `;
        return modal;
    }

    // ===========================
    // ADMIN PANEL HTML
    // ===========================
    function createAdminPanel() {
        const panel = document.createElement('div');
        panel.id = 'admin-panel';
        panel.className = 'modal-overlay';
        panel.style.display = 'none';
        panel.innerHTML = `
            <div class="modal-box admin-box">
                <div class="admin-header">
                    <div class="admin-header-left">
                        <div class="modal-icon admin-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2>Admin Panel</h2>
                            <p id="admin-welcome-name">Welcome back</p>
                        </div>
                    </div>
                    <button class="modal-close" id="admin-close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div class="admin-tabs">
                    <button class="admin-tab active" data-panel="content">📄 Edit Content</button>
                    <button class="admin-tab" data-panel="sections">📋 Manage Sections</button>
                    <button class="admin-tab" data-panel="internal">🔒 Internal Docs</button>
                </div>

                <!-- EDIT CONTENT TAB -->
                <div class="admin-panel-body" id="admin-panel-content">
                    <div class="admin-section">
                        <label class="admin-label">Select Kit</label>
                        <select id="admin-kit-select" class="admin-select">
                            <option value="">— choose a kit —</option>
                        </select>
                    </div>
                    <div id="admin-section-editor" style="display:none">
                        <div class="admin-section">
                            <label class="admin-label">Select Section</label>
                            <select id="admin-section-select" class="admin-select"></select>
                        </div>
                        <div class="admin-section">
                            <label class="admin-label">Section Label</label>
                            <input type="text" id="admin-section-label" class="admin-input" placeholder="Section display name" />
                        </div>
                        <div class="admin-section">
                            <div class="md-editor-label-row">
                                <label class="admin-label" style="margin-bottom:0">Section Content</label>
                                <span class="admin-label-hint">Markdown</span>
                            </div>
                            <div class="md-toolbar" id="md-toolbar">
                                <button type="button" class="md-tool" data-action="bold"><strong>B</strong></button>
                                <button type="button" class="md-tool" data-action="italic"><em>I</em></button>
                                <button type="button" class="md-tool" data-action="code">&#60;/&#62;</button>
                                <span class="md-sep"></span>
                                <button type="button" class="md-tool" data-action="h2">H2</button>
                                <button type="button" class="md-tool" data-action="h3">H3</button>
                                <span class="md-sep"></span>
                                <button type="button" class="md-tool" data-action="ul">&#8226; List</button>
                                <button type="button" class="md-tool" data-action="ol">1. List</button>
                                <span class="md-sep"></span>
                                <button type="button" class="md-tool" data-action="link">&#128279; Link</button>
                                <button type="button" class="md-tool" data-action="codeblock">{ } Block</button>
                                <button type="button" class="md-tool" data-action="hr">&#8212;</button>
                            </div>
                            <div class="md-split-wrap">
                                <textarea id="admin-section-content" class="admin-textarea md-textarea" rows="14"
                                    placeholder="## Section Heading&#10;&#10;Write **bold** or *italic* text.&#10;&#10;- Bullet item&#10;- Another item"></textarea>
                                <div class="md-preview-pane">
                                    <div class="md-preview-label">Live Preview</div>
                                    <div class="md-preview-body doc-section active" id="md-preview-body"></div>
                                </div>
                            </div>
                            <p class="md-hint">Markdown is converted to HTML when saved.</p>
                        </div>
                        <div class="admin-section">
                            <div class="admin-actions">
                                <button class="btn-primary" id="admin-save-section">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                    Save Changes
                                </button>
                                <button class="btn-ghost" id="admin-reset-section">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.51"></path></svg>
                                    Reset to Saved
                                </button>
                            </div>
                            <div class="admin-save-status" id="admin-save-status"></div>
                        </div>
                        <div id="admin-preview-pane" style="display:none"></div>
                    </div>
                </div>

                <!-- MANAGE SECTIONS TAB -->
                <div class="admin-panel-body" id="admin-panel-sections" style="display:none">
                    <div class="admin-section">
                        <label class="admin-label">Select Kit</label>
                        <select id="admin-kit-select-2" class="admin-select">
                            <option value="">— choose a kit —</option>
                        </select>
                    </div>
                    <div id="admin-section-list-wrapper" style="display:none">
                        <div class="admin-section">
                            <label class="admin-label">Sections (drag to reorder)</label>
                            <div id="admin-section-list" class="admin-section-list"></div>
                        </div>
                        <div class="admin-section">
                            <label class="admin-label">Add New Section</label>
                            <div class="admin-new-section-row">
                                <input type="text" id="new-section-id" class="admin-input" placeholder="section-id (no spaces)" />
                                <input type="text" id="new-section-label" class="admin-input" placeholder="Display Label" />
                                <select id="new-section-type" class="admin-select" style="flex:0 0 auto;width:auto;">
                                    <option value="public"> Public</option>
                                    <option value="internal"> Internal</option>
                                </select>
                                <button class="btn-primary" id="admin-add-section">Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- INTERNAL DOCS TAB -->
                <div class="admin-panel-body" id="admin-panel-internal" style="display:none">
                    <div class="admin-info-banner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        Internal sections are only visible when a professor is logged in. They appear in the sidebar with a lock icon and are hidden from students.
                    </div>
                    <div class="admin-section">
                        <label class="admin-label">Internal Sections Overview</label>
                        <div id="internal-docs-list" class="admin-internal-list"></div>
                    </div>
                </div>

                <div class="admin-footer">
                    <button class="btn-danger" id="admin-logout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out
                    </button>
                </div>
            </div>
        `;
        return panel;
    }

    // ===========================
    // ADMIN LOGIC
    // ===========================
    let savedOverrides = {}; // kitId -> { sectionId -> { label, content } }
    let editingKit = null;
    let editingSection = null;
    let originalContent = null;

    function loadOverrides() {
        try {
            const raw = localStorage.getItem('admin_overrides');
            if (raw) savedOverrides = JSON.parse(raw);
        } catch { savedOverrides = {}; }
    }

    function saveOverrides() {
        localStorage.setItem('admin_overrides', JSON.stringify(savedOverrides));
    }

    function applyOverrides() {
        if (!window.roboticsKits) return;
        window.roboticsKits.forEach(kit => {
            if (!savedOverrides[kit.id]) return;
            kit.sections.forEach(sec => {
                const ov = savedOverrides[kit.id][sec.id];
                if (ov) {
                    if (ov.label !== undefined) sec.label = ov.label;
                    if (ov.content !== undefined) sec.content = ov.content;
                }
            });
        });
    }

    function getSectionOverride(kitId, sectionId) {
        return savedOverrides[kitId]?.[sectionId] || null;
    }

    function setSectionOverride(kitId, sectionId, data) {
        if (!savedOverrides[kitId]) savedOverrides[kitId] = {};
        savedOverrides[kitId][sectionId] = { ...getSectionOverride(kitId, sectionId), ...data };
        saveOverrides();
    }

    function populateKitSelects() {
        const kits = window.roboticsKits || [];
        const opts = ['<option value="">— choose a kit —</option>',
            ...kits.map(k => `<option value="${k.id}">${k.name}</option>`)].join('');
        document.getElementById('admin-kit-select').innerHTML = opts;
        document.getElementById('admin-kit-select-2').innerHTML = opts;
    }

    function populateSectionSelect(kitId) {
        const kit = window.roboticsKits.find(k => k.id === kitId);
        if (!kit) return;
        const select = document.getElementById('admin-section-select');
        select.innerHTML = kit.sections.map(s =>
            `<option value="${s.id}">${s.label}${s.internal ? ' 🔒' : ''}</option>`
        ).join('');
        loadSectionIntoEditor(kitId, kit.sections[0]?.id);
    }

    function loadSectionIntoEditor(kitId, sectionId) {
        const kit = window.roboticsKits.find(k => k.id === kitId);
        const sec = kit?.sections.find(s => s.id === sectionId);
        if (!sec) return;
        editingKit = kitId;
        editingSection = sectionId;
        originalContent = sec.content;
        document.getElementById('admin-section-label').value = sec.label;
        document.getElementById('admin-section-content').value = htmlToMarkdown(sec.content);
        document.getElementById('admin-save-status').textContent = '';
        mdUpdatePreview();
    }

    function saveCurrentSection() {
        const label = document.getElementById('admin-section-label').value.trim();
        const content = markdownToHtml(document.getElementById('admin-section-content').value);
        if (!editingKit || !editingSection) return;

        // Update in memory
        const kit = window.roboticsKits.find(k => k.id === editingKit);
        const sec = kit?.sections.find(s => s.id === editingSection);
        if (sec) { sec.label = label; sec.content = content; }

        // Persist override
        setSectionOverride(editingKit, editingSection, { label, content });

        // Refresh the rendered panel
        if (window.refreshKitPanel) window.refreshKitPanel(editingKit);

        const status = document.getElementById('admin-save-status');
        status.textContent = '✓ Saved successfully';
        status.className = 'admin-save-status success';
        setTimeout(() => { status.textContent = ''; }, 3000);
    }

    function renderSectionList(kitId) {
        const kit = window.roboticsKits.find(k => k.id === kitId);
        if (!kit) return;
        const list = document.getElementById('admin-section-list');
        list.innerHTML = kit.sections.map((sec, i) => `
            <div class="admin-section-item" data-id="${sec.id}" data-index="${i}">
                <span class="drag-handle">⠿</span>
                <span class="section-item-label">${sec.label}</span>
                ${sec.internal ? '<span class="badge-internal">🔒 Internal</span>' : '<span class="badge-public">🌐 Public</span>'}
                <button class="btn-icon-danger remove-section-btn" data-kit="${kitId}" data-sec="${sec.id}" title="Remove section">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                </button>
            </div>
        `).join('');

        // Remove section
        list.querySelectorAll('.remove-section-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const kitId = btn.dataset.kit;
                const secId = btn.dataset.sec;
                const kit = window.roboticsKits.find(k => k.id === kitId);
                if (!kit) return;
                if (!confirm(`Remove section "${secId}" from ${kit.name}? This cannot be undone.`)) return;
                kit.sections = kit.sections.filter(s => s.id !== secId);
                if (savedOverrides[kitId]) delete savedOverrides[kitId][secId];
                saveOverrides();
                renderSectionList(kitId);
                if (window.refreshKitPanel) window.refreshKitPanel(kitId);
            });
        });
    }

    function renderInternalDocs() {
        const list = document.getElementById('internal-docs-list');
        const kits = window.roboticsKits || [];
        let html = '';
        kits.forEach(kit => {
            const internalSecs = kit.sections.filter(s => s.internal);
            if (internalSecs.length === 0) return;
            html += `<div class="internal-kit-group"><strong>${kit.name}</strong>`;
            internalSecs.forEach(sec => {
                html += `<div class="internal-section-item">🔒 ${sec.label}</div>`;
            });
            html += `</div>`;
        });
        if (!html) html = '<p class="admin-empty">No internal sections yet. Mark sections as Internal in the Manage Sections tab.</p>';
        list.innerHTML = html;
    }

    // ===========================
    // TAB SWITCHING
    // ===========================
    function switchAdminTab(tabName) {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.panel === tabName));
        document.querySelectorAll('.admin-panel-body').forEach(p => p.style.display = 'none');
        document.getElementById(`admin-panel-${tabName}`).style.display = 'block';
        if (tabName === 'internal') renderInternalDocs();
    }

    // ===========================
    // ADD SECTION
    // ===========================
    function addNewSection(kitId) {
        const idInput = document.getElementById('new-section-id');
        const labelInput = document.getElementById('new-section-label');
        const typeSelect = document.getElementById('new-section-type');
        const id = idInput.value.trim().replace(/\s+/g, '-').toLowerCase();
        const label = labelInput.value.trim();
        if (!id || !label) { alert('Please enter both an ID and a label.'); return; }
        const kit = window.roboticsKits.find(k => k.id === kitId);
        if (!kit) return;
        if (kit.sections.find(s => s.id === id)) { alert(`Section "${id}" already exists.`); return; }
        const isInternal = typeSelect.value === 'internal';
        kit.sections.push({ id, label, internal: isInternal, content: `<h2>${label}</h2>\n<p>Add content here.</p>` });
        if (window.refreshKitPanel) window.refreshKitPanel(kitId);
        idInput.value = '';
        labelInput.value = '';
        renderSectionList(kitId);
    }

    // ===========================
    // INIT ADMIN UI
    // ===========================
    function initAdmin() {
        loadOverrides();
        applyOverrides();

        const loginModal = createLoginModal();
        const adminPanel = createAdminPanel();
        document.body.appendChild(loginModal);
        document.body.appendChild(adminPanel);

        // Login button in header
        const loginBtn = document.getElementById('prof-login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (window.Auth.isLoggedIn()) {
                    openAdminPanel();
                } else {
                    openLoginModal();
                }
            });
            updateLoginBtn();
        }

        // Password show/hide
        document.getElementById('toggle-pw').addEventListener('click', () => {
            const input = document.getElementById('login-password');
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            document.querySelector('.eye-show').style.display = isHidden ? 'none' : '';
            document.querySelector('.eye-hide').style.display = isHidden ? '' : 'none';
        });

        // Login submit
        document.getElementById('login-submit').addEventListener('click', doLogin);
        document.getElementById('login-password').addEventListener('keydown', e => {
            if (e.key === 'Enter') doLogin();
        });
        document.getElementById('login-username').addEventListener('keydown', e => {
            if (e.key === 'Enter') document.getElementById('login-password').focus();
        });

        document.getElementById('login-cancel').addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        loginModal.addEventListener('click', e => {
            if (e.target === loginModal) loginModal.style.display = 'none';
        });

        // Admin panel events
        document.getElementById('admin-close').addEventListener('click', () => {
            adminPanel.style.display = 'none';
        });
        adminPanel.addEventListener('click', e => {
            if (e.target === adminPanel) adminPanel.style.display = 'none';
        });

        document.getElementById('admin-logout').addEventListener('click', () => {
            window.Auth.logout();
            adminPanel.style.display = 'none';
            updateLoginBtn();
        });

        // Admin tabs
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => switchAdminTab(tab.dataset.panel));
        });

        // Kit select (content tab)
        document.getElementById('admin-kit-select').addEventListener('change', e => {
            const kitId = e.target.value;
            if (!kitId) { document.getElementById('admin-section-editor').style.display = 'none'; return; }
            document.getElementById('admin-section-editor').style.display = 'block';
            populateSectionSelect(kitId);
        });

        // Section select
        document.getElementById('admin-section-select').addEventListener('change', e => {
            if (editingKit) loadSectionIntoEditor(editingKit, e.target.value);
        });

        // Save / preview / reset
        document.getElementById('admin-save-section').addEventListener('click', saveCurrentSection);

        document.getElementById('admin-reset-section').addEventListener('click', () => {
            if (!originalContent) return;
            const kit = window.roboticsKits.find(k => k.id === editingKit);
            const sec = kit?.sections.find(s => s.id === editingSection);
            if (sec) {
                document.getElementById('admin-section-label').value = sec.label;
                document.getElementById('admin-section-content').value = htmlToMarkdown(sec.content);
                mdUpdatePreview();
            }
        });

        // Init markdown editor toolbar + live preview
        mdInitEditor();

        // Kit select (sections tab)
        document.getElementById('admin-kit-select-2').addEventListener('change', e => {
            const kitId = e.target.value;
            const wrapper = document.getElementById('admin-section-list-wrapper');
            if (!kitId) { wrapper.style.display = 'none'; return; }
            wrapper.style.display = 'block';
            renderSectionList(kitId);
        });

        document.getElementById('admin-add-section').addEventListener('click', () => {
            const kitId = document.getElementById('admin-kit-select-2').value;
            if (!kitId) { alert('Please select a kit first.'); return; }
            addNewSection(kitId);
        });
    }

    function doLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const error = document.getElementById('login-error');
        const result = window.Auth.login(username, password);
        if (result.success) {
            document.getElementById('login-modal').style.display = 'none';
            error.style.display = 'none';
            updateLoginBtn();
            openAdminPanel();
        } else {
            error.style.display = 'flex';
            document.getElementById('login-password').value = '';
            document.getElementById('login-password').focus();
        }
    }

    function openLoginModal() {
        document.getElementById('login-error').style.display = 'none';
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-modal').style.display = 'flex';
        setTimeout(() => document.getElementById('login-username').focus(), 100);
    }

    function openAdminPanel() {
        const user = window.Auth.getUser();
        document.getElementById('admin-welcome-name').textContent = `Welcome, ${user?.displayName || 'Professor'}`;
        populateKitSelects();
        document.getElementById('admin-panel').style.display = 'flex';
        // Refresh internal doc visibility in the live site
        if (window.refreshInternalSections) window.refreshInternalSections();
    }

    function updateLoginBtn() {
        const btn = document.getElementById('prof-login-btn');
        if (!btn) return;
        if (window.Auth.isLoggedIn()) {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Admin Panel
            `;
            btn.classList.add('logged-in');
        } else {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Professor Login
            `;
            btn.classList.remove('logged-in');
        }
    }


    // =====================================================
    // MARKDOWN ENGINE
    // =====================================================

    function markdownToHtml(md) {
        if (!md || !md.trim()) return '';

        // Protect fenced code blocks
        var codeBlocks = [];
        var s = md.replace(/```(\w*)\n?([\s\S]*?)```/g, function(_, lang, code) {
            var escaped = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            var cls = lang ? ' class="language-' + lang + '"' : '';
            codeBlocks.push('<pre><code' + cls + '>' + escaped + '</code></pre>');
            return '\x00BLK' + (codeBlocks.length - 1) + '\x00';
        });

        // Protect inline code
        var inlineCodes = [];
        s = s.replace(/`([^`\n]+)`/g, function(_, code) {
            var escaped = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            inlineCodes.push('<code>' + escaped + '</code>');
            return '\x00INL' + (inlineCodes.length - 1) + '\x00';
        });

        // Headings
        s = s.replace(/^#{6} (.+)$/gm, '<h6>$1</h6>');
        s = s.replace(/^#{5} (.+)$/gm, '<h5>$1</h5>');
        s = s.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
        s = s.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
        s = s.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
        s = s.replace(/^#{1} (.+)$/gm, '<h1>$1</h1>');

        // HR
        s = s.replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, '<hr>');

        // Bold + italic combo
        s = s.replace(/\*{3}(.+?)\*{3}/g, '<strong><em>$1</em></strong>');
        // Bold
        s = s.replace(/\*{2}(.+?)\*{2}/g, '<strong>$1</strong>');
        s = s.replace(/_{2}(.+?)_{2}/g, '<strong>$1</strong>');
        // Italic
        s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
        s = s.replace(/_([^_\n]+)_/g, '<em>$1</em>');

        // Images before links
        s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:.4rem;">');

        // Links
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

        // Blockquotes
        s = s.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

        // Unordered lists — collect consecutive lines
        s = s.replace(/((?:^[ \t]*[-*+] .+$\n?)+)/gm, function(block) {
            var items = block.trim().split('\n').map(function(line) {
                return '<li>' + line.replace(/^[ \t]*[-*+] /, '') + '</li>';
            });
            return '<ul>' + items.join('') + '</ul>\n';
        });

        // Ordered lists
        s = s.replace(/((?:^[ \t]*\d+\. .+$\n?)+)/gm, function(block) {
            var items = block.trim().split('\n').map(function(line) {
                return '<li>' + line.replace(/^[ \t]*\d+\. /, '') + '</li>';
            });
            return '<ol>' + items.join('') + '</ol>\n';
        });

        // Paragraphs — wrap double-newline blocks that aren't block elements
        var parts = s.split(/\n{2,}/);
        s = parts.map(function(block) {
            block = block.trim();
            if (!block) return '';
            if (/^<(h[1-6]|ul|ol|pre|blockquote|hr|div|table)/.test(block)) return block;
            if (/^\x00BLK/.test(block)) return block;
            return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
        }).join('\n');

        // Restore code blocks and inline code
        s = s.replace(/\x00BLK(\d+)\x00/g, function(_, i) { return codeBlocks[+i]; });
        s = s.replace(/\x00INL(\d+)\x00/g, function(_, i) { return inlineCodes[+i]; });

        return s;
    }

    function htmlToMarkdown(html) {
        if (!html || !html.trim()) return '';
        // If it contains no HTML tags, treat as already-markdown
        if (!/<[a-zA-Z]/.test(html)) return html;

        var s = html;
        // Pre/code blocks first
        s = s.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, function(_, c) {
            return '\n```\n' + c.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&') + '\n```\n';
        });
        // Inline code
        s = s.replace(/<code[^>]*>(.*?)<\/code>/gi, function(_, c) {
            return '`' + c.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&') + '`';
        });
        s = s.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
        s = s.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
        s = s.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
        s = s.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
        s = s.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
        s = s.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
        s = s.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
        s = s.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
        s = s.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
        s = s.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
        s = s.replace(/<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
        s = s.replace(/<img[^>]+src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
        s = s.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, function(_, inner) {
            return inner.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
        });
        s = s.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, function(_, inner) {
            var idx = 0;
            return inner.replace(/<li[^>]*>(.*?)<\/li>/gi, function(__, t) { return (++idx) + '. ' + t + '\n'; }) + '\n';
        });
        s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, function(_, t) { return '> ' + t.trim() + '\n'; });
        s = s.replace(/<hr[^>]*\/?>/gi, '\n---\n');
        s = s.replace(/<br\s*\/?>/gi, '\n');
        s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
        s = s.replace(/<[^>]+>/g, '');
        s = s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ');
        s = s.replace(/\n{3,}/g, '\n\n').trim();
        return s;
    }

    function mdUpdatePreview() {
        var ta = document.getElementById('admin-section-content');
        var preview = document.getElementById('md-preview-body');
        if (!ta || !preview) return;
        preview.innerHTML = markdownToHtml(ta.value);
    }

    function mdApplyTool(action) {
        var ta = document.getElementById('admin-section-content');
        var start = ta.selectionStart;
        var end = ta.selectionEnd;
        var sel = ta.value.substring(start, end);
        var before = ta.value.substring(0, start);
        var after = ta.value.substring(end);
        var insert = '', cursor = 0;

        if (action === 'bold')      { insert = '**' + (sel || 'bold text') + '**'; cursor = sel ? insert.length : insert.length - 2; }
        else if (action === 'italic')    { insert = '*' + (sel || 'italic text') + '*'; cursor = sel ? insert.length : insert.length - 1; }
        else if (action === 'code')      { insert = '`' + (sel || 'code') + '`'; cursor = sel ? insert.length : insert.length - 1; }
        else if (action === 'h2')        { insert = '## ' + (sel || 'Heading'); cursor = insert.length; }
        else if (action === 'h3')        { insert = '### ' + (sel || 'Heading'); cursor = insert.length; }
        else if (action === 'ul')        { insert = sel ? sel.split('\n').map(function(l){return '- '+l;}).join('\n') : '- List item'; cursor = insert.length; }
        else if (action === 'ol')        { insert = sel ? sel.split('\n').map(function(l,i){return (i+1)+'. '+l;}).join('\n') : '1. List item'; cursor = insert.length; }
        else if (action === 'link')      { var url = prompt('URL:', 'https://'); if (!url) return; insert = '[' + (sel || 'link text') + '](' + url + ')'; cursor = insert.length; }
        else if (action === 'codeblock') { insert = '```\n' + (sel || 'code here') + '\n```'; cursor = insert.length; }
        else if (action === 'hr')        { insert = '\n---\n'; cursor = insert.length; }

        ta.focus();
        ta.value = before + insert + after;
        ta.selectionStart = ta.selectionEnd = start + cursor;
        mdUpdatePreview();
    }

    function mdInitEditor() {
        var ta = document.getElementById('admin-section-content');
        var toolbar = document.getElementById('md-toolbar');
        if (!ta || !toolbar) return;

        ta.addEventListener('input', mdUpdatePreview);

        ta.addEventListener('keydown', function(e) {
            if (!(e.ctrlKey || e.metaKey)) return;
            if (e.key === 'b') { e.preventDefault(); mdApplyTool('bold'); }
            if (e.key === 'i') { e.preventDefault(); mdApplyTool('italic'); }
            if (e.key === 'k') { e.preventDefault(); mdApplyTool('link'); }
        });

        toolbar.querySelectorAll('.md-tool[data-action]').forEach(function(btn) {
            btn.addEventListener('click', function() { mdApplyTool(btn.dataset.action); });
        });

        mdUpdatePreview();
    }

    // Init on DOM ready — never auto-open any modal on load
    window.Auth.init();
    function safeInit() {
        initAdmin();
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'none';
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }

    // Expose for app.js
    window.Admin = { loadOverrides, applyOverrides, updateLoginBtn };

})();
