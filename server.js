// ================================================
// RPI COURSE ROBOTICS — EXPRESS SERVER
// ================================================
// Serves the static site and handles admin content
// saves so changes persist to data.json on disk.
//
// Usage:
//   node server.js
//
// Then visit: http://localhost:3000
// ================================================

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Path where professor edits are saved on disk
const DATA_FILE = path.join(__dirname, 'overrides.json');

// ------------------------------------------------
// Middleware
// ------------------------------------------------
app.use(express.json());

// Serve all static files (index.html, styles.css, images, etc.)
app.use(express.static(__dirname));

// ------------------------------------------------
// Helper: load overrides from disk
// ------------------------------------------------
function loadOverrides() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
    } catch (err) {
        console.error('Error reading overrides file:', err.message);
    }
    return {};
}

// ------------------------------------------------
// Helper: save overrides to disk
// ------------------------------------------------
function saveOverrides(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ------------------------------------------------
// GET /api/overrides
// Returns all saved content overrides so the page
// can apply them on load (instead of localStorage).
// ------------------------------------------------
app.get('/api/overrides', (req, res) => {
    const overrides = loadOverrides();
    res.json({ success: true, overrides });
});

// ------------------------------------------------
// POST /api/overrides
// Body: { kitId, sectionId, label, content }
// Saves a single section edit to disk.
// ------------------------------------------------
app.post('/api/overrides', (req, res) => {
    const { kitId, sectionId, label, content } = req.body;

    if (!kitId || !sectionId) {
        return res.status(400).json({ success: false, error: 'kitId and sectionId are required.' });
    }

    const overrides = loadOverrides();

    if (!overrides[kitId]) overrides[kitId] = {};
    overrides[kitId][sectionId] = {
        ...(overrides[kitId][sectionId] || {}),
        ...(label   !== undefined ? { label }   : {}),
        ...(content !== undefined ? { content } : {}),
    };

    saveOverrides(overrides);

    console.log(`[SAVE] ${kitId} → ${sectionId}`);
    res.json({ success: true });
});

// ------------------------------------------------
// DELETE /api/overrides/:kitId/:sectionId
// Removes a saved override so the original data.js
// content is shown again.
// ------------------------------------------------
app.delete('/api/overrides/:kitId/:sectionId', (req, res) => {
    const { kitId, sectionId } = req.params;
    const overrides = loadOverrides();

    if (overrides[kitId]) {
        delete overrides[kitId][sectionId];
        if (Object.keys(overrides[kitId]).length === 0) {
            delete overrides[kitId];
        }
        saveOverrides(overrides);
    }

    console.log(`[DELETE] ${kitId} → ${sectionId}`);
    res.json({ success: true });
});

// ------------------------------------------------
// Fallback: serve index.html for any unknown route
// ------------------------------------------------
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ------------------------------------------------
// Start
// ------------------------------------------------
app.listen(PORT, () => {
    console.log(`\n  Robotics site running at http://localhost:${PORT}`);
    console.log(`  Overrides stored in: ${DATA_FILE}\n`);
});