// Web Audio API Procedural Sound Synthesizer for Space Mission Game
// Zero external audio files required!

class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported', e);
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
    }

    playHover() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
    }

    playSelect() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        [587.33, 880, 1174.66].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + i * 0.04);
            gain.gain.setValueAtTime(0.12, t + i * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + i * 0.04);
            osc.stop(t + i * 0.04 + 0.2);
        });
    }

    playLaunch() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const bufferSize = this.ctx.sampleRate * 2.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 1.8);
        filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 2.5);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
        noise.stop(this.ctx.currentTime + 2.5);
    }

    playAlarm() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        for (let i = 0; i < 3; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 660, t + i * 0.15);
            gain.gain.setValueAtTime(0.18, t + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.15 + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + i * 0.15);
            osc.stop(t + i * 0.15 + 0.12);
        }
    }

    playPower() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50];
        const t = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t + idx * 0.12);
            gain.gain.setValueAtTime(0.2, t + idx * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.45);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + idx * 0.12);
            osc.stop(t + idx * 0.12 + 0.45);
        });
    }

    playFailure() {
        if (!this.enabled) return;
        this.init(); this.resume();
        if (!this.ctx) return;

        const notes = [440, 370, 311, 220];
        const t = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, t + idx * 0.2);
            gain.gain.setValueAtTime(0.25, t + idx * 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.2 + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + idx * 0.2);
            osc.stop(t + idx * 0.2 + 0.5);
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

window.soundFX = new SoundFX();
