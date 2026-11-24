import React from 'react';
import { C, EIO, FONT, HAND, p, sp } from './theme';

export const Panel: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({
  style,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      background: C.paper,
      border: `1.6px solid ${C.ink}`,
      borderRadius: 10,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{
  text: string;
  style?: React.CSSProperties;
  tone?: 'ink' | 'accent' | 'white';
  size?: number;
}> = ({ text, style, tone = 'ink', size = 20 }) => {
  const accent = tone === 'accent';
  return (
    <div
      style={{
        position: 'absolute',
        background: tone === 'white' ? '#FFFDF8' : accent ? '#FFF1EA' : C.paper,
        border: `2.4px solid ${accent ? C.accent : C.ink}`,
        borderRadius: 9,
        padding: '7px 15px',
        boxShadow: `4px 4px 0 ${accent ? 'rgba(240,100,60,0.35)' : 'rgba(51,48,43,0.9)'}`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 800,
          color: accent ? C.accent2 : C.ink,
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** 手绘箭头：沿路径逐段描出 */
export const Arrow: React.FC<{
  d: string;
  q: number;
  color?: string;
  width?: number;
  dashed?: boolean;
}> = ({ d, q, color = C.ink, width = 3, dashed }) => (
  <svg
    width={1280}
    height={720}
    viewBox="0 0 1280 720"
    style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
  >
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={dashed ? '0.012 0.012' : '1 1'}
      strokeDashoffset={1 - q}
      opacity={q > 0.01 ? 1 : 0}
    />
    {q > 0.97 && (
      <circle
        cx={0}
        cy={0}
        r={0}
        fill="none"
      />
    )}
  </svg>
);

/** 橙色小方块吉祥物 */
export const Mascot: React.FC<{
  x: number;
  y: number;
  f: number;
  scale?: number;
  arm?: { x: number; y: number } | null;
  look?: 'left' | 'right';
  mouth?: 'smile' | 'flat' | 'open';
  opacity?: number;
}> = ({ x, y, f, scale = 1, arm, look = 'right', mouth = 'smile', opacity = 1 }) => {
  const bob = Math.sin(f * 0.26) * 2.4;
  const leg = Math.sin(f * 0.42) * 4;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bob,
        width: 74,
        height: 66,
        transform: `scale(${scale})`,
        transformOrigin: '50% 100%',
        opacity,
        zIndex: 40,
      }}
    >
      {arm && (
        <svg
          width={1280}
          height={720}
          viewBox="0 0 1280 720"
          style={{ position: 'absolute', left: -x, top: -y, pointerEvents: 'none' }}
        >
          <path
            d={`M ${x + 22} ${y + 20} L ${arm.x} ${arm.y}`}
            stroke="#E9694A"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx={arm.x} cy={arm.y} r="8" fill="#E9694A" stroke="#B93B20" strokeWidth="2.5" />
        </svg>
      )}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 74,
          height: 58,
          borderRadius: 10,
          background: 'linear-gradient(155deg, #F0704C, #E04F2E)',
          border: '2.5px solid #B93B20',
          boxShadow: '0 7px 14px rgba(160,50,30,0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: look === 'right' ? 20 : 16,
            top: 17,
            width: 8,
            height: 10,
            borderRadius: 3,
            background: '#FFF3EC',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: look === 'right' ? 44 : 40,
            top: 17,
            width: 8,
            height: 10,
            borderRadius: 3,
            background: '#FFF3EC',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 26,
            top: 36,
            width: 22,
            height: mouth === 'open' ? 10 : 6,
            borderRadius: mouth === 'open' ? 6 : 3,
            background: mouth === 'flat' ? 'rgba(255,255,255,0.5)' : '#8E2E18',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 31,
            width: 8,
            height: 5,
            borderRadius: 3,
            background: '#FF9B7A',
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 58,
            top: 31,
            width: 8,
            height: 5,
            borderRadius: 3,
            background: '#FF9B7A',
            opacity: 0.85,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 56,
          width: 6,
          height: 10 + leg,
          borderRadius: 3,
          background: '#C33D22',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: 56,
          width: 6,
          height: 10 - leg,
          borderRadius: 3,
          background: '#C33D22',
        }}
      />
    </div>
  );
};

/** 顶部标题栏 */
export const TopBar: React.FC<{ f: number }> = ({ f }) => {
  const tl = 78 + f;
  const tc = `${String(Math.floor(tl / 900)).padStart(2, '0')}:${String(
    Math.floor((tl % 900) / 30)
  ).padStart(2, '0')}:${String(tl % 30).padStart(2, '0')}`;
  const rendering = f >= 716;
  const pct = Math.min(99.99, 8 + ((f - 716) / 88) * 92);
  return (
    <div
      style={{
        position: 'absolute',
        left: 10,
        top: 8,
        width: 1258,
        height: 38,
        background: '#FFFDF8',
        border: `1.6px solid ${C.ink}`,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 10,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', gap: 5, marginRight: 4 }}>
        {['#E4655A', '#E9B44C', '#5BB37A'].map((c) => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
        ))}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 13,
          color: C.ink,
          fontWeight: 700,
          padding: '3px 10px',
          background: '#F1ECE3',
          borderRadius: 5,
        }}
      >
        小克剪辑_最终版_打死不改(3).mp4
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 12,
          color: '#FFF9EE',
          background: C.ink,
          borderRadius: 5,
          padding: '4px 9px',
          letterSpacing: '0.04em',
          minWidth: 96,
          textAlign: 'center',
        }}
      >
        {tc}
      </div>
      <div style={{ fontFamily: FONT, fontSize: 11, color: C.sub }}>已自动保存</div>
      <div style={{ flex: 1 }} />
      <div
        style={{
          fontFamily: FONT,
          fontSize: 11,
          color: C.sub,
          border: `1.4px solid ${C.line}`,
          borderRadius: 5,
          padding: '3px 8px',
        }}
      >
        1080P
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 800,
          color: rendering ? C.ink : '#FFFDF6',
          background: rendering ? '#F2D14F' : C.teal,
          borderRadius: 6,
          padding: '5px 14px',
          boxShadow: '2px 2px 0 rgba(51,48,43,0.85)',
          whiteSpace: 'nowrap',
        }}
      >
        {rendering ? `渲染中 ${pct.toFixed(2)}%` : '导出'}
      </div>
    </div>
  );
};

/** 手写风格的大字标注 */
export const HandText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
  outline?: string;
  rotate?: number;
}> = ({ text, style, size = 34, color = '#33302B', outline, rotate = -4 }) => (
  <div
    style={{
      position: 'absolute',
      fontFamily: HAND,
      fontSize: size,
      fontWeight: 900,
      color,
      WebkitTextStroke: outline ? `6px ${outline}` : undefined,
      paintOrder: 'stroke',
      transform: `rotate(${rotate}deg)`,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {text}
  </div>
);

/** 弹簧式弹出（用于标注） */
export const popIn = (f: number, at: number) =>
  Math.min(1, Math.max(0, sp(f, at, { damping: 12, mass: 0.6, stiffness: 170 })));

export const fade = (f: number, a: number, b: number, c: number, d: number) =>
  p(f, a, b) * (1 - p(f, c, d));

export const EaseFade: React.FC<{ f: number; from: number; to: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  f,
  from,
  to,
  children,
  style,
}) => <div style={{ opacity: p(f, from, to), ...style }}>{children}</div>;

export { EIO };
