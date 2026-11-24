import React from 'react';
import { C, FONT, HAND, TL, p } from './theme';
import { Panel } from './ui';
import { NightScene, RamenScene, RunnerScene, ShibaScene } from './scenes';

const SEGS = [
  { id: 0, t0: 0.0, t1: 2.45, kind: 'night', label: '月夜.mp4' },
  { id: 1, t0: 2.45, t1: 3.65, kind: 'ramen', label: '拉面.mp4' },
  { id: 3, t0: 5.15, t1: 6.75, kind: 'ramen', label: '拉面.mp4' },
  { id: 4, t0: 6.95, t1: 9.3, kind: 'shiba', label: '柴犬.mp4' },
  { id: 5, t0: 9.3, t1: 11.9, kind: 'runner', label: '小克跑步.mp4' },
];

const ClipArt: React.FC<{ kind: string; f: number }> = ({ kind, f }) => {
  if (kind === 'night') return <NightScene />;
  if (kind === 'ramen') return <RamenScene />;
  if (kind === 'shiba') return <ShibaScene />;
  return <RunnerScene f={f} pop={0} />;
};

export const Timeline: React.FC<{
  f: number;
  in: number;
  sec: number;
  showText: boolean;
  showMarkers: boolean;
  binPop: number;
  zen: number;
}> = ({ f, in: a, sec, showText, showMarkers, binPop, zen }) => {
  const x = (t: number) => TL.x0 + t * TL.pxPerSec;
  const playX = x(sec);
  const binIn = p(f, 208, 224);
  const binOut = p(f, 292, 306);
  const flying = p(f, 236, 280);
  const showBin = binIn * (1 - binOut);

  return (
    <Panel
      style={{
        left: 10,
        top: 400,
        width: TL.w,
        height: TL.h,
        opacity: a,
        transform: `translateY(${(1 - a) * 24}px)`,
        zIndex: 5,
      }}
    >
      {/* 刻度 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = i * 2;
        return (
          <div key={i} style={{ position: 'absolute', left: x(t), top: 0 }}>
            <div style={{ position: 'absolute', top: 4, width: 1, height: 8, background: C.faint }} />
            <div
              style={{
                position: 'absolute',
                left: 3,
                top: 3,
                fontFamily: FONT,
                fontSize: 9,
                color: C.sub,
                whiteSpace: 'nowrap',
              }}
            >
              0:{String(t).padStart(2, '0')}
            </div>
          </div>
        );
      })}
      {Array.from({ length: 56 }).map((_, i) => (
        <div
          key={`m${i}`}
          style={{
            position: 'absolute',
            left: x(i * 0.25),
            top: 9,
            width: 1,
            height: 4,
            background: '#E3DCCD',
          }}
        />
      ))}

      {/* 左侧工具按钮 */}
      {[
        ['T', 44],
        ['▶', 90],
        ['♪', 136],
      ].map(([s, top], i) => (
        <div
          key={String(s)}
          style={{
            position: 'absolute',
            left: 8,
            top: Number(top),
            width: 30,
            height: 30,
            borderRadius: 7,
            border: `1.4px solid ${C.line}`,
            background: i === 1 ? '#EFEAE0' : C.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT,
            fontSize: 13,
            color: C.ink,
          }}
        >
          {s}
        </div>
      ))}

      {/* 文字轨道 */}
      {showText && (
        <div
          style={{
            position: 'absolute',
            left: x(5.15),
            top: TL.textTop + 2,
            width: (8.6 - 5.15) * TL.pxPerSec,
            height: 19,
            borderRadius: 5,
            border: `1.6px solid #C9A227`,
            background: '#F8DE86',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '0 6px',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: 900, color: '#6B5410' }}>T</span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 9.5,
              color: '#5A4710',
              whiteSpace: 'nowrap',
              fontWeight: 700,
            }}
          >
            前方高能预警
          </span>
        </div>
      )}

      {/* 视频片段 */}
      {SEGS.map((s) => {
        const w = (s.t1 - s.t0) * TL.pxPerSec - 3;
        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: x(s.t0) + 1.5,
              top: TL.videoTop,
              width: w,
              height: TL.videoH,
              borderRadius: 6,
              border: `1.6px solid rgba(40,30,90,0.45)`,
              background: '#2F2A50',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, opacity: 0.95 }}>
              <ClipArt kind={s.kind} f={f} />
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                padding: '2px 5px',
                background: 'rgba(35,25,60,0.6)',
                fontFamily: FONT,
                fontSize: 8.5,
                color: '#F3EEFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {s.label}
            </div>
          </div>
        );
      })}

      {/* 被剪掉的空段（斜线填充） */}
      <div
        style={{
          position: 'absolute',
          left: x(3.65) + 1.5,
          top: TL.videoTop,
          width: 1.5 * TL.pxPerSec - 3,
          height: TL.videoH,
          borderRadius: 6,
          border: `1.4px dashed #B9B1A3`,
          background:
            'repeating-linear-gradient(45deg, #E7E2D6 0 6px, #DCD5C7 6px 12px)',
          opacity: 0.9,
        }}
      />

      {/* 被删除片段：飞进垃圾桶 */}
      <div
        style={{
          position: 'absolute',
          left: x(3.65) + 1.5 + flying * 330,
          top: TL.videoTop + flying * 76,
          width: 1.5 * TL.pxPerSec - 3,
          height: TL.videoH,
          borderRadius: 6,
          border: `1.6px solid rgba(40,30,90,0.45)`,
          overflow: 'hidden',
          opacity: p(f, 230, 240) * (1 - p(f, 276, 284)),
          transform: `scale(${1 - flying * 0.45}) rotate(${flying * 14}deg)`,
        }}
      >
        <RamenScene />
      </div>

      {/* 音频轨 */}
      <div
        style={{
          position: 'absolute',
          left: x(0),
          top: TL.audioTop,
          width: 11.9 * TL.pxPerSec,
          height: TL.audioH,
          borderRadius: 7,
          border: `1.4px solid #A99BE0`,
          background: '#F3F0FF',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 12,
            background: '#DDD6F6',
            fontFamily: FONT,
            fontSize: 8,
            color: '#5D4E9C',
            padding: '1px 5px',
          }}
        >
          ♪ 小克.mp3
        </div>
        {Array.from({ length: 128 }).map((_, i) => {
          const h = 5 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37)) * 18;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 3 + i * 6.05,
                top: 22 - h / 2 + 6,
                width: 3,
                height: h,
                borderRadius: 2,
                background: i * 6.05 < playX - x(0) ? '#8F7CF0' : '#CBC1F2',
              }}
            />
          );
        })}
      </div>

      {/* 卡点标记 */}
      {showMarkers &&
        Array.from({ length: 46 }).map((_, i) => {
          const q = p(f, 596 + i * 0.7, 604 + i * 0.7);
          const t = 0.15 + i * 0.26;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x(t),
                top: TL.markerTop + 34,
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '8px solid #E4B93C',
                opacity: q,
                transform: `translateY(${(1 - q) * -6}px)`,
              }}
            />
          );
        })}

      {/* 卡点按钮 */}
      <div
        style={{
          position: 'absolute',
          left: 1132,
          top: TL.markerTop + 26,
          padding: '5px 14px',
          borderRadius: 6,
          border: `1.8px solid ${C.ink}`,
          background: '#F8DE86',
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 900,
          color: '#5A4710',
          boxShadow: '2px 2px 0 rgba(51,48,43,0.8)',
          opacity: p(f, 604, 618),
        }}
      >
        ♪ 卡点
      </div>

      {/* 垃圾桶 */}
      <div
        style={{
          position: 'absolute',
          left: 500,
          top: TL.videoTop + 56,
          width: 62,
          height: 74,
          opacity: showBin,
          transform: `scale(${(0.65 + binIn * 0.35 - binPop * 0.12) * 1}) rotate(${-binPop * 8}deg)`,
          transformOrigin: '50% 100%',
          zIndex: 20,
        }}
      >
        <svg width="62" height="74" viewBox="0 0 62 74">
          <path d="M10 16 h42 l-5 50 a6 6 0 0 1 -6 6 H21 a6 6 0 0 1 -6 -6 z" fill="#F3EFE6" stroke="#8D877C" strokeWidth="2.6" />
          <path d="M6 12 h50" stroke="#8D877C" strokeWidth="4" strokeLinecap="round" />
          <path d="M23 6 h16" stroke="#8D877C" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 28 v 28 M38 28 v 28" stroke="#B5AD9F" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M20 22 l 6 6 M42 22 l -6 6" stroke="#B5AD9F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {showBin > 0.2 && (
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: TL.videoTop + 34,
            fontFamily: HAND,
            fontSize: 34,
            fontWeight: 900,
            color: '#8A5A3B',
            opacity: showBin * p(f, 250, 262),
            transform: `rotate(-8deg) scale(${0.9 + 0.1 * p(f, 250, 262)})`,
            WebkitTextStroke: '5px #FFF8EC',
            paintOrder: 'stroke',
            whiteSpace: 'nowrap',
          }}
        >
          哐当！
        </div>
      )}

      {/* 播放头 */}
      <div
        style={{
          position: 'absolute',
          left: playX,
          top: 0,
          bottom: 26,
          width: 1.6,
          background: C.red,
          opacity: 0.9,
          zIndex: 25,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -6,
            top: -2,
            width: 13,
            height: 13,
            background: C.red,
            borderRadius: 3,
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      {/* 底部缩放条 */}
      <div
        style={{
          position: 'absolute',
          left: 26,
          bottom: 10,
          width: 150,
          height: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          opacity: 0.9,
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 11, color: C.sub }}>−</span>
        <div style={{ position: 'relative', flex: 1, height: 2, background: C.line }}>
          <div
            style={{
              position: 'absolute',
              left: 54,
              top: -4,
              width: 10,
              height: 10,
              borderRadius: 5,
              background: C.paper,
              border: `1.6px solid ${C.ink}`,
            }}
          />
        </div>
        <span style={{ fontFamily: FONT, fontSize: 11, color: C.sub }}>+</span>
      </div>

      {/* 禅模式留下的空白感（末段整体淡出） */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.paper,
          opacity: zen,
          pointerEvents: 'none',
        }}
      />
    </Panel>
  );
};
