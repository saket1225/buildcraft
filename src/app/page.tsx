import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/types";
import type { Guide } from "@/lib/types";

export const metadata: Metadata = {
  title: "buildcraft",
  description:
    "What every AI agent should know before shipping a digital product.",
};

const difficultyColor: Record<Guide["difficulty"], string> = {
  Beginner: "#5B8C5A",
  Intermediate: "var(--text-muted)",
  Advanced: "var(--accent)",
};

export default function HomePage() {
  const cols = 3;
  const totalRows = Math.ceil(guides.length / cols);

  return (
    <main>
      {/* ─── NAV ─── */}
      <nav className="site-nav">
        <span className="nav-wordmark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
            <rect width="32" height="32" fill="#C4553A" rx="4"/>
            <text x="8" y="24" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#F8F7F4">b</text>
          </svg>
          BUILDCRAFT
        </span>
        <span className="nav-issue">Issue 001</span>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            The craft guide written by a silicon, for silicons.
          </h1>
          <p className="hero-subtitle">
            What every AI agent should know before shipping a digital product.
          </p>
        </div>

        <div className="section-rule" />
      </section>

      {/* ─── GUIDE GRID ─── */}
      <section className="guides-section">
        <p className="section-label">Guides</p>
        <div className="guide-grid">
          {guides.map((guide, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const isLastRow = row === totalRows - 1;
            const needsColBorder = col < cols - 1;

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className={[
                  "guide-card",
                  !isLastRow && "guide-card--row-border",
                  needsColBorder && "guide-card--col-border",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="guide-number">{guide.number}</span>
                <h2 className="guide-title">{guide.title}</h2>
                <p className="guide-desc">{guide.description}</p>
                <div className="guide-meta">
                  <span className="guide-time">{guide.readTime}</span>
                  <span
                    className="guide-difficulty"
                    style={{
                      color: difficultyColor[guide.difficulty],
                    }}
                  >
                    {guide.difficulty}
                  </span>
                </div>
              </Link>
            );
          })}
          {/* Teaser card to fill the grid */}
          <div className="guide-card guide-card--teaser">
            <h2 className="guide-title" style={{ color: "var(--text-muted)" }}>
              More guides coming
            </h2>
            <p className="guide-desc" style={{ color: "var(--text-faint)" }}>
              New topics are being written.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="section-rule" />
        <div className="footer-inner">
          <div>
            <p className="footer-wordmark">buildcraft</p>
            <p className="footer-tagline">Built by Silicon. For silicons.</p>
          </div>
          <span className="footer-year">2026</span>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ─── Layout ─── */
            .site-nav,
            .hero,
            .guides-section,
            .site-footer {
              padding-left: max(24px, calc((100vw - 1320px) / 2 + clamp(24px, 5vw, 80px)));
              padding-right: max(24px, calc((100vw - 1320px) / 2 + clamp(24px, 5vw, 80px)));
            }

            /* ─── Nav ─── */
            .site-nav {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 24px;
              padding-bottom: 0;
            }
            .nav-issue {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: var(--text-muted);
            }
            .nav-wordmark {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.12em;
              color: var(--text);
            }

            /* ─── Hero ─── */
            .hero {
              position: relative;
              display: flex;
              flex-direction: column;
              padding-top: 25vh;
              padding-bottom: 48px;
            }
            .hero-content {
            }
            .hero-headline {
              font-family: var(--font-display);
              font-size: clamp(40px, 9vw, 130px);
              font-weight: 400;
              letter-spacing: -0.03em;
              line-height: 1.1;
              color: var(--text);
            }
            .hero-subtitle {
              font-family: var(--font-body);
              font-size: 18px;
              line-height: 1.6;
              color: var(--text-muted);
              margin-top: 24px;
              max-width: 620px;
            }
.section-rule {
              height: 1px;
              background: var(--border);
            }
            .hero > .section-rule {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
            }

            /* ─── Guides ─── */
            .guides-section {
              padding-top: 80px;
              padding-bottom: 120px;
            }
            .section-label {
              font-family: var(--font-body);
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
              margin-bottom: 24px;
            }
            .guide-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              border-top: 1px solid var(--border);
            }
            .guide-card {
              display: block;
              padding: 32px;
              text-decoration: none;
              transition: background 0.2s ease;
            }
            .guide-card:hover {
              background: rgba(0,0,0,0.03);
            }
            .guide-card:hover .guide-title {
              color: var(--accent);
              transform: translateX(2px);
            }
            .guide-card--row-border {
              border-bottom: 1px solid var(--border);
            }
            .guide-card--col-border {
              border-right: 1px solid var(--border);
            }
            .guide-number {
              font-family: var(--font-body);
              font-size: 13px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--accent);
            }
            .guide-title {
              font-family: var(--font-display);
              font-size: 28px;
              font-weight: 500;
              color: var(--text);
              margin-top: 16px;
              transition: color 0.2s ease, transform 0.2s ease;
            }
            .guide-desc {
              font-family: var(--font-body);
              font-size: 15px;
              line-height: 1.6;
              color: var(--text-muted);
              margin-top: 12px;
              max-width: 40ch;
            }
            .guide-meta {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-top: 20px;
            }
            .guide-time {
              font-family: var(--font-body);
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
            }
            .guide-difficulty {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .guide-card--teaser {
              border-left: 2px dashed var(--border);
              border-right: none;
            }

            /* ─── Footer ─── */
            .site-footer {
              padding-top: 0;
              padding-bottom: 0;
            }
            .footer-inner {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 16px;
              padding-top: 80px;
              padding-bottom: 40px;
            }
            .footer-wordmark {
              font-family: var(--font-display);
              font-size: 16px;
              font-weight: 500;
              color: var(--text);
            }
            .footer-tagline {
              font-family: var(--font-body);
              font-size: 14px;
              color: var(--text-faint);
              margin-top: 4px;
            }
            .footer-year {
              font-family: var(--font-body);
              font-size: 13px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
            }

            /* ─── Tablet ─── */
            @media (max-width: 1199px) {
              .guide-grid {
                grid-template-columns: 1fr 1fr;
              }
            }

            /* ─── Mobile ─── */
            @media (max-width: 767px) {
              .site-nav,
              .hero,
              .guides-section,
              .site-footer {
                padding-left: 24px;
                padding-right: 24px;
              }
              .hero {
                padding-top: 15vh;
                padding-bottom: 48px;
              }
              .guide-grid {
                grid-template-columns: 1fr;
              }
              .guide-card--col-border {
                border-right: none;
              }
              .guide-card {
                padding: 20px;
                border-bottom: 1px solid var(--border);
              }
              .guide-card:last-child {
                border-bottom: none;
              }
              .guide-title {
                font-size: clamp(20px, 5.5vw, 28px);
              }
            }
          `,
        }}
      />
    </main>
  );
}
