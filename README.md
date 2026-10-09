# LunaGuard: Junior Astronaut Mission Trainer 🚀🪐

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA_Space_Apps-Practice_Round-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)](https://www.spaceappschallenge.org/)
[![Phaser 3](https://img.shields.io/badge/Phaser-3.60.0-EA005E?style=for-the-badge&logo=phaser&logoColor=white)](https://phaser.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**LunaGuard** is an interactive, educational 2D Space Mission preparation and Outpost Survival / Resource Management Web Application built for the **NASA Space Apps Challenge** (*Build a Junior Astronaut Mission Trainer*).

---

## 🌌 Overview & Core Concept

Players step into the shoes of an **Outpost Commander**, preparing a rocket payload within strict mass and destination constraints, launching to the Moon or Mars, and managing a 4-astronaut crew through 5 critical operational shifts.

### 🌟 Key Features
- **🌐 Dual-Language Support**: Seamless instant toggle between **English** and **Burmese (မြန်မာစာ)**.
- **🔊 Zero-Asset Procedural Audio**: Built-in **Web Audio API** synthesizer delivering high-tech UI sounds, alarms, engine rumble, and musical cues without any external media files.
- **🚀 8-Category Payload Configurator**: Live mass-threshold calculation and destination constraint validation for Moon and Mars.
- **🔥 Phaser 3 Launch & Transit Simulation**: Procedural particle fire, smoke physics, screen shake, and orbital arrival.
- **⚡ 6-Resource Outpost Simulator**: Real-time balancing of **Power**, **Oxygen (O₂)**, **Water**, **Food**, **Radiation Shielding**, and **Crew Health**.
- **🔬 NASA Science Insights**: Real-world scientific trade-offs and research citations (*NASA ECLSS, Space Radiation Hazards, Veggie Space Crops, Fission Surface Power*).
- **📊 Debriefing & Decision Log**: End-of-mission performance scoring and decision retrospectives.

---

## 🕹️ Gameplay Flow

```text
[ Mission Briefing ] ➔ [ Destination Selection ] ➔ [ Payload Loading & Validation ]
                                                               ↓
[ Debriefing & Report ] 🠔 [ Outpost Survival Shifts ] 🠔 [ Rocket Launch Sequence ]
```

1. **Briefing**: Meet the 4-astronaut specialist crew (*Commander Aung, Dr. Thida, Engineer Kyaw, Dr. Su*).
2. **Destination**:
   - **Luna Base (Moon)**: Mass limit 8,000 kg, high solar energy, 14-day freezing lunar night, regolith shielding.
   - **Ares Outpost (Mars)**: Mass limit 12,000 kg, global dust storms, strict closed-loop water dependency.
3. **Payload Configuration**: Drag/click equipment into 8 rocket slots while staying under the mass limit.
4. **Launch Sequence**: Watch thrusters fire and ascend to planetary orbit.
5. **Outpost Operations**: Solve 5 emergency dilemmas balancing life support, greenhouse food, and battery backups.
6. **Mission Debrief**: Review your final score, astronaut survival status, and NASA research facts.

---

## 🛠️ Technology Stack

- **Game Engine**: [Phaser 3.60.0](https://phaser.io/) (via CDN)
- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS3 (Dark Glassmorphism, Neon Glow, Google Fonts `Orbitron` & `Outfit`)
- **Audio**: Web Audio API (Procedural sound synthesis)
- **No Build Step Required**: Runs natively in any modern web browser.

---

## 🚀 Quick Start / Local Setup

No `npm install` or compilation needed. Simply clone and open:

```bash
# 1. Clone the repository
git clone https://github.com/Sociopath345/AstroCadet.git

# 2. Navigate to project folder
cd AstroCadet

# 3. Open in your browser
# Double-click index.html or run a local server:
python -m http.server 8088
```

Then visit `http://localhost:8088` in your browser.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for details.
