import React from 'react';
import { C, FONT, p } from './theme';
import { Panel } from './ui';
import { NightScene, RamenScene, RunnerScene, ShibaScene } from './scenes';

const Tab: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: 12.5,
      fontWeight: active ? 800 : 500,
      color: active ? C.ink : C.sub,
      padding: '5px 14px',
      borderRadius: 6,
      background: active ? C.paper : 'transparent',
      border: `1.4px solid ${active ? C.ink : 'transparent'}`,
      boxShadow: active ? '2px 2px 0 rgba(51,48,43,0.18)' : 'none',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

const ThumbCard: React.FC<{
  label: string;
  dur: string;
  children: React.ReactNode;
  highlight?: number;
}> = ({ label, dur, children, highlight = 0 }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 8,
      border: `1.5px solid ${highlight > 0.3 ? C.accent : C.ink}`,
      background: C.paper,
      overflow: 'hidden',
      height: 78,
      boxShadow: highlight > 0.3 ? `0 0 0 2px rgba(240,100,60,${highlight * 0.5})` : 'none',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, bottom: 14 }}>{children}</div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 14,
        background: '#F4EFE6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5px',
        fontFamily: FONT,
        fontSize: 8,
        color: C.sub,
      }}
    >
      <span>{label}</span>
      <span>{dur}</span>
    </div>
  </div>
);

const TransCard: React.FC<{ label: string; i: number; delay: number; f: number }> = ({
  label,
  i,
  delay,
  f,
}) => {
  const bg = ['#E8E7F7', '#EDF1E6', '#FBE3EC', '#E3EEF9', '#FBF0DB', '#EFE6F8'][i];
  const stroke = ['#6B5BD6', '#4E8A5C', '#C26287', '#4C7CB8', '#B5813A', '#8A5FC0'][i];
  const glyph = [
    <g key="a">
      <circle cx="13" cy="15" r="7" />
      <path d="M13 8 a 7 7 0 0 1 0 14" fill={stroke} stroke="none" />
    </g>,
    <g key="b">
      <path d="M8 6 h 8 l 5 5 v 13 H 8 z" />
      <path d="M16 6 v 5 h 5" />
    </g>,
    <g key="c">
      <rect x="6" y="8" width="7" height="14" rx="2" />
      <rect x="14" y="6" width="7" height="16" rx="2" opacity="0.55" />
    </g>,
    <g key="d">
      <circle cx="13" cy="13" r="6" />
      <path d="M18 18 l 4 4" />
    </g>,
    <g key="e">
      <path d="M5 14 h 14 M14 8 l 6 6 -6 6" />
    </g>,
    <g key="f">
      <path d="M13 6 c 4 5 6 7 6 11 a 6 6 0 0 1 -12 0 c 0 -4 2 -6 6 -11 z" />
    </g>,
  ][i];
  const q = p(f, delay, delay + 8);
  return (
    <div
      style={{
        height: 72,
        borderRadius: 8,
        border: `1.4px solid ${C.ink}`,
        background: C.paper,
        position: 'relative',
        overflow: 'hidden',
        opacity: q,
        transform: `translateY(${(1 - q) * 8}px)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 6,
          top: 5,
          width: 128,
          height: 40,
          borderRadius: 6,
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={26} height={26} viewBox="0 0 26 26" fill="none" stroke={stroke} strokeWidth="1.7">
          {glyph}
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 4,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: 9.5,
          color: C.ink,
        }}
      >
        {label}
      </div>
      {i === 5 && (
        <div
          style={{
            position: 'absolute',
            right: 6,
            top: 6,
            width: 30,
            height: 30,
            borderRadius: 15,
            background: C.accent,
            color: '#fff',
            fontFamily: FONT,
            fontSize: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: p(f, 330, 340),
          }}
        >
          使用
        </div>
      )}
    </div>
  );
};

export const LeftPanel: React.FC<{
  f: number;
  in: number;
  tab: number;
  highlight: number;
}> = ({ f, in: a, tab, highlight }) => {
  return (
    <Panel
      style={{
        left: 10,
        top: 66,
        width: 310,
        height: 312,
        opacity: a,
        transform: `translateY(${(1 - a) * 26}px)`,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', gap: 4, padding: '8px 8px 6px' }}>
        {['素材', '转场', '文字'].map((t, i) => (
          <Tab key={t} label={t} active={tab === i} />
        ))}
      </div>
      <div style={{ height: 1, background: C.line, margin: '0 10px' }} />

      {tab === 0 && (
        <div style={{ padding: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <ThumbCard label="月夜.mp4" dur="2.4s" highlight={highlight}>
              <NightScene />
            </ThumbCard>
            <ThumbCard label="拉面.mp4" dur="2.2s">
              <RamenScene />
            </ThumbCard>
            <ThumbCard label="柴犬.mp4" dur="2.3s">
              <ShibaScene />
            </ThumbCard>
            <ThumbCard label="小克跑步.mp4" dur="2.6s">
              <RunnerScene f={f} pop={0} />
            </ThumbCard>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  height: 44,
                  borderRadius: 8,
                  border: `1.4px dashed #B9B1A3`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.faint,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 18, lineHeight: '18px' }}>＋</span>
                <span style={{ fontFamily: FONT, fontSize: 8.5, marginTop: 2 }}>导入素材</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 1 && (
        <div style={{ padding: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['反转', '翻页', '故障', '缩放', '滑动', '溶解'].map((t, i) => (
            <TransCard key={t} label={t} i={i} delay={300 + i * 3} f={f} />
          ))}
        </div>
      )}

      {tab === 2 && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['前方高能', '#F8DE86', '#5A4710', 0],
            ['好耶~', '#F8D9E3', '#B04A6C', 1],
            ['霓虹 NEON', '#3B2A6B', '#F2E4FF', 2],
          ].map(([label, bg, fg, i]) => (
            <div
              key={String(label)}
              style={{
                height: 50,
                borderRadius: 8,
                border: `1.5px solid ${C.ink}`,
                background: String(bg),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT,
                fontSize: 18,
                fontWeight: 900,
                color: String(fg),
                letterSpacing: '0.04em',
                textShadow: i === 2 ? '0 0 8px rgba(255,120,220,0.9)' : 'none',
                boxShadow: '2px 2px 0 rgba(51,48,43,0.18)',
                transform: `rotate(${i === 1 ? 1 : 0}deg)`,
              }}
            >
              {label}
            </div>
          ))}
          <div style={{ fontFamily: FONT, fontSize: 9, color: C.sub, textAlign: 'center' }}>
            点击文字样式，直接叠加到播放头位置
          </div>
        </div>
      )}
    </Panel>
  );
};

const Slider: React.FC<{ label: string; value: string; pct: number; sub?: string }> = ({
  label,
  value,
  pct,
  sub,
}) => (
  <div style={{ marginBottom: 17 }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: FONT,
        fontSize: 11,
        color: C.sub,
        marginBottom: 6,
      }}
    >
      <span>{label}</span>
      <span style={{ color: sub ? C.accent : C.ink, fontWeight: sub ? 900 : 600 }}>{value}</span>
    </div>
    <div style={{ height: 5, borderRadius: 3, background: '#E4DED2', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${Math.min(100, pct)}%`,
          borderRadius: 3,
          background: sub
            ? `linear-gradient(90deg, #F2C14E, ${C.red})`
            : `linear-gradient(90deg, ${C.teal}, #63C9C2)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `calc(${Math.min(100, pct)}% - 7px)`,
          top: -5,
          width: 14,
          height: 14,
          borderRadius: 7,
          background: C.paper,
          border: `2px solid ${sub ? C.red : C.ink}`,
        }}
      />
    </div>
    {sub && (
      <div
        style={{
          fontFamily: FONT,
          fontSize: 9.5,
          fontWeight: 900,
          color: C.red,
          textAlign: 'right',
          marginTop: 3,
          transform: 'rotate(-2deg)',
        }}
      >
        {sub}
      </div>
    )}
  </div>
);

export const Inspector: React.FC<{
  in: number;
  flash: number;
  sat: number;
  zoom: number;
  speed: number;
  satHot: number;
}> = ({ in: a, flash, sat, zoom, speed, satHot }) => (
  <Panel
    style={{
      left: 1000,
      top: 66,
      width: 266,
      height: 312,
      opacity: a,
      transform: `translateY(${(1 - a) * 26}px)`,
      zIndex: 10,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 13px',
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: C.ink }}>调整</span>
      <span style={{ fontSize: 13, color: C.ink }}>✦</span>
    </div>
    <div style={{ padding: '14px 15px' }}>
      <Slider label="闪光" value={`${Math.round(flash)}%`} pct={flash} />
      <Slider
        label="饱和度"
        value={`${Math.round(sat)}%`}
        pct={sat / 1.6}
        sub={satHot > 0.2 ? '爆表!!' : undefined}
      />
      <Slider label="缩放冲击" value={`${Math.round(zoom)}%`} pct={zoom} />
      <Slider label="速度" value={`${speed.toFixed(1)}x`} pct={(speed / 2) * 100} />
    </div>
  </Panel>
);
