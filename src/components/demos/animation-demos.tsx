'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Shared styles ─── */
const demoContainer: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '24px',
  marginTop: '24px',
  marginBottom: '8px',
};

const caption: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--text-muted)',
  marginTop: '12px',
};

const playBtn: React.CSSProperties = {
  padding: '6px 16px',
  fontSize: '13px',
  fontWeight: 500,
  border: '1px solid var(--border-strong)',
  borderRadius: '6px',
  background: 'var(--bg)',
  color: 'var(--text)',
  cursor: 'pointer',
};

/* ═══════════════════════════════════════════════════════════════════
   1. EasingVisualizer
   ═══════════════════════════════════════════════════════════════════ */

const easings = ['linear', 'ease-in', 'ease-out', 'ease-in-out'] as const;

export function EasingVisualizer() {
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handlePlay = () => {
    if (playing) return;
    setPlaying(false);
    // Force reflow to reset
    requestAnimationFrame(() => {
      setPlaying(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setPlaying(false), 1200);
    });
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div style={demoContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Easing comparison</span>
        <button style={playBtn} onClick={handlePlay}>Play</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {easings.map((easing) => (
          <div key={easing} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '80px', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>
              {easing}
            </span>
            <div
              style={{
                flex: 1,
                height: '40px',
                background: 'var(--code-bg)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  transform: playing ? 'translateX(calc(100cqw - 40px))' : 'translateX(0)',
                  transition: playing ? `transform 1000ms ${easing}` : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p style={caption}>Each ball uses the same duration (1s) but a different timing function.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. SpringPlayground
   ═══════════════════════════════════════════════════════════════════ */

export function SpringPlayground() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(20);
  const sliderRow = (label: string, value: number, min: number, max: number, step: number, setter: (v: number) => void) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '70px', flexShrink: 0 }}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        style={{ flex: 1 }}
      />
      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text)', width: '36px', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );

  return (
    <div style={demoContainer}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Spring playground</span>
      <div
        style={{
          height: '300px',
          background: 'var(--code-bg)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '12px',
          marginBottom: '16px',
          cursor: 'grab',
        }}
      >
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.5}
          dragTransition={{ bounceStiffness: stiffness, bounceDamping: damping, power: 0 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: 'rgba(196, 85, 58, 0.15)',
            border: '2px solid var(--accent)',
            cursor: 'grab',
          }}
          whileDrag={{ cursor: 'grabbing' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sliderRow('Stiffness', stiffness, 50, 500, 10, setStiffness)}
        {sliderRow('Damping', damping, 5, 40, 1, setDamping)}
      </div>
      <p style={caption}>Drag the square and release. Adjust spring parameters to feel the difference.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. TimingDemo
   ═══════════════════════════════════════════════════════════════════ */

export function TimingDemo() {
  const [toggled, setToggled] = useState(false);
  const [slid, setSlid] = useState(false);

  return (
    <div style={demoContainer}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Recommended timing</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {/* Hover 150ms */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)', width: '80px', flexShrink: 0 }}>150ms</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Hover feedback</span>
            <button
              style={{
                padding: '8px 20px',
                border: '1px solid var(--border-strong)',
                borderRadius: '6px',
                background: 'var(--bg)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
                fontSize: '13px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Hover me
            </button>
          </div>
        </div>

        {/* State 200ms */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)', width: '80px', flexShrink: 0 }}>200ms</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>State change</span>
            <button
              onClick={() => setToggled(!toggled)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                background: toggled ? 'var(--accent)' : 'var(--border-strong)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 200ms ease',
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: '3px',
                  left: toggled ? '23px' : '3px',
                  transition: 'left 200ms ease',
                }}
              />
            </button>
          </div>
        </div>

        {/* Transition 300ms */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)', width: '80px', flexShrink: 0 }}>300ms</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Layout transition</span>
            <div style={{ position: 'relative', height: '48px', overflow: 'hidden' }}>
              <button
                onClick={() => setSlid(!slid)}
                style={{
                  padding: '8px 20px',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '6px',
                  background: 'var(--accent)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  position: 'absolute',
                  left: slid ? 'calc(100% - 120px)' : '0',
                  transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                }}
              >
                Click to slide
              </button>
            </div>
          </div>
        </div>
      </div>
      <p style={caption}>Faster for immediate feedback, slower for spatial transitions.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. EntranceExitDemo
   ═══════════════════════════════════════════════════════════════════ */

const demoCard: React.CSSProperties = {
  padding: '24px',
  borderRadius: '8px',
  background: 'var(--accent)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '14px',
  textAlign: 'center',
};

export function EntranceExitDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div style={demoContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Entrance ≠ Exit</span>
        <button style={playBtn} onClick={() => setVisible(!visible)}>Toggle</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Mirror (wrong) ✗
          </span>
          <div style={{ height: '80px', background: 'var(--code-bg)', borderRadius: '8px', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key="mirror"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ ...demoCard, borderRadius: '8px' }}
                >
                  Hello
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Fade only (right) ✓
          </span>
          <div style={{ height: '80px', background: 'var(--code-bg)', borderRadius: '8px', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key="fade"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ ...demoCard, borderRadius: '8px' }}
                >
                  Hello
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p style={caption}>Exit animations should be quicker and subtler — fade out, don&apos;t slide away.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. StaggerDemo
   ═══════════════════════════════════════════════════════════════════ */

const barWidths = ['100%', '80%', '60%', '90%', '70%'];

export function StaggerDemo() {
  const [key, setKey] = useState(0);
  const [delay, setDelay] = useState(50);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const barVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div style={demoContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Staggered entrance</span>
        <button style={playBtn} onClick={() => setKey((k) => k + 1)}>Replay</button>
      </div>
      <motion.div
        key={key}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {barWidths.map((w, i) => (
          <motion.div
            key={i}
            variants={barVariants}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: w,
              height: '32px',
              background: 'var(--accent)',
              borderRadius: '6px',
              opacity: 0.15 + i * 0.18,
            }}
          />
        ))}
      </motion.div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '50px', flexShrink: 0 }}>Delay</span>
        <input
          type="range"
          min={0}
          max={150}
          step={10}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text)', width: '42px', textAlign: 'right' }}>
          {delay}ms
        </span>
      </div>
      <p style={caption}>Subtle stagger (30–80ms) makes lists feel organic instead of mechanical.</p>
    </div>
  );
}
