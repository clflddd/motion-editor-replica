import React from 'react';
import { C, FONT } from './theme';

/* 统一 240 × 420 的竖屏画面 */

export const NightScene: React.FC<{ k?: number }> = () => (
  <svg width="100%" height="100%" viewBox="0 0 240 420" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#242146" />
        <stop offset="60%" stopColor="#3B3468" />
        <stop offset="100%" stopColor="#5A4A82" />
      </linearGradient>
    </defs>
    <rect width="240" height="420" fill="url(#sky)" />
    {[
      [28, 46],
      [62, 22],
      [196, 38],
      [214, 96],
      [40, 110],
      [150, 70],
      [176, 132],
      [96, 58],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.5} fill="#FFF3CE" opacity={0.9} />
    ))}
    <path d="M168 54 a 34 34 0 1 0 26 58 a 28 28 0 1 1 -26 -58 z" fill="#F6E7B4" />
    <circle cx="176" cy="70" r="26" fill="#2B2750" />
    {/* 城市剪影 */}
    {[
      [0, 292, 46, 128],
      [42, 258, 40, 162],
      [78, 306, 34, 114],
      [108, 240, 52, 180],
      [156, 286, 40, 134],
      [192, 262, 48, 158],
    ].map(([x, y, w, h], i) => (
      <rect key={i} x={x} y={y} width={w} height={h} fill="#241F3E" />
    ))}
    {Array.from({ length: 58 }).map((_, i) => {
      const x = 6 + ((i * 37) % 228);
      const y = 250 + ((i * 53) % 158);
      return <rect key={i} x={x} y={y} width={4} height={4} fill="#F8D56A" opacity={0.75} />;
    })}
  </svg>
);

export const RamenScene: React.FC<{ close?: boolean }> = ({ close }) => (
  <svg width="100%" height="100%" viewBox="0 0 240 420" preserveAspectRatio="xMidYMid slice">
    <rect width="240" height="420" fill="#F3DDB4" />
    <rect width="240" height="420" fill="#E9C98F" opacity="0.35" />
    <g transform={close ? 'translate(120 230) scale(1.35) translate(-120 -230)' : undefined}>
      {/* 桌面 */}
      <rect y="300" width="240" height="120" fill="#D9A363" />
      <path d="M0 300 h240" stroke="#B98245" strokeWidth="6" />
      {/* 蒸汽 */}
      <path
        d="M96 128 q 16 -26 2 -52 M126 118 q 16 -26 2 -52 M154 130 q 16 -26 2 -52"
        stroke="#FFF6E4"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* 碗 */}
      <path d="M38 232 h164 q -8 96 -82 96 q -74 0 -82 -96 z" fill="#E4643F" />
      <path d="M38 232 h164 q -2 22 -8 34 H46 q -6 -12 -8 -34 z" fill="#F3F0E6" />
      <g stroke="#E4643F" strokeWidth="4" fill="none">
        <path d="M58 250 v 34 M76 252 v 38 M96 254 v 40 M120 254 v 40 M144 252 v 38 M164 250 v 34" />
      </g>
      <ellipse cx="120" cy="232" rx="82" ry="20" fill="#F6E7C8" />
      <ellipse cx="120" cy="234" rx="70" ry="14" fill="#E8B85E" />
      {/* 面 */}
      <path
        d="M58 234 q 16 -12 30 0 t 30 0 t 30 0 t 26 0"
        stroke="#F5D98F"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* 配料 */}
      <ellipse cx="92" cy="228" rx="20" ry="11" fill="#FFF8E6" />
      <ellipse cx="92" cy="228" rx="9" ry="6" fill="#F3AE3F" />
      <ellipse cx="152" cy="232" rx="22" ry="10" fill="#C2643F" />
      <path d="M108 220 q 12 -6 24 0" stroke="#6FA36A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="132" cy="238" r="4" fill="#3F6B45" />
      {/* 筷子 */}
      <path d="M196 96 L 128 214 M212 104 L 142 222" stroke="#8A5A38" strokeWidth="8" strokeLinecap="round" />
      {/* 拉面标题条 */}
      <rect x="46" y="12" width="148" height="34" rx="9" fill="#4E6FBF" />
      <text x="120" y="35" textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="800" fill="#FDFBF4">
        拉面
      </text>
      <circle cx="60" cy="29" r="4.5" fill="#FDFBF4" opacity="0.8" />
      <circle cx="180" cy="29" r="4.5" fill="#FDFBF4" opacity="0.8" />
    </g>
  </svg>
);

export const ShibaScene: React.FC<{ text?: string }> = ({ text }) => (
  <svg width="100%" height="100%" viewBox="0 0 240 420" preserveAspectRatio="xMidYMid slice">
    <rect width="240" height="420" fill="#CDEEE3" />
    <circle cx="120" cy="210" r="126" fill="#BCE5D8" opacity="0.6" />
    {/* 心形 */}
    <path
      d="M152 74 c -7 -12 -24 -7 -24 5 c 0 9 14 17 24 24 c 10 -7 24 -15 24 -24 c 0 -12 -17 -17 -24 -5 z"
      fill="#F0643C"
      opacity="0.9"
    />
    {/* 身体 */}
    <path d="M62 420 q 0 -110 58 -110 q 58 0 58 110 z" fill="#E7A15C" />
    <ellipse cx="120" cy="352" rx="34" ry="46" fill="#FFF6EA" />
    {/* 项圈 */}
    <path d="M70 322 q 50 28 100 0" stroke="#E4453A" strokeWidth="13" fill="none" strokeLinecap="round" />
    <circle cx="120" cy="338" r="11" fill="#F5C24B" stroke="#D9A22F" strokeWidth="2.5" />
    {/* 耳朵 */}
    <path d="M52 190 l 2 -52 l 46 30 z" fill="#E7A15C" />
    <path d="M188 190 l -2 -52 l -46 30 z" fill="#E7A15C" />
    <path d="M62 184 l 2 -32 l 28 19 z" fill="#F6C79B" />
    <path d="M178 184 l -2 -32 l -28 19 z" fill="#F6C79B" />
    {/* 头 */}
    <ellipse cx="120" cy="236" rx="78" ry="70" fill="#E7A15C" />
    <ellipse cx="120" cy="266" rx="46" ry="34" fill="#FFF7EC" />
    <ellipse cx="120" cy="248" rx="13" ry="9" fill="#3E3128" />
    <path
      d="M120 257 v 11 M120 268 q -9 9 -17 2 M120 268 q 9 9 17 2"
      stroke="#3E3128"
      strokeWidth="3.2"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="93" cy="226" rx="6.5" ry="8" fill="#3E3128" />
    <ellipse cx="147" cy="226" rx="6.5" ry="8" fill="#3E3128" />
    <circle cx="95" cy="223" r="2.2" fill="#fff" />
    <circle cx="149" cy="223" r="2.2" fill="#fff" />
    <ellipse cx="76" cy="248" rx="10" ry="5.5" fill="#F4A08A" opacity="0.65" />
    <ellipse cx="164" cy="248" rx="10" ry="5.5" fill="#F4A08A" opacity="0.65" />
    {text && (
      <g>
        <rect x="30" y="286" width="180" height="36" rx="8" fill="#F7D34E" stroke="#33302B" strokeWidth="3" />
        <text x="120" y="312" textAnchor="middle" fontFamily={FONT} fontSize="21" fontWeight="900" fill="#33302B">
          {text}
        </text>
      </g>
    )}
  </svg>
);

/** 小克吉祥物（视频画面内，霓虹房间） */
export const RunnerScene: React.FC<{ f: number; pop: number; dim?: boolean }> = ({ f, pop, dim }) => {
  const bob = Math.sin(f * 0.42) * 7;
  const armL = Math.sin(f * 0.42) * 14;
  const armR = -Math.sin(f * 0.42) * 14;
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 420" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="neon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B3FA8" />
          <stop offset="55%" stopColor="#C24E93" />
          <stop offset="100%" stopColor="#3B2A6B" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4B3C86" />
          <stop offset="100%" stopColor="#2A2350" />
        </linearGradient>
      </defs>
      <rect width="240" height="420" fill="url(#neon)" />
      <circle cx="120" cy="96" r="44" fill="#F2E8FF" opacity="0.9" />
      <circle cx="106" cy="82" r="40" fill="#8A4FB4" opacity="0.55" />
      {[
        [34, 62],
        [200, 74],
        [58, 156],
        [188, 168],
        [120, 44],
        [26, 210],
        [214, 224],
      ].map(([x, y], i) => (
        <g key={i} opacity={0.6 + 0.4 * Math.abs(Math.sin(f * 0.1 + i))}>
          <rect x={x} y={y} width="11" height="11" fill="#FFF3B0" transform={`rotate(45 ${x + 5} ${y + 5})`} />
        </g>
      ))}
      <path d="M0 296 h240 v124 H0 z" fill="url(#floor)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M${-60 + i * 60} 296 L${-10 + i * 42} 420`}
          stroke="#6F5CB8"
          strokeWidth="2"
          opacity="0.55"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <path key={i} d={`M0 ${316 + i * 28} h240`} stroke="#6F5CB8" strokeWidth="2" opacity="0.45" />
      ))}
      <g transform={`translate(0 ${bob})`}>
        {/* 脚 */}
        <rect x="96" y="286" width="14" height="30" rx="6" fill="#C33D22" />
        <rect x="130" y="286" width="14" height="30" rx="6" fill="#C33D22" />
        {/* 手 */}
        <rect
          x="62"
          y={196 + armL}
          width="15"
          height="48"
          rx="7"
          fill="#DE4A2B"
          transform={`rotate(${armL * 0.5} 70 200)`}
        />
        <rect
          x="163"
          y={196 - armR}
          width="15"
          height="48"
          rx="7"
          fill="#DE4A2B"
          transform={`rotate(${-armR * 0.5} 170 200)`}
        />
        {/* 身体 */}
        <rect x="74" y="166" width="92" height="128" rx="18" fill="#EE5F3B" stroke="#B93B20" strokeWidth="3" />
        <rect x="74" y="166" width="92" height="128" rx="18" fill="none" stroke="#FF8C6A" strokeWidth="2" opacity="0.5" />
        {/* 脸 */}
        <path d="M96 206 q 5 -8 10 0" stroke="#3A1E16" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M134 206 q 5 -8 10 0" stroke="#3A1E16" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M108 224 q 12 12 24 0" stroke="#FFF1E6" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="92" cy="220" rx="7" ry="4" fill="#FF9B7A" opacity="0.8" />
        <ellipse cx="148" cy="220" rx="7" ry="4" fill="#FF9B7A" opacity="0.8" />
      </g>
      {dim && <rect width="240" height="420" fill="#1B1030" opacity="0.25" />}
      <text x="120" y="408" textAnchor="middle" fontFamily={FONT} fontSize="12" fill="#F3E9FF" opacity="0.85">
        @小克 · Opus 5.5
      </text>
      {pop > 0 && (
        <g transform="translate(120 330) scale(1)">
          <rect x="-52" y="-20" width="104" height="38" rx="8" fill="#33302B" opacity="0.9" />
          <text x="0" y="7" textAnchor="middle" fontFamily={FONT} fontSize="20" fontWeight="900" fill="#FFF3B0">
            拿捏了！
          </text>
        </g>
      )}
    </svg>
  );
};

/** 缩略图（左侧面板 / 时间轴 / 拖拽） */
export const ThumbScene: React.FC<{ kind: 'night' | 'ramen' | 'shiba' | 'runner'; f?: number }> = ({
  kind,
  f = 0,
}) => {
  if (kind === 'night') return <NightScene />;
  if (kind === 'ramen') return <RamenScene />;
  if (kind === 'shiba') return <ShibaScene />;
  return <RunnerScene f={f} pop={0} />;
};

/** 对焦中的拉面预览 */
export const FocusScene: React.FC<{ q: number }> = ({ q }) => (
  <div style={{ position: 'absolute', inset: 0, background: '#3E3A34' }}>
    <div style={{ position: 'absolute', inset: 0, filter: `blur(${14 - q * 12}px)`, opacity: 0.85 }}>
      <RamenScene />
    </div>
    {[
      [56, 130, 1, 1],
      [184, 130, -1, 1],
      [56, 306, 1, -1],
      [184, 306, -1, -1],
    ].map(([x, y, sx, sy], i) => (
      <svg
        key={i}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        style={{ position: 'absolute', left: x - 15, top: y - 15 }}
      >
        <path
          d={`M2 ${2 + 14 * (sy > 0 ? 0 : 0)} v ${sy > 0 ? 14 : -14} h ${sx > 0 ? 14 : -14}`}
          stroke="#F4F1E8"
          strokeWidth="3"
          fill="none"
          transform={`translate(${sx > 0 ? 0 : 30} ${sy > 0 ? 0 : 30})`}
        />
      </svg>
    ))}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 190,
        textAlign: 'center',
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 700,
        color: '#F4F1E8',
        letterSpacing: '0.1em',
      }}
    >
      对焦中...
    </div>
  </div>
);

/** 手机壳 */
export const PhoneShell: React.FC<{ children: React.ReactNode; glow?: number }> = ({
  children,
  glow = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 34,
      background: '#2A2724',
      padding: 7,
      boxShadow: `0 18px 34px rgba(60,50,35,0.25), 0 0 ${glow * 40}px rgba(255,120,60,${glow * 0.6})`,
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        background: C.mint,
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 7,
          width: 52,
          height: 8,
          marginLeft: -26,
          borderRadius: 5,
          background: '#2A2724',
        }}
      />
    </div>
  </div>
);
