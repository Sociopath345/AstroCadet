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
        this.hoveredStation = null;
        this.outpostLoopActive = false;

        this.moonBaseImg = new Image();
        this.moonBaseImg.src = 'assets/moon-base.jpg';

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

        // NASA Modal close
        document.getElementById('modal-close-btn').addEventListener('click', () => {
            window.soundFX.playClick();
            document.getElementById('nasa-modal').classList.remove('active');
        });
        document.getElementById('btn-nasa-insight').addEventListener('click', () => {
            window.soundFX.playClick();
            this.showNasaModal();
        });

        // Astronaut Dossier Modal close
        document.getElementById('dossier-close-btn').addEventListener('click', () => {
            window.soundFX.playClick();
            document.getElementById('crew-dossier-modal').classList.remove('active');
        });

        // Outpost Canvas Mouse Interactions
        const mapCanvas = document.getElementById('outpost-map-canvas');
        if (mapCanvas) {
            mapCanvas.addEventListener('mousemove', (e) => {
                if (this.state !== 'OUTPOST') return;
                const rect = mapCanvas.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const w = mapCanvas.width;
                const h = mapCanvas.height;

                const stations = [
                    { id: 'hub', x: w * 0.50, y: h * 0.51, crewId: 'c1' },
                    { id: 'solar', x: w * 0.23, y: h * 0.26, crewId: 'c5' },
                    { id: 'farm', x: w * 0.76, y: h * 0.29, crewId: 'c2' },
                    { id: 'water', x: w * 0.20, y: h * 0.64, crewId: 'c3' },
                    { id: 'shelter', x: w * 0.77, y: h * 0.67, crewId: 'c6' },
                    { id: 'rover', x: w * 0.49, y: h * 0.76, crewId: 'c4' }
                ];

                let found = null;
                for (const s of stations) {
                    const dist = Math.hypot(mx - s.x, my - s.y);
                    if (dist < 45) {
                        found = s;
                        break;
                    }
                }

                if (found) {
                    if (this.hoveredStation !== found.id) {
                        window.soundFX.playHover();
                    }
                    this.hoveredStation = found.id;
                    mapCanvas.style.cursor = 'pointer';
                } else {
                    this.hoveredStation = null;
                    mapCanvas.style.cursor = 'default';
                }
            });

            mapCanvas.addEventListener('click', (e) => {
                if (this.state !== 'OUTPOST' || !this.hoveredStation) return;
                const stations = [
                    { id: 'hub', crewId: 'c1' },
                    { id: 'solar', crewId: 'c5' },
                    { id: 'farm', crewId: 'c2' },
                    { id: 'water', crewId: 'c3' },
                    { id: 'shelter', crewId: 'c6' },
                    { id: 'rover', crewId: 'c4' }
                ];
                const match = stations.find(s => s.id === this.hoveredStation);
                if (match) {
                    const crew = window.MISSION_DATA.crewMembers.find(c => c.id === match.crewId);
                    if (crew) this.showAstronautDossier(crew);
                }
            });
        }
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
            this.initOutpostMapLoop();
        }
    }

    renderCrewBriefing() {
        const row = document.getElementById('crew-preview-row');
        if (!row) return;
        row.innerHTML = window.MISSION_DATA.crewMembers.map(c => `
            <div class="crew-card" data-crew-id="${c.id}">
                <div class="crew-avatar" style="filter: drop-shadow(0 0 8px ${c.color});">${c.avatar}</div>
                <div class="crew-info">
                    <h4 style="color: ${c.color};">${c.name}</h4>
                    <p style="font-size: 11px; color: var(--accent-yellow);">${c.title[window.LANG.current] || c.title.en}</p>
                    <p style="font-size: 11px; color: var(--text-secondary);">${c.role[window.LANG.current] || c.role.en}</p>
                </div>
            </div>
        `).join('');

        row.querySelectorAll('.crew-card').forEach(card => {
            card.addEventListener('click', () => {
                const crew = window.MISSION_DATA.crewMembers.find(c => c.id === card.dataset.crewId);
                if (crew) this.showAstronautDossier(crew);
            });
        });
    }

    showAstronautDossier(c) {
        window.soundFX.playSelect();
        const modal = document.getElementById('crew-dossier-modal');
        document.getElementById('dossier-avatar').textContent = c.avatar;
        document.getElementById('dossier-name').textContent = c.name;
        document.getElementById('dossier-name').style.color = c.color;
        document.getElementById('dossier-role').textContent = `${c.title[window.LANG.current] || c.title.en} — ${c.role[window.LANG.current] || c.role.en}`;
        document.getElementById('dossier-bio').textContent = c.bio[window.LANG.current] || c.bio.en;
        document.getElementById('dossier-bonus').textContent = c.bonus[window.LANG.current] || c.bonus.en;

        const achList = document.getElementById('dossier-achievements-list');
        achList.innerHTML = c.achievements.map(a => `
            <div class="achievement-item">
                <h5>${a.title[window.LANG.current] || a.title.en}</h5>
                <p>${a.desc[window.LANG.current] || a.desc.en}</p>
            </div>
        `).join('');

        modal.classList.add('active');
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
        this.renderOutpostCrewDock();
        this.renderShiftEvent();
        this.renderOutpostMap();
    }

    renderOutpostCrewDock() {
        const dock = document.getElementById('outpost-crew-dock');
        if (!dock) return;
        dock.innerHTML = window.MISSION_DATA.crewMembers.map(c => `
            <button class="dock-avatar-btn" data-crew-id="${c.id}" title="${c.name} (${c.title[window.LANG.current] || c.title.en})">
                ${c.avatar}
            </button>
        `).join('');

        dock.querySelectorAll('.dock-avatar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const crew = window.MISSION_DATA.crewMembers.find(c => c.id === btn.dataset.crewId);
                if (crew) this.showAstronautDossier(crew);
            });
        });
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

    initOutpostMapLoop() {
        if (this.outpostLoopActive) return;
        this.outpostLoopActive = true;
        const loop = () => {
            if (this.state === 'OUTPOST') {
                this.renderOutpostMap();
                requestAnimationFrame(loop);
            } else {
                this.outpostLoopActive = false;
            }
        };
        requestAnimationFrame(loop);
    }

    renderOutpostMap() {
        const canvas = document.getElementById('outpost-map-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.parentElement.clientWidth || 800;
        const h = canvas.height = canvas.parentElement.clientHeight || 550;

        ctx.clearRect(0, 0, w, h);

        // 1. Draw 3D Isometric Moon Base Background Image
        if (this.moonBaseImg && this.moonBaseImg.complete && this.moonBaseImg.naturalWidth > 0) {
            ctx.drawImage(this.moonBaseImg, 0, 0, w, h);

            // If Mars is selected, apply atmospheric red dust tint
            if (this.selectedDest && this.selectedDest.id === 'mars') {
                ctx.fillStyle = 'rgba(180, 50, 20, 0.28)';
                ctx.fillRect(0, 0, w, h);
            }
        } else {
            // Fallback dark gradient
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#060a16');
            grad.addColorStop(0.65, '#3a4154');
            grad.addColorStop(1, '#1b1f2b');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        }

        const t = Date.now() * 0.002;

        // Station Hotspot Coordinates corresponding to the 3D isometric artwork
        const stations = [
            { id: 'hub', label: 'COMMAND DOME', icon: '🏠', x: w * 0.50, y: h * 0.51, color: '#00f0ff', crew: 'Kyaw', stat: `Power: ${Math.round(this.resources.power)}%` },
            { id: 'solar', label: 'SOLAR ARRAYS', icon: '☀️', x: w * 0.23, y: h * 0.26, color: '#ffe600', crew: 'Thwin', stat: '+35 kW Flux' },
            { id: 'farm', label: 'BIO-GREENHOUSE', icon: '🌱', x: w * 0.76, y: h * 0.29, color: '#00ff88', crew: 'Sein', stat: `Food: ${Math.round(this.resources.food)}%` },
            { id: 'water', label: 'ECLSS WATER TOWER', icon: '💧', x: w * 0.20, y: h * 0.64, color: '#38bdf8', crew: 'Thein', stat: `H₂O: ${Math.round(this.resources.water)}%` },
            { id: 'shelter', label: 'REGOLITH BUNKER', icon: '🛡️', x: w * 0.77, y: h * 0.67, color: '#ff2a5f', crew: 'Thike', stat: `Shield: ${Math.round(this.resources.shield)}%` },
            { id: 'rover', label: 'SCOUT ROVER', icon: '🚙', x: w * 0.49, y: h * 0.76, color: '#c084fc', crew: 'Hein', stat: 'Surveys Active' }
        ];

        // 2. Draw Animated Pulsing Glowing Energy Lines Along the 4 Connector Tubes
        const hub = stations[0];
        const podTargets = [stations[1], stations[2], stations[3], stations[4]];

        podTargets.forEach((p, idx) => {
            // Neon Tube Glow Line
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(hub.x, hub.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Flowing Light Particles along the Tube
            const pulseProgress = ((t * 0.6 + idx * 0.25) % 1);
            const px = hub.x + (p.x - hub.x) * pulseProgress;
            const py = hub.y + (p.y - hub.y) * pulseProgress;

            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // 3. Draw Station Markers & Holographic Badges
        stations.forEach(s => {
            const isHovered = this.hoveredStation === s.id;
            const pulse = Math.sin(t * 2) * 3;

            // Holographic Pulse Ring
            ctx.strokeStyle = s.color;
            ctx.lineWidth = isHovered ? 3 : 1.5;
            ctx.beginPath();
            ctx.arc(s.x, s.y - 12, (isHovered ? 26 : 22) + pulse, 0, Math.PI * 2);
            ctx.stroke();

            // Holographic Floating Badge Box
            const bw = 110;
            const bh = 26;
            const bx = s.x - bw / 2;
            const by = s.y - 50;

            ctx.fillStyle = 'rgba(10, 16, 32, 0.85)';
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(bx, by, bw, bh, 6);
            ctx.fill();
            ctx.stroke();

            // Text
            ctx.font = 'bold 9.5px Orbitron';
            ctx.fillStyle = s.color;
            ctx.textAlign = 'center';
            ctx.fillText(`${s.icon} ${s.label}`, s.x, by + 11);

            ctx.font = '8.5px Outfit';
            ctx.fillStyle = '#c9d1d9';
            ctx.fillText(`${s.stat} • ${s.crew}`, s.x, by + 21);
        });

        // 4. Draw 6 Animated Astronauts moving at their stations
        window.MISSION_DATA.crewMembers.forEach((c, idx) => {
            const st = stations[idx] || stations[0];
            const ax = st.x + Math.sin(t * 1.5 + idx * 1.2) * 14;
            const ay = st.y + 10 + Math.cos(t * 2 + idx) * 5;

            // Small shadow
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath();
            ctx.ellipse(ax, ay + 6, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Avatar & Name Tag
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.avatar, ax, ay);

            ctx.font = 'bold 9px Orbitron';
            ctx.fillStyle = c.color;
            ctx.fillText(c.name.split(' ')[1] || c.name, ax, ay + 14);
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
