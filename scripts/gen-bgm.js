/**
 * 生成 30 秒原创 lo-fi 配乐（120 BPM），节拍与画面动作严格对齐：
 *  - 1.9s 上升音 → 编辑器面板弹入落拍
 *  - 8.35s 「哐当」低音撞击 → 垃圾桶删除片段
 *  - 14.15s 「叮」 → Ctrl+Z 撤销印章
 *  - 15.7→17.0s 上升音+镲 → 饱和度拉满
 *  - 20.0s 十六分音符密度加倍 → 卡点标记瀑布
 *  - 24.0s 抽稀 → 导出渲染
 *  - 28.0s 终止和弦+铃 → 收工便签
 * 用法: node scripts/gen-bgm.js [out.wav]   然后用 ffmpeg 转 mp3 进 public/
 */
const fs = require('fs');
const path = require('path');

const SR = 44100;
const DUR = 30.058;
const N = Math.ceil(SR * (DUR + 0.5));
const TAU = Math.PI * 2;
const L = new Float64Array(N);
const R = new Float64Array(N);

function addLR(t, sig, gl, gr) {
  const s0 = Math.round(t * SR);
  for (let i = 0; i < sig.length; i++) {
    const j = s0 + i;
    if (j < 0 || j >= N) continue;
    L[j] += sig[i] * gl;
    R[j] += sig[i] * gr;
  }
}

/* ---------------- 音色 ---------------- */
function kick(g) {
  const n = Math.round(0.28 * SR);
  const s = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 43 + 112 * Math.exp(-t * 24);
    ph += (TAU * f) / SR;
    const e = Math.exp(-t * 11) * (1 - Math.exp(-t * 600));
    s[i] = Math.sin(ph) * e * g;
  }
  return s;
}

function snare(g) {
  const n = Math.round(0.16 * SR);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const x = Math.random() * 2 - 1;
    const tone = Math.sin(TAU * 185 * t) * Math.exp(-t * 30) * 0.5;
    const e = Math.exp(-t * 22);
    s[i] = (x * 0.7 + tone) * e * g;
  }
  return s;
}

function hat(g, open) {
  const n = Math.round((open ? 0.3 : 0.055) * SR);
  const s = new Float64Array(n);
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const x = Math.random() * 2 - 1;
    const hp = x - prev; // 一阶高通
    prev = x;
    const e = Math.exp(-t * (open ? 9 : 70));
    s[i] = hp * e * g * 0.9;
  }
  return s;
}

function pad(freqs, dur, g) {
  const n = Math.round((dur + 0.6) * SR);
  const s = new Float64Array(n);
  for (const f0 of freqs) {
    for (const det of [-0.004, 0.004]) {
      const f = f0 * (1 + det);
      let ph = Math.random();
      for (let i = 0; i < n; i++) {
        const t = i / SR;
        let e = Math.min(1, t / 0.35);
        if (t > dur) e *= Math.max(0, 1 - (t - dur) / 0.55);
        const w = 2 * Math.abs(2 * (((ph % 1) + 1) % 1) - 1) - 1; // 三角波
        s[i] += w * e * g;
        ph += f / SR;
      }
    }
  }
  return s;
}

function bassN(f, dur, g) {
  const n = Math.round(dur * SR);
  const s = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const e = Math.min(1, t / 0.008) * Math.exp(-t * 3.2);
    s[i] = (Math.sin(ph) + 0.18 * Math.sin(2 * ph)) * e * g;
    ph += f / SR;
  }
  return s;
}

function pluck(f, g) {
  const n = Math.round(0.5 * SR);
  const s = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const e = Math.min(1, t / 0.004) * Math.exp(-t * 7);
    const vib = 1 + 0.004 * Math.sin(TAU * 5.5 * t);
    ph += (f * vib) / SR;
    s[i] = (Math.sin(ph) + 0.25 * Math.sin(2 * ph)) * e * g;
  }
  return s;
}

function ding(f, g, dur) {
  const n = Math.round((dur || 0.7) * SR);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] =
      (Math.sin(TAU * f * t) * Math.exp(-t * 5) +
        0.5 * Math.sin(TAU * f * 2.7 * t) * Math.exp(-t * 9)) *
      g;
  }
  return s;
}

function clunk(g) {
  const n = Math.round(0.25 * SR);
  const s = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 165 * Math.exp(-t * 18) + 58;
    ph += (TAU * f) / SR;
    const e = Math.exp(-t * 13);
    s[i] = (Math.sin(ph) + 0.3 * (Math.random() * 2 - 1) * Math.exp(-t * 40)) * e * g;
  }
  return s;
}

function riser(dur, g) {
  const n = Math.round(dur * SR);
  const s = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const k = t / dur;
    const f = 220 * Math.pow(2, k * 1.8);
    ph += (TAU * f) / SR;
    const noise = (Math.random() * 2 - 1) * (0.15 + 0.85 * k);
    s[i] = (Math.sin(ph) * 0.35 + noise) * k * k * g;
  }
  return s;
}

function crash(g) {
  const n = Math.round(1.1 * SR);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const e = Math.exp(-t * 3.2) * (1 - Math.exp(-t * 200));
    s[i] = (Math.random() * 2 - 1) * e * g;
  }
  return s;
}

/* ---------------- 编排 ---------------- */
const CH = {
  C: [261.63, 329.63, 392.0, 493.88],
  A: [220, 261.63, 329.63, 392.0],
  F: [174.61, 220, 261.63, 329.63],
  G: [196, 246.94, 293.66, 349.23],
};
const ROOT = { C: 65.41, A: 55.0, F: 43.65, G: 49.0 };
const PROG = ['C', 'A', 'F', 'G'];
const P = { C5: 523.25, D5: 587.33, E5: 659.26, G5: 783.99, A5: 880, C6: 1046.5 };

// 和声垫 + 贝斯（每小节 2s）
for (let bar = 0; bar < 15; bar++) {
  const t0 = bar * 2;
  let ch = bar < 1 || bar === 14 ? 'C' : PROG[(bar - 1) % 4];
  addLR(t0, pad(CH[ch], 2.2, bar < 2 ? 0.1 : 0.13), 0.5, 0.5);
  if (bar >= 1) {
    addLR(t0, bassN(ROOT[ch], 1.6, 0.34), 0.5, 0.5);
    addLR(t0 + 1.5, bassN(ROOT[ch], 0.42, 0.26), 0.5, 0.5);
  }
}

// 鼓组
for (let t = 2.0; t < 26.2; t += 1.0) addLR(t, kick(0.55), 0.55, 0.55);
addLR(28.0, kick(0.6), 0.55, 0.55);
for (let t = 2.5; t < 23.6; t += 1.0) addLR(t, snare(0.3), 0.5, 0.5);
for (let t = 4.0; t < 20.0; t += 0.25) {
  if (Math.abs((t % 2) - 1.75) < 0.01) continue;
  const g = Math.round(t / 0.25) % 2 === 0 ? 0.1 : 0.13;
  addLR(t, hat(g, false), 0.4, 0.6);
}
for (let t = 9.75; t < 23; t += 2.0) addLR(t, hat(0.16, true), 0.45, 0.55);
for (let t = 20.0; t < 24.0; t += 0.125) addLR(t, hat(0.085, false), 0.42, 0.58);

// 主旋律（拨弦，带附点回声）
const plucks = [];
const addPluck = (t, f, g) => plucks.push({ t, sig: pluck(f, g || 0.25) });
addPluck(4.25, P.E5); addPluck(4.75, P.G5); addPluck(5.5, P.A5, 0.26);
addPluck(6.25, P.G5); addPluck(6.75, P.E5); addPluck(7.5, P.D5, 0.22);
addPluck(9.25, P.G5); addPluck(9.75, P.A5, 0.26);
addPluck(10.5, P.C6); addPluck(11.0, P.A5); addPluck(11.5, P.G5, 0.24);
addPluck(12.5, P.E5); addPluck(13.0, P.G5); addPluck(13.5, P.A5, 0.26);
addPluck(16.5, P.C6, 0.3);
addPluck(17.25, P.A5); addPluck(17.75, P.G5); addPluck(18.5, P.E5); addPluck(19.0, P.D5, 0.22);
const seq = [P.A5, P.G5, P.E5, P.G5, P.C6, P.A5, P.G5, P.E5];
for (let k = 0; k < 32; k++) addPluck(20.0 + k * 0.125, seq[k % 8], k % 4 === 0 ? 0.22 : 0.15);
addPluck(24.5, P.G5, 0.2); addPluck(25.5, P.E5, 0.18);
addPluck(28.0, P.E5, 0.22); addPluck(28.3, P.C5, 0.2);
for (const p of plucks) {
  addLR(p.t, p.sig, 0.8, 0.8);
  const pans = [[0.9, 0.7], [0.7, 0.9], [0.85, 0.85]];
  for (let k = 1; k <= 3; k++) addLR(p.t + 0.375 * k, p.sig, Math.pow(0.35, k) * pans[k - 1][0], Math.pow(0.35, k) * pans[k - 1][1]);
}

// 剧情音效（踩点）
addLR(1.0, riser(0.9, 0.16), 0.5, 0.5); // 面板弹入前
addLR(8.35, clunk(0.7), 0.5, 0.5); // 垃圾桶哐当
addLR(8.5, clunk(0.4), 0.5, 0.5);
addLR(14.15, ding(1568, 0.34), 0.42, 0.58); // Ctrl+Z 叮
addLR(14.42, ding(2349, 0.15, 0.4), 0.42, 0.58);
addLR(15.7, riser(1.3, 0.22), 0.5, 0.5); // 饱和度上升
addLR(17.0, crash(0.3), 0.5, 0.5); // 拉满落拍
addLR(17.0, hat(0.2, true), 0.5, 0.5);
addLR(20.0, crash(0.22), 0.5, 0.5); // 卡点密度加倍
addLR(24.0, hat(0.18, true), 0.5, 0.5); // 导出
addLR(28.0, crash(0.26), 0.5, 0.5); // 收工
addLR(28.05, ding(1568, 0.25), 0.42, 0.58);
addLR(28.25, ding(2093, 0.18, 0.5), 0.42, 0.58);
addLR(28.45, ding(2637, 0.15, 0.6), 0.42, 0.58);

/* ---------------- 母带 + 写 WAV ---------------- */
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const sc = 0.95 / Math.max(0.2, peak);
const outN = Math.ceil(SR * DUR);
const pcm = Buffer.alloc(outN * 4);
for (let i = 0; i < outN; i++) {
  let l = Math.tanh(L[i] * 1.1) * sc;
  let r = Math.tanh(R[i] * 1.1) * sc;
  const t = i / SR;
  if (t < 0.02) { const k = t / 0.02; l *= k; r *= k; }
  if (t > 29.2) { const k = Math.max(0, Math.min(1, (30.058 - t) / 0.858)); l *= k; r *= k; }
  pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(l * 32767))), i * 4);
  pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(r * 32767))), i * 4 + 2);
}
const hdr = Buffer.alloc(44);
hdr.write('RIFF', 0);
hdr.writeUInt32LE(36 + pcm.length, 4);
hdr.write('WAVE', 8);
hdr.write('fmt ', 12);
hdr.writeUInt32LE(16, 16);
hdr.writeUInt16LE(1, 20);
hdr.writeUInt16LE(2, 22);
hdr.writeUInt32LE(SR, 24);
hdr.writeUInt32LE(SR * 4, 28);
hdr.writeUInt16LE(4, 32);
hdr.writeUInt16LE(16, 34);
hdr.write('data', 36);
hdr.writeUInt32LE(pcm.length, 40);
const out = process.argv[2] || 'out/bgm.wav';
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.concat([hdr, pcm]));
console.log('wrote', out, (pcm.length / 1048576).toFixed(1) + 'MB', DUR + 's');
