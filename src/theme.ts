import { Easing, interpolate, spring } from 'remotion';

/* 取色自参考视频 */
export const C = {
  bg: '#EBE7DF',
  paper: '#FFFDF8',
  panel: '#FBF8F2',
  line: '#D8D1C4',
  ink: '#33302B',
  sub: '#8D877C',
  faint: '#C5BEB1',
  accent: '#F0643C',
  accent2: '#E2562E',
  teal: '#2EAFA8',
  teal2: '#1E8F8A',
  mint: '#D9F0E7',
  blue: '#5B7FC7',
  blueBg: '#DCE7F8',
  yellow: '#F7E9A8',
  pink: '#F8D9E3',
  red: '#E94A3F',
  tan: '#E7A15C',
  night: '#2E2A55',
  purple: '#6A5AE0',
};

export const FONT =
  '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", "Source Han Sans SC", sans-serif';
export const HAND = '"KaiTi", "STKaiti", "Microsoft YaHei", sans-serif';

export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const EO = Easing.bezier(0.16, 1, 0.3, 1);
export const EIO = Easing.bezier(0.45, 0, 0.2, 1);

export const p = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...CLAMP, easing: EO });

export const lin = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], CLAMP);

export const sp = (
  f: number,
  d: number,
  cfg = { damping: 14, mass: 0.7, stiffness: 150 }
) => spring({ frame: Math.max(0, f - d), fps: 30, config: cfg });

export const blink = (f: number) => (f % 40 < 22 ? 1 : 0);

/** 各轨时间轴几何（timeline 面板内的局部坐标） */
export const TL = {
  w: 1258,
  h: 300,
  x0: 75,
  y0: 10,
  pxPerSec: 62.5,
  videoTop: 26,
  videoH: 46,
  textTop: 4,
  textH: 20,
  audioTop: 82,
  audioH: 38,
  markerTop: 112,
  rulerTop: 0,
};
