/* ============================================
   TRACKER STUDIO — JavaScript Engine
   Layers: Grid, Theme, Text, Add-ons, Print
   + Couple Tracker Mode + CSS Mochi Characters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== STATE ==========
    const state = {
        duration: 30,
        theme: 'calm',
        title: '',
        habit: 'Meditation',
        name: '',
        subtitle: '',
        inkFriendly: false,
        coupleMode: false,
        nameA: '',
        nameB: '',
        addons: { stickers: false, rewards: false }
    };

    // ========== THEME DATA ==========
    const themes = {
        calm: { deco: '🌸', label: 'Calm' },
        cozy: { deco: '🌙', label: 'Cozy' },
        minimal: { deco: '◇', label: 'Minimal' },
        nature: { deco: '🌱', label: 'Nature' }
    };

    const stickers = {
        calm: ['⭐', '💛', '✓', '🧘', '🌸', '☀️', '💚', '✅', '🙏', '🌟', '💮', '🎯'],
        cozy: ['⭐', '☕', '✓', '🧸', '🌙', '🕯️', '🧡', '✅', '📖', '🌟', '🍂', '🎯'],
        minimal: ['⭐', '◇', '✓', '✨', '△', '○', '💜', '✅', '☆', '🌟', '✦', '🎯'],
        nature: ['⭐', '🍃', '✓', '🌿', '🌱', '🌻', '💚', '✅', '🦋', '🌟', '🫧', '🎯']
    };

    // ========== GRID ENGINE ==========
    function getGridConfig(duration, isCoupleMode) {
        if (isCoupleMode) {
            // Couple mode: narrower grids side by side
            switch (duration) {
                case 30: return { cols: 5, rows: 6, cells: 30, label: '6 × 5 × 2' };
                case 60: return { cols: 6, rows: 10, cells: 60, label: '10 × 6 × 2' };
                case 90: return { cols: 6, rows: 15, cells: 90, label: '15 × 6 × 2' };
                default: return { cols: 5, rows: 6, cells: 30, label: '6 × 5 × 2' };
            }
        }
        switch (duration) {
            case 30: return { cols: 6, rows: 5, cells: 30, label: '5 × 6' };
            case 60: return { cols: 10, rows: 6, cells: 60, label: '6 × 10' };
            case 90: return { cols: 10, rows: 9, cells: 90, label: '9 × 10' };
            default: return { cols: 6, rows: 5, cells: 30, label: '5 × 6' };
        }
    }

    function getMilestones(duration) {
        switch (duration) {
            case 30: return [7, 14, 21, 30];
            case 60: return [7, 14, 21, 30, 45, 60];
            case 90: return [7, 14, 21, 30, 45, 60, 75, 90];
            default: return [7, 14, 21, 30];
        }
    }

    // ========== RENDERERS ==========
    function renderGridInto(gridEl, config) {
        const milestones = getMilestones(state.duration);
        gridEl.setAttribute('data-cols', config.cols);
        gridEl.innerHTML = '';

        for (let i = 1; i <= config.cells; i++) {
            const cell = document.createElement('div');
            cell.className = 'tracker-cell';
            if (milestones.includes(i)) cell.classList.add('milestone');

            const dayNum = document.createElement('span');
            dayNum.className = 'day-num';
            dayNum.textContent = i;
            cell.appendChild(dayNum);

            gridEl.appendChild(cell);
        }
    }

    function renderGrid() {
        const gridA = document.getElementById('tracker-grid');
        const gridB = document.getElementById('tracker-grid-b');
        const config = getGridConfig(state.duration, state.coupleMode);

        renderGridInto(gridA, config);
        if (state.coupleMode) {
            renderGridInto(gridB, config);
        }
    }

    function renderTheme() {
        const page = document.getElementById('tracker-page');
        page.setAttribute('data-theme', state.theme);

        const theme = themes[state.theme];

        // Corner decorations
        document.querySelectorAll('.tracker-corner').forEach(el => {
            el.textContent = theme.deco;
        });

        // Update sticker sheet
        renderStickers();
        // Update reward card
        renderRewards();
    }

    function renderText() {
        const titleEl = document.getElementById('tracker-title');
        const subtitleEl = document.getElementById('tracker-subtitle');

        let titleText = state.title || `${state.habit} Tracker`;

        if (state.coupleMode) {
            // Couple mode title
            const a = state.nameA || 'Person A';
            const b = state.nameB || 'Person B';
            if (!state.title) {
                titleText = `${a} & ${b}'s ${state.habit || 'Habit'} Tracker`;
            }
            // Update couple labels
            document.getElementById('label-a').textContent = state.nameA || 'A';
            document.getElementById('label-b').textContent = state.nameB || 'B';
        } else if (state.name) {
            titleText = `${state.name}'s ${state.habit || 'Habit'} Tracker`;
        }

        titleEl.textContent = titleText;
        subtitleEl.textContent = state.subtitle || `${state.duration}-day journey · one day at a time`;
    }

    function renderFooter() {
        const config = getGridConfig(state.duration, state.coupleMode);
        const modeLabel = state.coupleMode ? ' · couple edition' : '';
        document.getElementById('tracker-footer-text').textContent =
            `${config.cells} days · ${config.label} grid${modeLabel} · undated · print forever`;
        document.getElementById('tracker-reward-zone').textContent =
            `🏆 Reward zone: What will you celebrate at Day ${state.duration}?`;
    }

    function renderCoupleMode() {
        const page = document.getElementById('tracker-page');
        const mochiB = document.getElementById('mochi-b');
        const coupleNames = document.getElementById('couple-names');

        if (state.coupleMode) {
            page.classList.add('couple-mode');
            mochiB.style.display = '';
            coupleNames.style.display = '';
        } else {
            page.classList.remove('couple-mode');
            mochiB.style.display = 'none';
            coupleNames.style.display = 'none';
        }

        renderGrid();
        renderText();
        renderFooter();
    }

    function renderStickers() {
        const grid = document.getElementById('sticker-grid');
        const themeStickers = stickers[state.theme] || stickers.calm;
        grid.innerHTML = '';
        [...themeStickers, ...themeStickers].forEach(s => {
            const el = document.createElement('div');
            el.className = 'sticker-item';
            el.textContent = s;
            grid.appendChild(el);
        });
    }

    function renderRewards() {
        const container = document.getElementById('reward-milestones');
        const milestones = getMilestones(state.duration);
        const rewards = ['Treat yourself!', 'You earned it!', 'Mini celebration!', 'You\'re amazing!', 'Keep going!', 'Almost there!', 'So proud!', 'CHAMPION!'];
        container.innerHTML = '';
        milestones.forEach((day, i) => {
            const el = document.createElement('div');
            el.className = 'reward-milestone';
            el.innerHTML = `
        <div class="reward-day">Day ${day}</div>
        <div class="reward-label">${rewards[i] || '🎉'}</div>
      `;
            container.appendChild(el);
        });
    }

    function renderAll() {
        renderGrid();
        renderTheme();
        renderText();
        renderFooter();
        renderCoupleMode();
    }

    // ========== EVENT BINDINGS ==========

    // Duration buttons
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.duration = parseInt(btn.dataset.duration);
            renderGrid();
            renderText();
            renderFooter();
            renderRewards();
        });
    });

    // Theme cards
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.theme = card.dataset.theme;
            renderTheme();
        });
    });

    // Text inputs
    const titleInput = document.getElementById('input-title');
    const habitInput = document.getElementById('input-habit');
    const nameInput = document.getElementById('input-name');
    const subtitleInput = document.getElementById('input-subtitle');

    if (titleInput) titleInput.addEventListener('input', (e) => {
        state.title = e.target.value;
        renderText();
    });
    if (habitInput) habitInput.addEventListener('change', (e) => {
        state.habit = e.target.value;
        renderText();
    });
    if (nameInput) nameInput.addEventListener('input', (e) => {
        state.name = e.target.value;
        renderText();
    });
    if (subtitleInput) subtitleInput.addEventListener('input', (e) => {
        state.subtitle = e.target.value;
        renderText();
    });

    // Couple name inputs
    const nameAInput = document.getElementById('input-name-a');
    const nameBInput = document.getElementById('input-name-b');

    if (nameAInput) nameAInput.addEventListener('input', (e) => {
        state.nameA = e.target.value;
        renderText();
    });
    if (nameBInput) nameBInput.addEventListener('input', (e) => {
        state.nameB = e.target.value;
        renderText();
    });

    // Couple tracker toggle
    const coupleToggle = document.getElementById('couple-toggle');
    if (coupleToggle) {
        coupleToggle.addEventListener('click', () => {
            state.coupleMode = !state.coupleMode;
            coupleToggle.classList.toggle('active', state.coupleMode);
            renderCoupleMode();
        });
    }

    // Add-on toggles
    document.querySelectorAll('.addon-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const key = toggle.dataset.addon;
            toggle.classList.toggle('active');
            state.addons[key] = toggle.classList.contains('active');
            const preview = document.getElementById(`addon-${key}`);
            if (preview) {
                preview.classList.toggle('visible', state.addons[key]);
            }
        });
    });

    // Ink-friendly toggle
    const inkToggle = document.getElementById('ink-toggle');
    if (inkToggle) {
        inkToggle.addEventListener('click', () => {
            state.inkFriendly = !state.inkFriendly;
            inkToggle.classList.toggle('active', state.inkFriendly);
            document.getElementById('tracker-page').classList.toggle('ink-friendly', state.inkFriendly);
        });
    }

    // Print button
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }

    // ========== INIT ==========
    renderAll();

    // Parse URL query params for deep-linking from main site
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        const paramHabit = urlParams.get('habit');
        const paramTheme = urlParams.get('theme');
        const paramDuration = urlParams.get('duration');
        const paramName = urlParams.get('name');

        if (paramHabit && habitInput) {
            // Try to select matching option
            const option = Array.from(habitInput.options).find(o => o.value === paramHabit);
            if (option) {
                habitInput.value = paramHabit;
                state.habit = paramHabit;
            }
        }

        if (paramTheme && ['calm', 'cozy', 'minimal', 'nature'].includes(paramTheme)) {
            state.theme = paramTheme;
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            document.querySelector(`.theme-card[data-theme="${paramTheme}"]`)?.classList.add('active');
        }

        if (paramDuration && [30, 60, 90].includes(parseInt(paramDuration))) {
            state.duration = parseInt(paramDuration);
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.duration-btn[data-duration="${paramDuration}"]`)?.classList.add('active');
        }

        if (paramName && nameInput) {
            nameInput.value = paramName;
            state.name = paramName;
            // Update character count
            const nameCount = document.getElementById('name-count');
            if (nameCount) nameCount.textContent = paramName.length;
        }

        // Re-render with applied params
        renderAll();
    }

    // Set initial active states
    document.querySelector('.duration-btn[data-duration="30"]')?.classList.add('active');
    document.querySelector('.theme-card[data-theme="calm"]')?.classList.add('active');
});
