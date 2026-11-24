import React from 'react';
import { C, FONT, HAND } from './theme';

const CODE_FONT = '"Cascadia Code", "Consolas", "Microsoft YaHei", monospace';

const Line1 = () => (
  <>
    <span style={{ color: '#8A5FC0' }}>const</span>{' '}
    <span style={{ color: '#33302B' }}>剪辑软件</span>{' '}
    <span style={{ color: '#8D877C' }}>=</span>{' '}
    <span style={{ color: '#E07A2E' }}>小克</span>
    <span style={{ color: '#33302B' }}>.</span>
    <span style={{ color: '#4C7CB8' }}>写代码</span>
    <span style={{ color: '#33302B' }}>()</span>
  </>
);

const Line2 = () => (
  <>
    <span style={{ color: '#33302B' }}>剪辑软件.</span>
    <span style={{ color: '#4C7CB8' }}>画出</span>
    <span style={{ color: '#33302B' }}>(</span>
    <span style={{ color: '#2E8F6A' }}>时间轴</span>
    <span style={{ color: '#33302B' }}>, </span>
    <span style={{ color: '#2E8F6A' }}>预览</span>
    <span style={{ color: '#33302B' }}>, </span>
    <span style={{ color: '#2E8F6A' }}>面板</span>
    <span style={{ color: '#33302B' }}>)</span>
  </>
);

/** 开场代码窗口：逐字打出两行代码 */
export const CodeWindow: React.FC<{ f: number; out: number }> = ({ f, out }) => {
  const n1 = Math.max(0, Math.min(24, Math.floor((f - 8) / 1.6)));
  const n2 = Math.max(0, Math.min(26, Math.floor((f - 46) / 1.5)));
  const caret = f % 30 < 16;

  const render = (n: number, line: React.ReactNode) => {
    // 依据字符数做简易逐字裁剪：用等宽字体的宽度模拟
    const total = 24;
    const ratio = Math.min(1, n / total);
    return (
      <div style={{ position: 'relative', height: 26, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - ratio * 100}% 0 0)` }}>
          {line}
        </div>
        {ratio > 0 && ratio < 1 && caret && (
          <span
            style={{
              position: 'absolute',
              left: `${ratio * 96}%`,
              top: 3,
              width: 7,
              height: 18,
              background: C.ink,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 336,
        top: 196,
        width: 610,
        height: 286,
        background: '#FFFDF8',
        border: `2.4px solid ${C.ink}`,
        borderRadius: 12,
        boxShadow: '8px 10px 0 rgba(51,48,43,0.16)',
        opacity: (1 - out) * Math.min(1, Math.max(0, f / 8)),
        transform: `translateY(${out * -14}px) scale(${1 - out * 0.03})`,
      }}
    >
      <div
        style={{
          height: 34,
          borderBottom: `1.5px solid ${C.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 6,
          position: 'relative',
        }}
      >
        {['#E4655A', '#E9B44C', '#5BB37A'].map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: 5, background: c }} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: FONT,
            fontSize: 11,
            color: C.sub,
          }}
        >
          小克.jl — 编辑
        </div>
      </div>
      <div style={{ padding: '22px 26px', fontFamily: CODE_FONT, fontSize: 17, lineHeight: '30px' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: '#C0B8A9', width: 14, textAlign: 'right' }}>1</span>
          <div style={{ flex: 1 }}>{n1 > 0 ? render(n1, <Line1 />) : null}</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: '#C0B8A9', width: 14, textAlign: 'right' }}>2</span>
          <div style={{ flex: 1 }}>
            {n2 > 0 ? (
              render(n2, <Line2 />)
            ) : (
              <div style={{ height: 26 }} />
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: '#C0B8A9', width: 14, textAlign: 'right' }}>3</span>
          <div style={{ flex: 1 }}>
            {n2 >= 26 && caret && (
              <span style={{ display: 'inline-block', width: 8, height: 20, background: C.ink }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** 结尾手写便签 */
export const NoteCard: React.FC<{ f: number; q: number }> = ({ f, q }) => {
  const draw = Math.min(1, Math.max(0, (f - 790) / 26));
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: 196,
        width: 404,
        height: 296,
        background: '#FFFEFA',
        border: `2.4px solid ${C.ink}`,
        borderRadius: 8,
        boxShadow: '10px 12px 0 rgba(51,48,43,0.14)',
        transform: `rotate(-4deg) translateY(${(1 - q) * 24}px) scale(${0.94 + q * 0.06})`,
        opacity: q,
        padding: '34px 30px',
        zIndex: 70,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: -13,
          width: 78,
          height: 24,
          marginLeft: -39,
          background: 'rgba(240,220,160,0.75)',
          transform: 'rotate(-5deg)',
          border: '1px solid rgba(200,175,110,0.6)',
        }}
      />
      <div style={{ fontFamily: HAND, fontSize: 30, color: C.ink }}>30 秒剪完，</div>
      <div
        style={{
          fontFamily: HAND,
          fontSize: 64,
          fontWeight: 900,
          color: C.ink,
          marginTop: 6,
          letterSpacing: '0.01em',
        }}
      >
        Opus 5.5
      </div>
      <svg width={250} height={16} style={{ display: 'block', marginTop: -6 }}>
        <path
          d="M4 8 q 40 -8 76 0 t 80 2 t 66 -3"
          fill="none"
          stroke="#E2483C"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - draw}
        />
      </svg>
      <div style={{ fontFamily: HAND, fontSize: 26, color: C.sub, marginTop: 18 }}>
        — 小克 收工 ✨
      </div>
    </div>
  );
};
