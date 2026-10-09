// LunaGuard: Junior Astronaut Mission Trainer — Core Game Engine & Phaser Integration

class SpaceGame {
    constructor() {
        this.state = 'BRIEFING'; // BRIEFING, DESTINATION, PAYLOAD, LAUNCH, OUTPOST, REPORT
        this.selectedDest = null;
        this.equipped = {
            engine: null,
            fuel: null,
            capsule: null,
            life_support: null,
            food: null,
            power: null,
            landing: null,
            exploration: null
        };
        this.activeCat = 'engine';
        this.totalMass = 0;
        this.isValidPayload = false;

        // Outpost Live Simulation Resources
        this.resources = {
            power: 80,
            powerMax: 100,
            oxygen: 80,
            water: 75,
            food: 70,
            shield: 50,
            health: 100,
            morale: 85,
            science: 0
        };

        this.shiftIndex = 0;
        this.selectedChoice = null;
        this.decisionHistory = [];
        this.score = 0;
        this.phaserGame = null;

        this.baseImg = new Image();
        this.baseImg.src = 'base_image.jpg';

        this.init();
    }

    init() {
        this.initStars();
        this.bindDOM();
        this.updateScreen('BRIEFING');
        this.populateCategories();
        this.renderCrewBriefing();
        this.updateTranslations();
    }

    initStars() {
        const canvas = document.getElementById('star-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.3 + 0.05
        }));

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#070913';
            ctx.fillRect(0, 0, width, height);

            stars.forEach(s => {
                s.y += s.speed;
                if (s.y > height) s.y = 0;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 240, 255, ${s.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    bindDOM() {
        // Navigation Buttons
        document.getElementById('btn-to-dest').addEventListener('click', () => {
            window.soundFX.playClick();
            this.updateScreen('DESTINATION');
        });

        document.getElementById('btn-to-payload').addEventListener('click', () => {
            if (!this.selectedDest) return;
            window.soundFX.playSelect();
            this.updateScreen('PAYLOAD');
        });

        document.getElementById('btn-launch-mission').addEventListener('click', () => {
            if (!this.isValidPayload) return;
            window.soundFX.playLaunch();
            this.startLaunchSequence();
        });

        document.getElementById('btn-next-shift').addEventListener('click', () => {
            this.executeShiftChoice();
        });

        document.getElementById('btn-replay').addEventListener('click', () => {
            window.soundFX.playClick();
            this.resetGame();
        });

        // Destination Cards
        document.querySelectorAll('.dest-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const destKey = card.dataset.dest;
                this.selectDestination(destKey);
            });
        });

        // Language toggle
        document.getElementById('lang-toggle-btn').addEventListener('click', () => {
            window.soundFX.playClick();
            const next = window.LANG.current === 'en' ? 'my' : 'en';
            window.LANG.setLang(next);
            this.updateTranslations();
        });

        // Sound toggle
        document.getElementById('sound-toggle-btn').addEventListener('click', () => {
            const enabled = window.soundFX.toggle();
            const icon = document.getElementById('sound-icon');
            if (icon) icon.textContent = enabled ? '🔊' : '🔇';
        });

        // Modal close
        document.getElementById('modal-close-btn').addEventListener('click', () => {
            window.soundFX.playClick();
            document.getElementById('nasa-modal').classList.remove('active');
        });
        document.getElementById('btn-nasa-insight').addEventListener('click', () => {
            window.soundFX.playClick();
            this.showNasaModal();
        });
    }

    updateScreen(screenState) {
        this.state = screenState;
        document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
        const active = document.getElementById(`screen-${screenState.toLowerCase()}`);
        if (active) active.classList.add('active');

        if (screenState === 'PAYLOAD') {
            this.renderCategoryItems(this.activeCat);
            this.updatePayloadHUD();
        } else if (screenState === 'OUTPOST') {
            this.renderOutpostScreen();
        }
    }

    renderCrewBriefing() {
        const row = document.getElementById('crew-preview-row');
        if (!row) return;
        row.innerHTML = window.MISSION_DATA.crewMembers.map(c => `
            <div class="crew-card">
                <div class="crew-avatar">${c.avatar}</div>
                <div class="crew-info">
                    <h4>${c.name}</h4>
                    <p>${c.role[window.LANG.current] || c.role.en}</p>
                </div>
            </div>
        `).join('');
    }

    selectDestination(destKey) {
        window.soundFX.playSelect();
        this.selectedDest = window.MISSION_DATA.destinations[destKey];
        document.querySelectorAll('.dest-card').forEach(c => {
            c.classList.toggle('selected', c.dataset.dest === destKey);
        });
        const proceedBtn = document.getElementById('btn-to-payload');
        proceedBtn.disabled = false;
        proceedBtn.style.opacity = '1';

        // Auto-fill default baseline loadout
        this.equipDefaultPayload();
    }

    equipDefaultPayload() {
        if (this.selectedDest.id === 'moon') {
            this.equipped = {
                engine: 'eng_light',
                fuel: 'fuel_standard',
                capsule: 'cap_standard',
                life_support: 'life_standard',
                food: 'food_greenhouse',
                power: 'pwr_solar',
                landing: 'landing_basic',
                exploration: 'exp_mini'
            };
        } else {
            this.equipped = {
                engine: 'eng_powerful',
                fuel: 'fuel_large',
                capsule: 'cap_standard',
                life_support: 'life_extended',
                food: 'food_greenhouse',
                power: 'pwr_hybrid',
                landing: 'landing_adv',
                exploration: 'exp_science'
            };
        }
    }

    populateCategories() {
        const tabs = document.getElementById('category-tabs');
        if (!tabs) return;
        tabs.innerHTML = window.MISSION_DATA.categories.map(cat => `
            <button class="cat-tab-btn ${cat.id === this.activeCat ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.icon} ${window.LANG.get(cat.nameKey)}
            </button>
        `).join('');

        tabs.querySelectorAll('.cat-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundFX.playHover();
                this.activeCat = btn.dataset.cat;
                tabs.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderCategoryItems(this.activeCat);
            });
        });
    }

    renderCategoryItems(catId) {
        const list = document.getElementById('category-items-list');
        if (!list) return;
        const items = window.MISSION_DATA.payloadItems[catId] || [];

        list.innerHTML = items.map(item => {
            const isEquipped = this.equipped[catId] === item.id;
            return `
                <div class="item-card ${isEquipped ? 'equipped' : ''}" data-id="${item.id}" data-cat="${catId}">
                    <div class="item-main">
                        <div class="item-icon">${item.icon}</div>
                        <div class="item-text">
                            <h4>${item.name[window.LANG.current] || item.name.en} ${isEquipped ? '✓' : ''}</h4>
                            <p>${item.desc[window.LANG.current] || item.desc.en}</p>
                        </div>
                    </div>
                    <div class="item-mass-badge">${item.mass.toLocaleString()} kg</div>
                </div>
            `;
        }).join('');

        list.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', () => {
                window.soundFX.playClick();
                const id = card.dataset.id;
                const cat = card.dataset.cat;
                this.equipped[cat] = id;
                this.renderCategoryItems(cat);
                this.updatePayloadHUD();
            });
        });
    }

    updatePayloadHUD() {
        if (!this.selectedDest) return;
        let mass = 0;
        let missingReqs = false;

        // Calculate mass & validate
        Object.entries(this.equipped).forEach(([cat, itemId]) => {
            if (itemId) {
                const item = window.MISSION_DATA.payloadItems[cat].find(i => i.id === itemId);
                if (item) mass += item.mass;
            } else {
                missingReqs = true;
            }
        });

        this.totalMass = mass;
        const max = this.selectedDest.maxMass;
        const pct = Math.min(100, Math.round((mass / max) * 100));

        const massFill = document.getElementById('mass-bar-fill');
        const massText = document.getElementById('mass-text-display');
        const validator = document.getElementById('payload-validator-msg');
        const launchBtn = document.getElementById('btn-launch-mission');

        massFill.style.width = `${pct}%`;
        massText.textContent = `${mass.toLocaleString()} kg / ${max.toLocaleString()} kg (${pct}%)`;

        // Destination requirements check
        const reqs = this.selectedDest.requirements;
        let rulesMet = true;
        Object.keys(reqs).forEach(cat => {
            const allowed = reqs[cat];
            const currentItem = this.equipped[cat];
            if (!allowed.includes('any') && !allowed.includes(currentItem)) {
                rulesMet = false;
            }
        });

        if (mass > max) {
            massFill.classList.add('overload');
            validator.className = 'status-validator-box invalid';
            validator.textContent = window.LANG.get('hint_mass_exceeded');
            this.isValidPayload = false;
        } else if (!rulesMet || missingReqs) {
            massFill.classList.remove('overload');
            validator.className = 'status-validator-box invalid';
            validator.textContent = window.LANG.get('hint_requirements_missing');
            this.isValidPayload = false;
        } else {
            massFill.classList.remove('overload');
            validator.className = 'status-validator-box valid';
            validator.textContent = window.LANG.get('hint_ready_to_launch');
            this.isValidPayload = true;
        }

        launchBtn.disabled = !this.isValidPayload;
        this.renderRocketSlots();
    }

    renderRocketSlots() {
        const slotsGrid = document.getElementById('rocket-slots-grid');
        if (!slotsGrid) return;

        slotsGrid.innerHTML = window.MISSION_DATA.categories.map(cat => {
            const equippedId = this.equipped[cat.id];
            const item = equippedId ? window.MISSION_DATA.payloadItems[cat.id].find(i => i.id === equippedId) : null;
            return `
                <div class="slot-box ${item ? 'filled' : ''}">
                    <div class="slot-icon">${item ? item.icon : cat.icon}</div>
                    <div class="slot-info">
                        <h5>${window.LANG.get(cat.nameKey)}</h5>
                        <p>${item ? (item.name[window.LANG.current] || item.name.en) : 'EMPTY'}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    startLaunchSequence() {
        this.updateScreen('LAUNCH');
        const container = document.getElementById('phaser-game-container');
        container.innerHTML = '';

        const self = this;
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            width: container.clientWidth || 1000,
            height: container.clientHeight || 600,
            backgroundColor: self.selectedDest.bgColor,
            scene: {
                preload: function() {},
                create: function() {
                    const width = this.cameras.main.width;
                    const height = this.cameras.main.height;

                    // Starfield particle background
                    const stars = this.add.graphics();
                    for (let i = 0; i < 150; i++) {
                        stars.fillStyle(0xffffff, Math.random());
                        stars.fillCircle(Math.random() * width, Math.random() * height, Math.random() * 2);
                    }

                    // Procedural Rocket Graphic
                    const rocket = this.add.container(width / 2, height - 120);

                    const body = this.add.graphics();
                    // Nose Cone
                    body.fillStyle(0x00f0ff, 1);
                    body.fillTriangle(-20, -50, 20, -50, 0, -90);
                    // Fuselage
                    body.fillStyle(0xf0f6fc, 1);
                    body.fillRoundedRect(-20, -50, 40, 90, 4);
                    // Windows
                    body.fillStyle(0x070913, 1);
                    body.fillCircle(0, -25, 8);
                    body.fillStyle(0x00f0ff, 0.8);
                    body.fillCircle(0, -25, 6);
                    // Fins
                    body.fillStyle(0xff2a5f, 1);
                    body.fillTriangle(-20, 20, -40, 40, -20, 40);
                    body.fillTriangle(20, 20, 40, 40, 20, 40);
                    rocket.add(body);

                    // Procedural Thruster Fire/Smoke Particles
                    const particles = this.add.particles(0, 42, null, {
                        speed: { min: 100, max: 250 },
                        angle: { min: 80, max: 100 },
                        scale: { start: 1.2, end: 0 },
                        alpha: { start: 0.9, end: 0 },
                        lifespan: 500,
                        tint: [0xffe600, 0xff5a00, 0xff2a5f, 0x00f0ff],
                        blendMode: 'ADD'
                    });
                    rocket.add(particles);

                    // Status Text
                    const launchText = this.add.text(width / 2, 80, 'LIFTOFF SEQUENCE INITIATED', {
                        fontFamily: 'Orbitron',
                        fontSize: '24px',
                        color: '#ffe600'
                    }).setOrigin(0.5);

                    // Camera Shake & Launch Tween
                    this.cameras.main.shake(1500, 0.015);
                    this.tweens.add({
                        targets: rocket,
                        y: -150,
                        duration: 3200,
                        ease: 'Quad.easeIn',
                        onComplete: () => {
                            launchText.setText(`ARRIVING AT ${self.selectedDest.id.toUpperCase()} ORBIT`);
                            this.time.delayedCall(1200, () => {
                                self.initOutpostResources();
                                self.updateScreen('OUTPOST');
                            });
                        }
                    });
                }
            }
        };

        if (this.phaserGame) this.phaserGame.destroy(true);
        this.phaserGame = new Phaser.Game(config);
    }

    initOutpostResources() {
        // Calculate initial base stats based on loaded modules
        const lifeItem = window.MISSION_DATA.payloadItems.life_support.find(i => i.id === this.equipped.life_support);
        const powerItem = window.MISSION_DATA.payloadItems.power.find(i => i.id === this.equipped.power);
        const landingItem = window.MISSION_DATA.payloadItems.landing.find(i => i.id === this.equipped.landing);
        const capItem = window.MISSION_DATA.payloadItems.capsule.find(i => i.id === this.equipped.capsule);

        this.resources = {
            power: powerItem ? Math.min(100, powerItem.maxStorage * 0.75) : 80,
            powerMax: powerItem ? powerItem.maxStorage : 100,
            oxygen: lifeItem ? lifeItem.o2Gen * 3.8 : 75,
            water: 75,
            food: 70,
            shield: landingItem ? landingItem.shieldBase : 40,
            health: 100,
            morale: capItem ? capItem.moraleBase : 80,
            science: 10
        };

        this.shiftIndex = 0;
        this.decisionHistory = [];
        this.score = 250;
    }

    renderOutpostScreen() {
        this.updateResourceHUD();
        this.renderShiftEvent();
        this.renderOutpostMap();
    }

    updateResourceHUD() {
        const res = this.resources;
        const setGauge = (id, val, max = 100) => {
            const pct = Math.max(0, Math.min(100, Math.round((val / max) * 100)));
            const fill = document.getElementById(`res-fill-${id}`);
            const text = document.getElementById(`res-val-${id}`);
            if (fill) {
                fill.style.width = `${pct}%`;
                fill.className = `res-fill ${pct > 55 ? 'fill-green' : pct > 25 ? 'fill-yellow' : 'fill-red'}`;
            }
            if (text) text.textContent = `${Math.round(val)}%`;
        };

        setGauge('power', res.power, res.powerMax);
        setGauge('oxygen', res.oxygen);
        setGauge('water', res.water);
        setGauge('food', res.food);
        setGauge('shield', res.shield);
        setGauge('health', res.health);

        document.getElementById('hud-shift-num').textContent = `${this.shiftIndex + 1} / 5`;
        document.getElementById('hud-score-num').textContent = `${this.score} PTS`;
    }

    renderShiftEvent() {
        const shift = window.MISSION_DATA.shifts[this.shiftIndex];
        if (!shift) {
            this.showMissionReport();
            return;
        }

        const titleEl = document.getElementById('event-title');
        const descEl = document.getElementById('event-desc');
        const choicesEl = document.getElementById('event-choices-list');
        const nextBtn = document.getElementById('btn-next-shift');

        titleEl.textContent = shift.title[window.LANG.current] || shift.title.en;
        descEl.textContent = shift.desc[window.LANG.current] || shift.desc.en;
        this.selectedChoice = null;
        nextBtn.disabled = true;

        choicesEl.innerHTML = shift.choices.map((c, i) => `
            <div class="choice-btn" data-choice-id="${c.id}" data-index="${i}">
                <div class="choice-name">${c.name[window.LANG.current] || c.name.en}</div>
                <div class="choice-consequence">${c.desc[window.LANG.current] || c.desc.en}</div>
            </div>
        `).join('');

        choicesEl.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundFX.playClick();
                choicesEl.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedChoice = shift.choices[btn.dataset.index];
                nextBtn.disabled = false;
            });
        });
    }

    executeShiftChoice() {
        if (!this.selectedChoice) return;
        window.soundFX.playPower();

        const eff = this.selectedChoice.effects;
        const res = this.resources;

        // Apply resource trade-offs
        if (eff.power) res.power = Math.max(0, Math.min(res.powerMax, res.power + eff.power));
        if (eff.powerProd) res.power = Math.min(res.powerMax, res.power + eff.powerProd);
        if (eff.oxygen) res.oxygen = Math.max(0, Math.min(100, res.oxygen + eff.oxygen));
        if (eff.water) res.water = Math.max(0, Math.min(100, res.water + eff.water));
        if (eff.food) res.food = Math.max(0, Math.min(100, res.food + eff.food));
        if (eff.shield) res.shield = Math.max(0, Math.min(100, res.shield + eff.shield));
        if (eff.health) res.health = Math.max(0, Math.min(100, res.health + eff.health));
        if (eff.morale) res.morale = Math.max(0, Math.min(100, res.morale + eff.morale));
        if (eff.science) {
            res.science += eff.science;
            this.score += eff.science * 10;
        }

        // Base shift consumption rates
        res.oxygen = Math.max(0, res.oxygen - 6);
        res.water = Math.max(0, res.water - 5);
        res.food = Math.max(0, res.food - 4);
        this.score += 80;

        this.decisionHistory.push({
            shift: this.shiftIndex + 1,
            choice: this.selectedChoice,
            stateAfter: { ...res }
        });

        // Check Critical Failure condition
        if (res.health <= 0 || res.oxygen <= 0 || res.power <= 0) {
            window.soundFX.playFailure();
            this.showMissionReport(true);
            return;
        }

        this.shiftIndex++;
        if (this.shiftIndex >= 5) {
            window.soundFX.playSuccess();
            this.showMissionReport(false);
        } else {
            this.renderOutpostScreen();
        }
    }

    renderOutpostMap() {
        const canvas = document.getElementById('outpost-map-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.parentElement.clientWidth || 600;
        const h = canvas.height = canvas.parentElement.clientHeight || 450;

        ctx.clearRect(0, 0, w, h);

        // Draw Base Image or fallback
        if (this.baseImg && this.baseImg.complete && this.baseImg.naturalWidth > 0) {
            ctx.drawImage(this.baseImg, 0, 0, w, h);
        } else {
            // Draw Planetary Surface
            ctx.fillStyle = this.selectedDest.surfaceColor;
            ctx.beginPath();
            ctx.moveTo(0, h * 0.65);
            ctx.bezierCurveTo(w * 0.3, h * 0.6, w * 0.7, h * 0.7, w, h * 0.65);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.fill();
        }

        // Draw Outpost Modules
        const drawModule = (x, y, icon, label, glow = '#00f0ff') => {
            ctx.fillStyle = 'rgba(14, 24, 48, 0.9)';
            ctx.strokeStyle = glow;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x - 45, y - 40, 90, 80, 10);
            ctx.fill();
            ctx.stroke();

            ctx.font = '28px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(icon, x, y + 2);

            ctx.font = '11px Orbitron';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label, x, y + 30);
        };

        // Nodes are mapped to positions in the base image:
        // POWER (Solar): Top-Left
        // MAIN HAB: Center
        // BIO-FARM (Greenhouse): Top-Right
        // SCIENCE (Water/Resource cylinder): Bottom-Left
        // SHELTER (Bunker): Bottom-Right

        drawModule(w * 0.23, h * 0.28, '☀️⚡', 'POWER', '#ffe600');
        drawModule(w * 0.50, h * 0.45, '🏠🫁', 'MAIN HAB', '#00f0ff');
        drawModule(w * 0.77, h * 0.28, '🌱🍅', 'BIO-FARM', '#00ff88');
        drawModule(w * 0.77, h * 0.65, '🛡️🏰', 'SHELTER', '#ff2a5f');
        drawModule(w * 0.23, h * 0.60, '🔬🚙', 'SCIENCE', '#9d4edd');


        // Draw 4 Animated Astronauts
        const t = Date.now() * 0.002;
        window.MISSION_DATA.crewMembers.forEach((c, idx) => {
            const ax = (w * 0.3) + idx * (w * 0.12) + Math.sin(t + idx) * 12;
            const ay = (h * 0.62) + Math.cos(t + idx * 2) * 6;
            ctx.font = '20px sans-serif';
            ctx.fillText(c.avatar, ax, ay);
        });
    }

    showNasaModal() {
        const shift = window.MISSION_DATA.shifts[this.shiftIndex] || window.MISSION_DATA.shifts[0];
        const modal = document.getElementById('nasa-modal');
        const title = document.getElementById('nasa-modal-title');
        const text = document.getElementById('nasa-modal-text');
        const link = document.getElementById('nasa-modal-link');

        title.textContent = shift.nasaScience.title[window.LANG.current] || shift.nasaScience.title.en;
        text.textContent = shift.nasaScience.text[window.LANG.current] || shift.nasaScience.text.en;
        link.href = shift.nasaScience.link;
        modal.classList.add('active');
    }

    showMissionReport(isFailure = false) {
        this.updateScreen('REPORT');
        const titleEl = document.getElementById('report-outcome-title');
        const descEl = document.getElementById('report-outcome-desc');
        const scoreEl = document.getElementById('report-score-display');
        const listEl = document.getElementById('report-decisions-list');

        if (isFailure) {
            titleEl.textContent = window.LANG.get('outcome_evac');
            titleEl.style.color = 'var(--accent-red)';
            descEl.textContent = 'Critical resources were exhausted. Mission Control ordered an immediate emergency evacuation to preserve astronaut life.';
        } else {
            titleEl.textContent = window.LANG.get('outcome_success');
            titleEl.style.color = 'var(--accent-green)';
            descEl.textContent = `Commander completed 5 operational mission shifts with nominal crew vitals! Outpost established on ${this.selectedDest.id.toUpperCase()}.`;
        }

        scoreEl.textContent = `${this.score} POINTS`;

        listEl.innerHTML = this.decisionHistory.map(d => `
            <div class="glass-panel" style="padding: 12px; margin-bottom: 8px;">
                <strong>Shift ${d.shift}: ${d.choice.name[window.LANG.current] || d.choice.name.en}</strong>
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                    ${d.choice.desc[window.LANG.current] || d.choice.desc.en}
                </p>
            </div>
        `).join('');
    }

    resetGame() {
        this.selectedDest = null;
        this.equipped = { engine: null, fuel: null, capsule: null, life_support: null, food: null, power: null, landing: null, exploration: null };
        this.shiftIndex = 0;
        this.decisionHistory = [];
        this.updateScreen('BRIEFING');
    }

    updateTranslations() {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            el.textContent = window.LANG.get(key);
        });
        document.getElementById('lang-code-text').textContent = window.LANG.current.toUpperCase();
        this.renderCrewBriefing();
        if (this.state === 'PAYLOAD') {
            this.populateCategories();
            this.renderCategoryItems(this.activeCat);
            this.updatePayloadHUD();
        } else if (this.state === 'OUTPOST') {
            this.renderShiftEvent();
            this.renderOutpostMap();
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.gameApp = new SpaceGame();
});
