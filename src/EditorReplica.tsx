import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, HAND, lin, p, sp } from './theme';
import { Chip, Mascot, Panel, TopBar, popIn } from './ui';
import { LeftPanel, Inspector } from './panels';
import { Timeline } from './timeline';
import { FocusScene, PhoneShell, RamenScene, RunnerScene, ShibaScene, NightScene } from './scenes';
import { CodeWindow, NoteCard } from './intro';

/* ---------- 手机画面：按时间切换四个素材 ---------- */
const PhoneScreen: React.FC<{ f: number; pop: number; text: boolean }> = ({ f, pop, text }) => {
  const cuts = [185, 250, 330, 470];
  const kinds = ['night', 'ramen', 'shiba', 'runner'] as const;
  let idx = 0;
  for (let i = 0; i < cuts.length; i++) if (f >= cuts[i]) idx = i;
  const prevIdx = Math.max(0, idx - 1);
  const q = idx === 0 ? 1 : p(f, cuts[idx - 1], cuts[idx - 1] + 10);

  const scene = (k: string, dim?: boolean) => {
    if (k === 'night') return <NightScene />;
    if (k === 'ramen') return <RamenScene close={idx === 1} />;
    if (k === 'shiba') return <ShibaScene text={text ? '前方高能预警' : undefined} />;
    return <RunnerScene f={f} pop={pop} dim={dim} />;
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#1B1A18' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - (idx === 0 ? 0 : q) }}>
        {f >= 50 ? scene(kinds[prevIdx]) : null}
      </div>
      {idx > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: q }}>{scene(kinds[idx])}</div>
      )}
      {f < 50 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #2C2A27, #141311)',
          }}
        />
      )}
      {/* 播放/点赞等浮层（成片画面） */}
      {pop > 0 && (
        <div style={{ position: 'absolute', right: 10, bottom: 96, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          {['♥', '💬', '↪'].map((s, i) => (
            <div
              key={i}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                background: 'rgba(255,255,255,0.18)',
                color: '#FFF3E6',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pop,
              }}
            >
              {s}
            </div>
          ))}
          <div style={{ fontFamily: FONT, fontSize: 8, color: '#FFF3E6', opacity: pop }}>10万+</div>
        </div>
      )}
    </div>
  );
};

/* ---------- 主组件 ---------- */
export const EditorReplica: React.FC = () => {
  const f = useCurrentFrame();

  /* 相机：开工时轻推，收尾拉回 */
  const push = p(f, 120, 200) - p(f, 300, 360);
  const cam = 1 + 0.012 * push;
  const camX = -10 * push;

  /* 面板入场 */
  const leftIn = sp(f, 34);
  const phoneIn = sp(f, 42);
  const inspIn = sp(f, 50);
  const tlIn = sp(f, 56);

  /* 标签页 */
  const tab = f < 268 ? 0 : f < 344 ? 1 : 2;

  /* 拖动素材的高亮 */
  const highlight = p(f, 90, 104) * (1 - p(f, 160, 176));

  /* 手机内文字叠加 */
  const textOn = f >= 390 && f < 470;

  /* 饱和度 / 参数 */
  const sat = 100 + 50 * (p(f, 470, 500) - p(f, 560, 590));
  const flash = 0 + 70 * p(f, 430, 470);
  const zoom = 60 * p(f, 470, 510);
  const satHot = p(f, 480, 500) * (1 - p(f, 560, 580));

  /* 手机开场遮罩 */
  const phoneOn = p(f, 50, 64);

  /* 结束画面 */
  const wrap = p(f, 780, 812);
  const noteQ = sp(f, 786);
  const dim = 0.62 * wrap;

  /* 播放头 */
  const sec = Math.min(11.9, 0.5 + f * 0.0142);

  /* 吉祥物位置 */
  const walk1 = lin(f, 70, 140);
  const walk2 = lin(f, 300, 380);
  const mascotX = 168 + 54 * walk1 + 820 * walk2;
  const mascotY = 402 + 8 * Math.sin((f / 30) * Math.PI * 0.9);
  const armTarget =
    f >= 430 && f < 610
      ? { x: 1020 + 236 * Math.min(1, sat / 150), y: 196 }
      : f >= 620 && f < 700
        ? { x: 1144, y: 540 }
        : f >= 700 && f < 780
          ? { x: 1215, y: 30 }
          : null;

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: 'hidden', fontFamily: FONT }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cam}) translateX(${camX}px)`,
          transformOrigin: '50% 60%',
        }}
      >
        {f > 22 && f < 790 && (
          <div style={{ opacity: p(f, 24, 40) }}>
            <TopBar f={f} />
          </div>
        )}
        <LeftPanel f={f} in={leftIn} tab={tab} highlight={highlight} />
        <Inspector
          in={inspIn}
          flash={flash}
          sat={sat}
          zoom={zoom}
          speed={1}
          satHot={satHot}
        />

        {/* 手机 */}
        <div
          style={{
            position: 'absolute',
            left: 542,
            top: 58 - 14 * wrap,
            width: 196,
            height: 316,
            opacity: phoneIn,
            transform: `scale(${0.96 + 0.04 * phoneIn + 0.6 * wrap}) translateY(${(1 - phoneIn) * 26}px)`,
            transformOrigin: '50% 0%',
            zIndex: 20,
          }}
        >
          <PhoneShell glow={satHot}>
            <PhoneScreen f={f} pop={wrap} text={textOn} />
          </PhoneShell>
        </div>

        {/* 播放控制 */}
        <div
          style={{
            position: 'absolute',
            left: 542,
            top: 382,
            width: 196,
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            color: C.ink,
            fontSize: 15,
            opacity: phoneOn * (f < 790 ? 1 : 0),
            zIndex: 21,
          }}
        >
          <span>◀◀</span>
          <span>❚❚</span>
          <span>▶</span>
        </div>

        <Timeline
          f={f}
          in={tlIn}
          sec={sec}
          showText={f >= 380 && f < 470}
          showMarkers={f >= 600}
          binPop={p(f, 250, 262) - p(f, 270, 286)}
          zen={0}
        />

        {/* 吉祥物 */}
        <Mascot
          f={f}
          x={mascotX}
          y={f < 790 ? mascotY : 520}
          scale={0.82}
          arm={armTarget}
          mouth={f > 470 && f < 620 ? 'open' : 'smile'}
          opacity={p(f, 58, 70)}
        />

        {/* 开场代码窗口 */}
        <CodeWindow f={f} out={p(f, 44, 58)} />
      </div>

      {/* 收尾时压暗编辑器 */}
      <AbsoluteFill style={{ background: '#F5F1E8', opacity: dim, pointerEvents: 'none' }} />

      {/* 结尾便签（压在压暗层之上） */}
      <NoteCard f={f} q={noteQ} />

      {/* ---------------- 标注层 ---------------- */}
      <Annotations f={f} />

      {/* 开场/收尾之外的手机黑屏淡入 */}
      <AbsoluteFill
        style={{ background: C.bg, opacity: 1 - p(f, 0, 10), pointerEvents: 'none' }}
      />
    </AbsoluteFill>
  );
};

/* ---------------- 所有手写标注 ---------------- */
const Annotations: React.FC<{ f: number }> = ({ f }) => {
  const label = (text: string, at: number, dur: number, style: React.CSSProperties, tone: 'ink' | 'accent' = 'ink', size = 20) => {
    const q = popIn(f, at);
    const o = 1 - p(f, at + dur - 10, at + dur);
    return (
      <div style={{ opacity: q * o }}>
        <Chip
          text={text}
          size={size}
          tone={tone}
          style={{
            ...style,
            transform: `${style.transform ?? ''} scale(${0.86 + q * 0.14}) rotate(${(1 - q) * -8}deg)`,
          }}
        />
      </div>
    );
  };

  const hand = (
    text: string,
    at: number,
    dur: number,
    style: React.CSSProperties,
    color = '#33302B',
    size = 36
  ) => {
    const q = popIn(f, at);
    const o = 1 - p(f, at + dur - 10, at + dur);
    return (
      <div
        style={{
          position: 'absolute',
          fontFamily: HAND,
          fontSize: size,
          fontWeight: 900,
          color,
          opacity: q * o,
          transform: `rotate(-6deg) scale(${0.8 + q * 0.2})`,
          WebkitTextStroke: '5px #FFF8EC',
          paintOrder: 'stroke',
          whiteSpace: 'nowrap',
          ...style,
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <>
      {/* 开工！ */}
      {f > 82 && f < 160 && (
        <div
          style={{
            position: 'absolute',
            left: 246,
            top: 398,
            background: C.paper,
            border: `2.4px solid ${C.ink}`,
            borderRadius: 10,
            padding: '6px 14px',
            fontFamily: FONT,
            fontSize: 19,
            fontWeight: 900,
            color: C.ink,
            opacity: p(f, 82, 92) * (1 - p(f, 146, 158)),
            transform: `rotate(-4deg) scale(${0.9 + 0.1 * popIn(f, 82)})`,
            boxShadow: '3px 3px 0 rgba(51,48,43,0.8)',
          }}
        >
          开工！
          <div
            style={{
              position: 'absolute',
              left: 8,
              bottom: -9,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `10px solid ${C.ink}`,
            }}
          />
        </div>
      )}

      {/* 这段在发呆 zzz */}
      {hand('这段在发呆 zzz', 196, 54, { left: 342, top: 292 }, '#5B5470', 26)}

      {/* 唰！ */}
      {hand('唰！', 292, 44, { left: 742, top: 186 }, '#F0643C', 44)}

      {/* 空心入网！ */}
      {hand('空心入网！', 318, 46, { left: 340, top: 300 }, '#2EAFA8', 38)}

      {/* 已修正 印章 */}
      {f > 396 && f < 480 && (
        <div
          style={{
            position: 'absolute',
            left: 782,
            top: 224,
            width: 170,
            height: 74,
            border: `4px solid #3C9C6E`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3C9C6E',
            fontFamily: HAND,
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: '0.08em',
            transform: `rotate(-12deg) scale(${popIn(f, 398)})`,
            opacity: (1 - p(f, 462, 480)) * 0.9,
          }}
        >
          已修正
        </div>
      )}

      {/* 撤销! + Ctrl+Z 键帽 */}
      {hand('撤销!', 424, 52, { left: 246, top: 330 }, '#33302B', 34)}
      {f > 420 && f < 480 && (
        <div
          style={{
            position: 'absolute',
            left: 158,
            top: 392,
            width: 130,
            height: 58,
            border: `2.6px solid ${C.ink}`,
            borderRadius: 9,
            background: '#FFFDF8',
            boxShadow: '0 8px 0 #BEB7AA, 0 12px 18px rgba(50,40,30,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT,
            fontSize: 20,
            fontWeight: 800,
            color: C.ink,
            opacity: p(f, 422, 434) * (1 - p(f, 466, 480)),
            transform: `translateY(${(1 - popIn(f, 422)) * -18}px) rotate(-3deg)`,
          }}
        >
          Ctrl+Z
        </div>
      )}

      {/* 饱和度：拉满 */}
      {f > 470 && f < 570 && (
        <div
          style={{
            position: 'absolute',
            left: 320,
            top: 48,
            fontFamily: HAND,
            fontSize: 48,
            fontWeight: 900,
            color: '#F0643C',
            WebkitTextStroke: '9px #FFE9DE',
            paintOrder: 'stroke',
            transform: `rotate(-3deg) scale(${0.9 + 0.1 * popIn(f, 472)})`,
            opacity: p(f, 472, 486) * (1 - p(f, 552, 568)),
            whiteSpace: 'nowrap',
          }}
        >
          饱和度：拉满
        </div>
      )}

      {/* 卡点! */}
      {hand('卡点!', 620, 50, { left: 760, top: 372 }, '#33302B', 40)}

      {/* 叮! */}
      {hand('叮!', 700, 44, { left: 1130, top: 120 }, '#F0643C', 42)}

      {/* 拿捏了！气泡（收尾手机内已有文字） */}
      {f > 812 && (
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 468,
            fontFamily: HAND,
            fontSize: 26,
            color: C.ink,
            opacity: p(f, 812, 828),
            transform: `rotate(-5deg) translateY(${(1 - p(f, 812, 828)) * 12}px)`,
            zIndex: 60,
          }}
        >
          收工！✨
        </div>
      )}

      {/* 卡点! */}
      {hand('卡点!', 620, 50, { left: 760, top: 372 }, '#33302B', 40)}
    </>
  );
};
