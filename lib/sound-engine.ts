// Native Web Audio API Synthesizer for VÉRSE luxury electric performance experience

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private throttleOsc: OscillatorNode | null = null;
  private throttleGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isRunning: boolean = false;

  public initContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(muted ? 0 : 0.08, this.ctx.currentTime, 0.1);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public startAmbient() {
    if (this.isRunning) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2.5);

      this.filterNode = ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(140, ctx.currentTime);

      // Deep sub-harmonic motor tone
      this.ambientOsc1 = ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      // Gentle binaural beating for immersive luxury texture
      this.ambientOsc2 = ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(57.5, ctx.currentTime);

      this.ambientOsc1.connect(this.filterNode);
      this.ambientOsc2.connect(this.filterNode);
      this.filterNode.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isRunning = true;
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public playClick(freq = 1200, duration = 0.04) {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  public playModeSwitch() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [220, 440, 660, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.04;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.03, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.15);
      });
    } catch {
      // Audio fallback
    }
  }

  public playLaunchIgnition() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Main harmonic wave
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(90, now + 2.4);

      // Deep sub-bass reinforcement
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(45, now);
      subOsc.frequency.exponentialRampToValueAtTime(110, now + 1.2);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 2.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(90, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(220, now + 2.4);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 2.5);
      subOsc.stop(now + 2.5);
    } catch {
      // Audio fallback
    }
  }

  // Full Propulsion Chord with rich harmonics & binaural resonance
  public playPropulsionChord() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 3.5;

      // Chord Frequencies: Sub A1 (55Hz), E2 (82.4Hz), A2 (110Hz), C#3 (138.6Hz), E3 (164.8Hz), A3 (220Hz)
      const chord = [55, 82.4, 110, 138.6, 164.8, 220, 440];

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Slight pitch ascension simulating electric flux
        osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 1.8);
        osc.frequency.exponentialRampToValueAtTime(freq, now + duration);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, now);
        filter.frequency.exponentialRampToValueAtTime(freq * 3.5, now + 1.5);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.2, now + duration);
        filter.Q.setValueAtTime(2.0, now);

        const peakVol = 0.04 / (chord.length * 0.4);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(peakVol, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // Audio fallback
    }
  }

  public triggerThrottle(intensity: number) {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      if (!this.throttleOsc) {
        this.throttleOsc = ctx.createOscillator();
        this.throttleGain = ctx.createGain();
        this.throttleOsc.type = 'sawtooth';

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        this.throttleGain.gain.setValueAtTime(0.001, ctx.currentTime);
        this.throttleOsc.connect(filter);
        filter.connect(this.throttleGain);
        this.throttleGain.connect(ctx.destination);
        this.throttleOsc.start();
      }

      const baseFreq = 70 + intensity * 480;
      this.throttleOsc.frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.08);
      if (this.throttleGain) {
        const targetVol = intensity > 0.01 ? Math.min(0.08, intensity * 0.08) : 0.001;
        this.throttleGain.gain.setTargetAtTime(targetVol, ctx.currentTime, 0.08);
      }
    } catch {
      // Audio fallback
    }
  }
}

export const soundEngine = new SoundEngine();
