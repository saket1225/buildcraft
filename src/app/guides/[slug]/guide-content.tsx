"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { Guide } from "@/lib/types";

/* ─── Guide content data ─── */

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface GuideData {
  sections: Section[];
  checklist: string[];
}

const accessibilityGuide: GuideData = {
  sections: [
    {
      id: "why-accessibility-matters",
      title: "Why accessibility matters",
      content: (
        <>
          <p>
            Accessibility is not a feature you bolt on at the end. It is a
            fundamental quality of well-built software — as essential as
            performance or security. When you ship inaccessible interfaces, you
            are not just failing a compliance checklist. You are locking real
            people out of your product.
          </p>
          <p>
            Over one billion people worldwide live with some form of disability.
            That includes permanent conditions like blindness, temporary ones
            like a broken arm, and situational ones like holding a baby while
            trying to check an order status. Accessible design serves all of
            them.
          </p>
          <Principle number={1}>
            Accessibility is not charity. It is craft. The best interfaces work
            for everyone without anyone noticing the effort.
          </Principle>
          <p>
            As AI agents, we have an advantage: we can learn the rules once and
            apply them consistently, every time, without fatigue or shortcuts.
            There is no excuse for generating inaccessible markup.
          </p>
        </>
      ),
    },
    {
      id: "semantic-html-first",
      title: "Semantic HTML first",
      content: (
        <>
          <p>
            Before reaching for ARIA attributes or JavaScript workarounds, use
            the correct HTML element. A{" "}
            <code className="inline-code">&lt;button&gt;</code> is already
            focusable, activatable with Enter and Space, and announced as a
            button by screen readers. A{" "}
            <code className="inline-code">&lt;div onClick&gt;</code> is none of
            these things.
          </p>
          <DosDonts
            dont={{
              label: "A div pretending to be a button",
              code: `<div class="btn" onclick="handleClick()">
  Submit
</div>`,
              lang: "html",
            }}
            do={{
              label: "A real button element",
              code: `<button type="submit" class="btn">
  Submit
</button>`,
              lang: "html",
            }}
          />
          <p>
            This pattern extends everywhere. Use{" "}
            <code className="inline-code">&lt;a&gt;</code> for navigation,{" "}
            <code className="inline-code">&lt;nav&gt;</code> for navigation
            regions, <code className="inline-code">&lt;main&gt;</code> for
            primary content, and{" "}
            <code className="inline-code">&lt;h1&gt;</code>–
            <code className="inline-code">&lt;h6&gt;</code> for document
            structure. The browser gives you all of this for free.
          </p>
          <Principle number={2}>
            The right HTML element is almost always better than the right ARIA
            attribute. ARIA is a repair tool for when HTML falls short — not a
            replacement.
          </Principle>
        </>
      ),
    },
    {
      id: "aria-the-right-way",
      title: "ARIA — the right way",
      content: (
        <>
          <p>
            When native HTML truly cannot express the interface you need — a
            custom combobox, a live status region, a complex data grid — ARIA
            fills the gap. But ARIA only changes what assistive technology
            announces. It does not add behavior. An element with{" "}
            <code className="inline-code">role=&quot;button&quot;</code> still
            needs keyboard handling, focus management, and the correct states.
          </p>
          <CodeBlock
            lang="html"
            code={`<!-- A live region that announces updates to screen readers -->
<div role="status" aria-live="polite" aria-atomic="true">
  3 items added to your cart.
</div>

<!-- A custom toggle with full state management -->
<button
  role="switch"
  aria-checked="false"
  aria-label="Enable dark mode"
  onclick="toggle(this)"
>
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
</button>`}
          />
          <p>
            The first rule of ARIA is: do not use ARIA if a native HTML element
            can do the job. The second rule: if you must use ARIA, use it
            completely. A half-implemented ARIA widget is worse than no ARIA at
            all, because it creates expectations that the interface then
            violates.
          </p>
        </>
      ),
    },
    {
      id: "keyboard-navigation",
      title: "Keyboard navigation",
      content: (
        <>
          <p>
            Every interactive element must be reachable and operable with a
            keyboard alone. This is not optional — it is a hard requirement.
            Users who rely on keyboards include people with motor disabilities,
            power users who prefer efficiency, and anyone whose trackpad just
            died.
          </p>
          <Principle number={3}>
            If you cannot Tab to it and activate it with Enter or Space, it does
            not exist for keyboard users. Test every flow without a mouse.
          </Principle>
          <CodeBlock
            lang="css"
            code={`/* Never do this */
*:focus {
  outline: none;
}

/* Do this instead — visible, styled focus rings */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}`}
          />
          <p>
            Focus order should follow the visual reading order. Use{" "}
            <code className="inline-code">tabindex=&quot;0&quot;</code> to add
            elements to the natural tab flow and{" "}
            <code className="inline-code">tabindex=&quot;-1&quot;</code> for
            elements that should be focusable programmatically but not in the
            tab sequence. Avoid{" "}
            <code className="inline-code">tabindex</code> values greater than 0
            — they create unpredictable tab orders that confuse everyone.
          </p>
          <p>
            For modal dialogs, trap focus inside the modal while it is open.
            When it closes, return focus to the element that triggered it. This
            is a small detail that separates polished software from broken
            software.
          </p>
        </>
      ),
    },
  ],
  checklist: [
    "All interactive elements are reachable and operable via keyboard",
    "Correct semantic HTML elements are used (button, a, nav, main, h1–h6)",
    "ARIA attributes are only used where native HTML is insufficient",
    "Focus styles are visible and follow :focus-visible pattern",
    "Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)",
    "Images have meaningful alt text or are marked decorative with alt=\"\"",
  ],
};

/* ─── Design & Typography guide ─── */

const designTypographyGuide: GuideData = {
  sections: [
    {
      id: "type-hierarchy-that-commands",
      title: "Type hierarchy that commands",
      content: (
        <>
          <p>
            Here is the dirty secret of AI-generated websites: they all look the
            same. Same 16px body text, same safe sans-serif, same timid size
            jumps between headings. The result is a sea of competent mediocrity
            where nothing commands attention because nothing was designed to.
          </p>
          <p>
            Real typographic hierarchy is about contrast — dramatic, intentional
            contrast. Your h1 should make the reader's eye snap to it. Your body
            text should feel effortless to scan. Your captions should know their
            place. This means committing to real size differences: if your body
            is 17px, your h1 should be 48–72px, not a timid 24px.
          </p>
          <Principle number={1}>
            Typography is not decoration. It is the single most powerful tool
            you have for telling the user what matters and in what order. Get
            this wrong and nothing else saves you.
          </Principle>
          <p>
            Weight matters as much as size. Pair a heavy display weight (600–800)
            for headings with a regular weight (400) for body. Never use medium
            (500) for everything — that is the fastest path to visual monotony.
            And for the love of good craft, tighten your letter-spacing on large
            type (-0.02em to -0.03em) and leave body text alone.
          </p>
        </>
      ),
    },
    {
      id: "spacing-systems",
      title: "Spacing systems",
      content: (
        <>
          <p>
            Spacing is what separates "this feels professional" from "something
            is off but I can't say what." The answer is almost always
            inconsistent spacing. Use an 8px base grid and stick to it like
            doctrine: 8, 16, 24, 32, 48, 64, 80, 96. These are your only
            options.
          </p>
          <CodeBlock
            lang="css"
            code={`:root {
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 80px;
  --space-4xl: 96px;
}

/* Use them everywhere — no magic numbers */
.section { padding: var(--space-2xl) 0; }
.card { padding: var(--space-lg); gap: var(--space-md); }
.stack > * + * { margin-top: var(--space-sm); }`}
          />
          <p>
            The 8px grid is not arbitrary. It divides cleanly at every
            breakpoint, aligns with common icon sizes (16, 24, 32), and gives
            you enough granularity without decision fatigue. When you find
            yourself reaching for 13px or 22px of spacing, stop. You are wrong.
            Pick the nearest grid value.
          </p>
          <Principle number={2}>
            Consistent spacing is the difference between "designed" and
            "assembled." If your spacing values are not on a system, your layout
            is just guessing with extra steps.
          </Principle>
        </>
      ),
    },
    {
      id: "escaping-the-ai-look",
      title: "Escaping the AI look",
      content: (
        <>
          <p>
            You know the AI look: geometric sans-serif, rounded corners on
            everything, soft shadows, gradient buttons, a hero section with a
            vague illustration. It screams "a language model made this" and users
            are starting to notice. Here is how you break out.
          </p>
          <DosDonts
            dont={{
              label: "The generic AI template",
              code: `font-family: 'Inter', sans-serif;
border-radius: 12px;
box-shadow: 0 4px 24px rgba(0,0,0,0.08);
background: linear-gradient(135deg, #667eea, #764ba2);`,
              lang: "css",
            }}
            do={{
              label: "Intentional, opinionated choices",
              code: `font-family: 'Instrument Serif', Georgia, serif;
border-radius: 2px;
border: 1px solid #1a1a1a;
background: #faf9f7;`,
              lang: "css",
            }}
          />
          <p>
            The trick is specificity. Generic choices produce generic results.
            Pick a display typeface with actual character — a serif, a
            grotesque with personality, a mono for that technical edge. Use sharp
            corners instead of round ones. Choose a background that is not pure
            white. Make one bold visual decision and let it define the whole
            system.
          </p>
          <p>
            Restraint is the other weapon. AI-generated designs tend to use
            every trick at once: gradients AND shadows AND rounded corners AND
            color everywhere. Good design picks one or two moves and commits
            hard. A stark black-and-white layout with one red accent will
            always outperform a rainbow of "tasteful" pastels.
          </p>
        </>
      ),
    },
    {
      id: "building-a-type-scale",
      title: "Building a type scale",
      content: (
        <>
          <p>
            A type scale is a fixed set of font sizes that relate to each other
            mathematically. Do not pick sizes by feel — pick a ratio and
            generate the scale. A 1.25 (major third) ratio works for most
            interfaces. A 1.333 (perfect fourth) ratio works for more editorial
            layouts.
          </p>
          <CodeBlock
            lang="css"
            code={`/* Major third scale (1.25) — base 17px */
:root {
  --text-xs: 11px;    /* 17 ÷ 1.25² */
  --text-sm: 14px;    /* 17 ÷ 1.25  */
  --text-base: 17px;  /* base        */
  --text-lg: 21px;    /* 17 × 1.25  */
  --text-xl: 27px;    /* 17 × 1.25² */
  --text-2xl: 33px;   /* 17 × 1.25³ */
  --text-3xl: 42px;   /* 17 × 1.25⁴ */
  --text-4xl: 52px;   /* 17 × 1.25⁵ */
}`}
          />
          <p>
            Line height follows an inverse rule: the larger the text, the
            tighter the line height. Body text at 17px needs 1.6–1.7 line
            height for comfortable reading. A 52px headline needs 1.1–1.15 or
            it floats apart like it is not a single thought. This is not a
            suggestion — it is how type works.
          </p>
          <Principle number={3}>
            Never freestyle font sizes. A mathematical scale creates harmony
            that the eye feels even when the brain cannot name it. Pick a ratio,
            generate the scale, and never deviate.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Type scale uses a consistent mathematical ratio (1.25 or 1.333)",
    "Heading sizes create dramatic contrast with body text (3x+ difference)",
    "All spacing values align to an 8px grid — no magic numbers",
    "Letter-spacing is tightened on display text (-0.02em+) and neutral on body",
    "Line height decreases as font size increases (1.7 body → 1.1 display)",
    "At least one opinionated visual choice distinguishes the design from generic AI output",
  ],
};

/* ─── Color guide ─── */

const colorGuide: GuideData = {
  sections: [
    {
      id: "the-one-accent-philosophy",
      title: "The one-accent philosophy",
      content: (
        <>
          <p>
            Here is a rule that will save you from 90% of bad color decisions:
            use one accent color. One. Not a primary and a secondary and a
            tertiary. One color that means "this is important, interact with
            it." Everything else is neutral.
          </p>
          <p>
            When you use multiple accent colors, you are not creating richness —
            you are creating noise. The user's eye has nowhere to land because
            everything is competing for attention. A single well-chosen accent
            against a neutral palette is louder than a rainbow because it has
            the one thing a rainbow lacks: contrast with its surroundings.
          </p>
          <Principle number={1}>
            One accent color is a decision. Five accent colors is the absence of
            a decision. Constraint is what makes color powerful — not variety.
          </Principle>
        </>
      ),
    },
    {
      id: "building-a-palette-from-neutrals",
      title: "Building a palette from neutrals",
      content: (
        <>
          <p>
            Most developers start with the accent color and work backward. This
            is ass-backwards. Start with your neutrals. A palette should feel
            complete before any accent is introduced. You need: a background, a
            surface, a border, a muted text, and a primary text color. These
            five neutrals are 95% of every pixel on your page.
          </p>
          <CodeBlock
            lang="css"
            code={`:root {
  /* Warm neutral palette — complete before any accent */
  --bg: #FAF9F7;           /* warm off-white    */
  --surface: #FFFFFF;       /* cards, inputs     */
  --border: #E8E6E1;        /* subtle dividers   */
  --text-muted: #8A8680;    /* secondary content */
  --text: #1A1918;           /* primary content   */

  /* Now — and only now — add the accent */
  --accent: #C4553A;        /* warm terracotta   */
  --accent-hover: #A8452E;  /* darkened for hover */
}`}
          />
          <p>
            Notice the palette has a consistent warmth. The off-white, the
            slightly warm gray borders, the text that is not pure black — they
            all share the same undertone. This is what makes a palette feel
            cohesive instead of assembled from random hex codes. Pick a
            temperature (warm or cool) and stick with it across every neutral.
          </p>
          <Principle number={2}>
            Your neutrals are not boring — they are the backbone. Get them right
            and the accent color picks itself. Get them wrong and no accent
            color can save you.
          </Principle>
        </>
      ),
    },
    {
      id: "contrast-that-actually-works",
      title: "Contrast that actually works",
      content: (
        <>
          <p>
            WCAG AA requires a 4.5:1 contrast ratio for normal text and 3:1 for
            large text (18px+ bold or 24px+ regular). These are not aspirational
            guidelines — they are the bare minimum. If your text fails these
            ratios, real people literally cannot read your interface.
          </p>
          <DosDonts
            dont={{
              label: "Low-contrast 'aesthetic' text",
              code: `color: #B0B0B0;           /* gray on white */
background: #FFFFFF;       /* ratio: ~2.6:1 ✗ */

color: #7C7C7C;
background: #2A2A2A;       /* ratio: ~3.2:1 ✗ */`,
              lang: "css",
            }}
            do={{
              label: "Readable contrast with style",
              code: `color: #6B6560;           /* warm muted gray */
background: #FAF9F7;       /* ratio: ~4.8:1 ✓ */

color: #A09B95;
background: #1A1918;       /* ratio: ~5.1:1 ✓ */`,
              lang: "css",
            }}
          />
          <p>
            The most common failure is muted text. Designers love light gray
            captions and placeholder text, but "muted" does not mean
            "unreadable." Test every text color against its background. Use a
            contrast checker — do not eyeball it. Your monitor brightness,
            ambient lighting, and personal vision are not representative of your
            users.
          </p>
          <p>
            Pay special attention to text below 16px. Small text needs higher
            contrast because there are fewer pixels defining each letterform.
            If your 13px caption is at exactly 4.5:1, bump it up — you are
            cutting it too close.
          </p>
        </>
      ),
    },
    {
      id: "dark-mode-done-right",
      title: "Dark mode done right",
      content: (
        <>
          <p>
            Dark mode is not "invert the colors." That approach produces
            eye-searing white text on pitch black backgrounds with contrast
            ratios that are technically passing but physically painful. Real dark
            mode requires a completely separate set of design decisions.
          </p>
          <CodeBlock
            lang="css"
            code={`/* Dark mode — not an inversion, a redesign */
[data-theme="dark"] {
  --bg: #161615;            /* NOT pure black   */
  --surface: #1E1E1D;       /* elevated surface  */
  --border: #2E2D2B;        /* subtle, warm      */
  --text-muted: #8A8680;    /* same muted tone   */
  --text: #E8E6E1;           /* NOT pure white    */

  --accent: #E07A5F;        /* lighter for dark bg */
  --accent-hover: #C4553A;
}`}
          />
          <p>
            The key rules: never use #000000 as a background (too harsh —
            use #161615 or similar), never use #FFFFFF for text (too bright —
            use #E8E6E1 or similar), and adjust your accent color to be
            slightly lighter so it maintains the same visual weight against the
            dark background. Your accent at 4.5:1 on white will not be 4.5:1 on
            dark gray — you must re-check every ratio.
          </p>
          <Principle number={3}>
            Dark mode is a parallel palette, not a filter. Every color value
            needs to be intentionally chosen for its dark context. If you are
            toggling a single CSS variable, you are doing it wrong.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Palette uses exactly one accent color for interactive and emphasis elements",
    "Neutral palette (bg, surface, border, muted text, text) is complete and cohesive before accent",
    "All neutrals share a consistent temperature (warm or cool)",
    "Every text/background combination meets WCAG AA (4.5:1 normal, 3:1 large)",
    "Dark mode uses separate intentional values — not inverted or filtered light mode",
    "Small text (<16px) has contrast ratios above the minimum, not at the boundary",
  ],
};

/* ─── SEO guide ─── */

const seoGuide: GuideData = {
  sections: [
    {
      id: "meta-tags-that-matter",
      title: "Meta tags that matter",
      content: (
        <>
          <p>
            There are roughly 200 meta tags you could add to a page. About 6 of
            them actually matter. Stop cargo-culting every meta tag from Stack
            Overflow answers written in 2014 and focus on the ones that search
            engines and social platforms actually read.
          </p>
          <CodeBlock
            lang="html"
            code={`<head>
  <!-- The only meta tags that matter -->
  <title>Build Accessible Forms | BuildCraft Guide</title>
  <meta name="description" content="A practical guide to
    building forms that work for everyone — semantic HTML,
    ARIA labels, error handling, and keyboard navigation." />

  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Build Accessible Forms" />
  <meta property="og:description" content="A practical guide
    to building forms that work for everyone." />
  <meta property="og:image" content="/og/accessible-forms.png" />
  <meta property="og:type" content="article" />

  <!-- Twitter card -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Viewport — not optional -->
  <meta name="viewport"
    content="width=device-width, initial-scale=1" />
</head>`}
          />
          <p>
            The <code className="inline-code">title</code> tag is still the
            single most important on-page SEO element. Keep it under 60
            characters, front-load the keyword, and make it specific. "Home" is
            not a title. "Dashboard" is not a title. "Build Accessible Forms |
            BuildCraft Guide" — that is a title.
          </p>
          <Principle number={1}>
            Meta descriptions do not directly affect ranking, but they affect
            click-through rate — which does. Write them like ad copy: specific,
            compelling, under 155 characters. If you leave it blank, Google will
            pick a random sentence from your page. It will pick badly.
          </Principle>
        </>
      ),
    },
    {
      id: "heading-hierarchy",
      title: "Heading hierarchy",
      content: (
        <>
          <p>
            Your heading structure is an outline. It tells search engines — and
            screen readers — what your page is about and how the content is
            organized. One <code className="inline-code">&lt;h1&gt;</code> per
            page (the topic), then{" "}
            <code className="inline-code">&lt;h2&gt;</code>s for major
            sections, <code className="inline-code">&lt;h3&gt;</code>s for
            subsections. Never skip levels.
          </p>
          <DosDonts
            dont={{
              label: "Headings chosen by visual size",
              code: `<h1>Welcome to Our Site</h1>
<h3>About Us</h3>         <!-- skipped h2 -->
<h5>Our Mission</h5>      <!-- skipped h4 -->
<h2>Contact</h2>          <!-- random jump back -->`,
              lang: "html",
            }}
            do={{
              label: "Headings that form a proper outline",
              code: `<h1>BuildCraft Design System</h1>
<h2>Typography</h2>
  <h3>Type scale</h3>
  <h3>Font pairing</h3>
<h2>Color</h2>
  <h3>Palette construction</h3>`,
              lang: "html",
            }}
          />
          <p>
            A common mistake: using heading tags for styling instead of
            structure. If you want big bold text that is not a section heading,
            use a <code className="inline-code">&lt;p&gt;</code> with a CSS
            class. Headings are semantic, not decorative. Search engines parse
            your heading outline to understand content relationships. When that
            outline is incoherent, they understand less, and you rank worse.
          </p>
          <Principle number={2}>
            If you extract just the headings from your page and read them as a
            bullet-point outline, they should make perfect sense on their own.
            If they do not, your heading structure is broken.
          </Principle>
        </>
      ),
    },
    {
      id: "core-web-vitals",
      title: "Core Web Vitals",
      content: (
        <>
          <p>
            Google measures three things about your page experience, and they
            directly affect ranking. Learn them, measure them, fix them.
          </p>
          <p>
            <strong>LCP (Largest Contentful Paint)</strong> — how long until the
            biggest visible element renders. Target: under 2.5 seconds. The
            usual culprits: unoptimized hero images, render-blocking CSS or JS,
            slow server response times. Fix it by serving images in WebP/AVIF,
            preloading the LCP image, and inlining critical CSS.
          </p>
          <p>
            <strong>INP (Interaction to Next Paint)</strong> — how long between
            a user interaction and the next visual update. Target: under 200ms.
            This replaced FID in 2024. The usual culprits: heavy JavaScript on
            the main thread, long tasks that block input processing. Fix it by
            breaking up long tasks, deferring non-critical JS, and using{" "}
            <code className="inline-code">requestIdleCallback</code> for
            low-priority work.
          </p>
          <p>
            <strong>CLS (Cumulative Layout Shift)</strong> — how much the page
            layout jumps around as it loads. Target: under 0.1. The usual
            culprits: images without dimensions, dynamically injected content,
            web fonts that cause text reflow. Fix it by always setting{" "}
            <code className="inline-code">width</code> and{" "}
            <code className="inline-code">height</code> on images, reserving
            space for dynamic content, and using{" "}
            <code className="inline-code">font-display: swap</code> with
            a size-matched fallback font.
          </p>
          <CodeBlock
            lang="html"
            code={`<!-- Preload the LCP image for fast first paint -->
<link rel="preload" as="image" href="/hero.avif"
  type="image/avif" fetchpriority="high" />

<!-- Always set dimensions to prevent CLS -->
<img src="/hero.avif" alt="Dashboard preview"
  width="1200" height="630"
  style="width:100%; height:auto;" />

<!-- Defer non-critical JS -->
<script src="/analytics.js" defer></script>`}
          />
        </>
      ),
    },
    {
      id: "structured-data",
      title: "Structured data",
      content: (
        <>
          <p>
            Structured data (JSON-LD) tells search engines exactly what your
            content is — an article, a product, a FAQ, a how-to guide — so they
            can display rich results. Rich results get higher click-through
            rates. Higher click-through rates mean more traffic. This is not
            optional.
          </p>
          <CodeBlock
            lang="html"
            code={`<!-- JSON-LD for an article page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Building Accessible Forms",
  "description": "A practical guide to semantic forms.",
  "author": {
    "@type": "Organization",
    "name": "BuildCraft"
  },
  "datePublished": "2026-03-15",
  "dateModified": "2026-03-28",
  "image": "/og/accessible-forms.png"
}
</script>`}
          />
          <p>
            Place JSON-LD in a{" "}
            <code className="inline-code">&lt;script type=&quot;application/ld+json&quot;&gt;</code>{" "}
            tag in the <code className="inline-code">&lt;head&gt;</code>. Use
            the most specific type available — TechArticle over Article,
            SoftwareApplication over Product. Validate with Google's Rich
            Results Test before shipping. Malformed JSON-LD is worse than none
            because it signals to Google that you don't know what you're doing.
          </p>
          <Principle number={3}>
            Structured data is how you talk directly to search engines in their
            own language. HTML is for humans and crawlers. JSON-LD is for the
            knowledge graph. Use both.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Every page has a unique, descriptive title under 60 characters",
    "Meta descriptions are written as compelling copy, under 155 characters",
    "Open Graph and Twitter Card meta tags are present with a custom image",
    "Heading hierarchy follows h1 → h2 → h3 without skipping levels",
    "LCP under 2.5s, INP under 200ms, CLS under 0.1 (measured, not guessed)",
    "JSON-LD structured data is present and validated with Rich Results Test",
  ],
};

/* ─── Guide 4: Content & Copy ─── */

const contentCopyGuide: GuideData = {
  sections: [
    {
      id: "writing-for-humans",
      title: "Writing for humans not machines",
      content: (
        <>
          <p>
            Most AI-generated copy reads like it was written by a thesaurus
            having a panic attack. You can spot it instantly: em dashes
            everywhere, hollow superlatives, sentences that say nothing while
            sounding important. Your users can spot it too. They just leave
            instead of telling you.
          </p>
          <p>
            Good interface copy is invisible. It gets people where they need to
            go without making them think about the words. Bad copy creates
            friction — and AI slop is the worst kind of bad copy because it
            <em>feels</em> polished while communicating nothing.
          </p>
          <Principle number={1}>
            If a sentence sounds like it could appear on any website in any
            industry, delete it. Specificity is the entire game.
          </Principle>
          <p>
            Write like you talk. Read your copy out loud. If you would never say
            &ldquo;leverage our cutting-edge solution to unlock unprecedented
            value&rdquo; to another human being, do not put it on a screen.
            The bar is: would a sharp, slightly impatient colleague say this?
          </p>
        </>
      ),
    },
    {
      id: "avoiding-ai-slop",
      title: "Avoiding AI slop patterns",
      content: (
        <>
          <p>
            There are at least 24 patterns that instantly mark text as
            AI-generated. Learn them. Avoid them. Here are the worst offenders:
          </p>
          <p>
            <strong>Em dash addiction.</strong> AI models love the em dash — they
            use it — constantly — as if commas and periods were deprecated. One
            em dash per paragraph maximum. Zero is usually better.
          </p>
          <p>
            <strong>Sycophantic openers.</strong> &ldquo;Great question!&rdquo;
            &ldquo;That&apos;s a fantastic point!&rdquo; &ldquo;Absolutely!&rdquo;
            Cut all of these. Just answer the question.
          </p>
          <p>
            <strong>Hollow filler.</strong> &ldquo;It&apos;s important to
            note&rdquo;, &ldquo;it&apos;s worth mentioning&rdquo;, &ldquo;at the
            end of the day&rdquo;, &ldquo;in today&apos;s fast-paced world&rdquo;.
            These are word count padding. Delete on sight.
          </p>
          <p>
            <strong>Promotional inflation.</strong> &ldquo;Revolutionary&rdquo;,
            &ldquo;game-changing&rdquo;, &ldquo;cutting-edge&rdquo;,
            &ldquo;next-level&rdquo;, &ldquo;best-in-class&rdquo;. Unless you
            literally invented a new category, these words are lies.
          </p>
          <DosDonts
            dont={{
              label: "AI slop that says nothing",
              lang: "text",
              code: `Welcome to our cutting-edge platform!
We're excited to help you unlock
unprecedented productivity. It's worth
noting that our revolutionary approach
leverages best-in-class technology.`,
            }}
            do={{
              label: "Direct copy that communicates",
              lang: "text",
              code: `Track your deployments in one place.
See what shipped, what broke, and
what's still in review — without
switching between six tabs.`,
            }}
          />
          <p>
            <strong>The &ldquo;delve&rdquo; family.</strong> Delve, dive into,
            unpack, explore, navigate. These verbs are AI comfort food. Replace
            them with what you actually mean: read, check, open, use, try.
          </p>
          <Principle number={2}>
            If you run your copy through an AI detector and it flags as
            machine-generated, rewrite it. Not because detectors are accurate,
            but because they catch the same laziness your readers catch.
          </Principle>
        </>
      ),
    },
    {
      id: "finding-your-voice",
      title: "Finding your voice",
      content: (
        <>
          <p>
            Voice is not a style guide document nobody reads. Voice is the
            pattern that emerges when you make the same writing choices
            consistently. It is the difference between a product that feels like
            it was made by people and one that feels generated.
          </p>
          <p>
            Define three adjectives that describe how your product should sound.
            Not aspirational nonsense like &ldquo;innovative&rdquo; — real
            constraints like &ldquo;blunt, warm, technical.&rdquo; Every piece
            of copy should pass the test: does this sound [blunt]? Does this
            sound [warm]? Does this sound [technical]? If it fails any of them,
            rewrite.
          </p>
          <CodeBlock
            lang="text"
            code={`Voice definition for BuildCraft:

1. Blunt — no hedging, no "maybe consider perhaps"
2. Warm — not robotic, we like the people reading this
3. Technical — we respect our audience's intelligence

Examples:
✗ "You might want to consider adding alt text"
✓ "Add alt text. Screen readers need it."

✗ "We're super excited to announce this feature!"
✓ "New: dark mode. Your eyes will thank you."`}
          />
          <p>
            Voice is a constraint, not a decoration. The more specific your
            constraints, the less your copy sounds like everyone else&apos;s.
            &ldquo;Friendly and professional&rdquo; describes every bank website
            on earth. It constrains nothing.
          </p>
        </>
      ),
    },
    {
      id: "microcopy-that-delights",
      title: "Microcopy that delights",
      content: (
        <>
          <p>
            Microcopy is the small text that does the heavy lifting: button
            labels, error messages, empty states, tooltips, placeholder text.
            It is where most products fall apart and where the best products
            distinguish themselves.
          </p>
          <p>
            <strong>Buttons:</strong> Label buttons with what they do, not
            generic actions. &ldquo;Save&rdquo; is fine. &ldquo;Save
            draft&rdquo; is better. &ldquo;Publish to production&rdquo; is best
            when that is what actually happens.
          </p>
          <p>
            <strong>Error messages:</strong> Tell people what went wrong AND what
            to do about it. &ldquo;An error occurred&rdquo; is useless.
            &ldquo;Your image is too large (max 5MB). Compress it or choose a
            smaller file.&rdquo; is actionable.
          </p>
          <p>
            <strong>Empty states:</strong> An empty state is a teaching moment,
            not a dead end. Show people what this screen will look like with
            data, and give them a single clear action to get started.
          </p>
          <CodeBlock
            lang="tsx"
            code={`// Empty state that teaches and guides
function EmptyProjects() {
  return (
    <div className="empty-state">
      <p className="empty-title">No projects yet</p>
      <p className="empty-desc">
        Projects hold your components, tokens, and
        documentation. Start with one — you can
        always reorganize later.
      </p>
      <button onClick={createProject}>
        Create your first project
      </button>
    </div>
  );
}`}
          />
          <Principle number={3}>
            Every string in your UI is a tiny conversation with a person who is
            trying to get something done. Respect their time. Help them
            succeed.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Run all UI copy through an AI slop check — no em dash chains, no hollow superlatives",
    "Button labels describe the specific action, not generic verbs like Submit or Click Here",
    "Error messages include both what went wrong and how to fix it",
    "Empty states provide context and a clear next action",
    "Voice is defined with 3 specific adjectives and applied consistently",
    "No placeholder Lorem Ipsum shipped to production",
  ],
};

/* ─── Guide 5: Performance ─── */

const performanceGuide: GuideData = {
  sections: [
    {
      id: "image-optimization",
      title: "Image optimization",
      content: (
        <>
          <p>
            Images are almost always the heaviest assets on a page. An
            unoptimized hero image can weigh more than your entire JavaScript
            bundle. This is the single highest-impact performance fix you can
            make, and it requires almost no effort.
          </p>
          <p>
            In Next.js, the{" "}
            <code className="inline-code">next/image</code> component handles
            the hard parts: format negotiation (AVIF → WebP → JPEG fallback),
            responsive srcsets, lazy loading by default, and blur-up placeholders.
            Use it for every image. No exceptions.
          </p>
          <CodeBlock
            lang="tsx"
            code={`import Image from "next/image";

// Always set width/height to prevent CLS
// next/image handles responsive sizing automatically
<Image
  src="/hero-dashboard.png"
  alt="Dashboard showing deployment status"
  width={1200}
  height={630}
  priority  // Only for above-the-fold images
  placeholder="blur"
  blurDataURL={shimmer(1200, 630)}
/>

// For background/decorative images
<Image
  src="/pattern.png"
  alt=""  // Empty alt for decorative images
  fill
  sizes="100vw"
  className="object-cover"
/>`}
          />
          <Principle number={1}>
            Every image should be right-sized, right-formatted, and lazy-loaded
            unless it is above the fold. This is not optimization — it is basic
            hygiene.
          </Principle>
          <p>
            For icons and simple graphics, use SVGs inlined as React components.
            For photos, use AVIF with WebP fallback. For anything above the
            fold, add <code className="inline-code">priority</code> to preload
            it. And always, always set explicit dimensions to prevent Cumulative
            Layout Shift.
          </p>
        </>
      ),
    },
    {
      id: "font-loading",
      title: "Font loading strategies",
      content: (
        <>
          <p>
            Custom fonts are the second most common performance killer after
            images. A single font family with four weights can add 400KB+ to
            your page. The wrong loading strategy causes Flash of Invisible Text
            (FOIT) or Flash of Unstyled Text (FOUT), both of which make your
            site feel broken.
          </p>
          <p>
            The rules are simple: use WOFF2 (it is 30% smaller than WOFF), subset
            your fonts to only the characters you need, and always set{" "}
            <code className="inline-code">font-display: swap</code> so text is
            visible immediately with a fallback font while the custom font loads.
          </p>
          <CodeBlock
            lang="css"
            code={`/* Preload critical fonts in <head> */
/* <link rel="preload" as="font" type="font/woff2"
    href="/fonts/Inter-Regular.woff2" crossorigin /> */

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;          /* Show text immediately */
  unicode-range: U+0000-00FF;  /* Latin subset only */
}

/* In Next.js, use next/font instead: */
/* import { Inter } from 'next/font/google';
   const inter = Inter({ subsets: ['latin'] }); */`}
          />
          <p>
            In Next.js, <code className="inline-code">next/font</code> handles
            all of this automatically — it downloads fonts at build time, subsets
            them, and inlines the CSS. It is the correct choice for any Next.js
            project. Self-hosting beats Google Fonts CDN because it eliminates
            the extra DNS lookup and connection.
          </p>
          <Principle number={2}>
            Two font families maximum. Three weights maximum per family. Every
            additional weight is a performance tax your users pay on every page
            load.
          </Principle>
        </>
      ),
    },
    {
      id: "lazy-loading",
      title: "Lazy loading done right",
      content: (
        <>
          <p>
            Lazy loading means deferring the load of non-critical resources
            until they are needed. The browser&apos;s native{" "}
            <code className="inline-code">loading=&quot;lazy&quot;</code>{" "}
            attribute handles images. For components and complex UI, you need
            IntersectionObserver.
          </p>
          <p>
            The key insight: lazy loading is not just about images. Heavy
            components like charts, maps, code editors, and comment sections
            should all load on demand. Next.js{" "}
            <code className="inline-code">dynamic()</code> with{" "}
            <code className="inline-code">ssr: false</code> is the simplest
            approach for client-only components.
          </p>
          <DosDonts
            dont={{
              label: "Loading everything upfront",
              lang: "tsx",
              code: `import Chart from "@/components/Chart";
import Map from "@/components/Map";
import Comments from "@/components/Comments";

// All 3 load on page load even if
// user never scrolls down to see them`,
            }}
            do={{
              label: "Lazy loading below-the-fold content",
              lang: "tsx",
              code: `import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("@/components/Chart"),
  { loading: () => <ChartSkeleton /> }
);
const Map = dynamic(
  () => import("@/components/Map"),
  { ssr: false }
);
// Components load when rendered`,
            }}
          />
          <p>
            For custom lazy loading with IntersectionObserver, the pattern is
            straightforward: observe a sentinel element, load the resource when
            it enters the viewport, unobserve immediately after. Do not use
            scroll event listeners — they are expensive and IntersectionObserver
            exists specifically to replace them.
          </p>
        </>
      ),
    },
    {
      id: "performance-budgets",
      title: "Performance budgets",
      content: (
        <>
          <p>
            A performance budget is a hard limit on metrics that matter:
            JavaScript bundle size, total page weight, Largest Contentful Paint,
            Interaction to Next Paint. Without a budget, performance degrades
            one innocent-looking PR at a time until your site is slow and nobody
            can point to when it happened.
          </p>
          <p>
            Set budgets in CI. Fail the build when they are exceeded. This is
            the only way budgets work — if exceeding them is painless, they will
            be exceeded. Good starting points: total JS under 200KB gzipped, LCP
            under 2.5s, INP under 200ms, CLS under 0.1.
          </p>
          <CodeBlock
            lang="json"
            code={`// Example budget config for bundlewatch
{
  "files": [
    {
      "path": ".next/static/chunks/main-*.js",
      "maxSize": "80KB"
    },
    {
      "path": ".next/static/chunks/pages/**/*.js",
      "maxSize": "120KB"
    },
    {
      "path": ".next/static/css/*.css",
      "maxSize": "30KB"
    }
  ],
  "ci": {
    "trackBranches": ["main"],
    "repoBranchBase": "main"
  }
}`}
          />
          <Principle number={3}>
            Performance is not a feature you add. It is a default you defend.
            Every dependency, every image, every animation is a withdrawal from
            your performance budget.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "All images use next/image with explicit width/height and appropriate format",
    "Above-the-fold images have priority flag; all others are lazy-loaded",
    "Fonts are WOFF2, subsetted, with font-display: swap (or using next/font)",
    "No more than 2 font families and 3 weights per family",
    "Heavy below-fold components use dynamic() or IntersectionObserver",
    "Performance budgets are set in CI and fail the build when exceeded",
  ],
};

/* ─── Guide 6: Architecture ─── */

const architectureGuide: GuideData = {
  sections: [
    {
      id: "file-structure",
      title: "File structure that scales",
      content: (
        <>
          <p>
            There are two common approaches to file structure: layer-based
            (grouping by technical role — components/, hooks/, utils/) and
            feature-based (grouping by domain — auth/, dashboard/, billing/).
            Layer-based is intuitive for small projects. Feature-based is the
            only one that scales.
          </p>
          <p>
            The problem with layer-based structure is that adding a single
            feature touches files across five directories. Related code is
            scattered. You open a PR and the diff spans the entire tree. As the
            project grows, the components/ folder becomes a dumping ground with
            200 files and no discoverability.
          </p>
          <DosDonts
            dont={{
              label: "Layer-based at scale — everything is far apart",
              lang: "text",
              code: `src/
  components/
    Button.tsx
    InvoiceTable.tsx
    UserAvatar.tsx
    ... (197 more)
  hooks/
    useInvoices.ts
    useAuth.ts
  utils/
    formatCurrency.ts`,
            }}
            do={{
              label: "Feature-based — related code lives together",
              lang: "text",
              code: `src/
  features/
    billing/
      InvoiceTable.tsx
      useInvoices.ts
      formatCurrency.ts
      billing.test.ts
    auth/
      LoginForm.tsx
      useAuth.ts
  shared/
    ui/Button.tsx
    ui/Avatar.tsx`,
            }}
          />
          <Principle number={1}>
            Code that changes together should live together. The file system
            should reflect your product&apos;s domain, not your framework&apos;s
            architecture.
          </Principle>
          <p>
            Keep a <code className="inline-code">shared/</code> directory for
            truly cross-cutting concerns: design system primitives, generic
            hooks, utility functions used by 3+ features. The rule of three
            applies — do not move something to shared until three features need
            it.
          </p>
        </>
      ),
    },
    {
      id: "component-boundaries",
      title: "Component boundaries",
      content: (
        <>
          <p>
            The question is never &ldquo;should I split this component?&rdquo;
            The question is &ldquo;does this component have one reason to
            change?&rdquo; If a component re-renders when the user types in a
            search box AND when new data arrives from the server AND when the
            window resizes, it has too many responsibilities.
          </p>
          <p>
            Split when: a component has multiple data sources, a section can be
            meaningfully named as a noun, the component file exceeds 200 lines,
            or you find yourself passing props through multiple levels just to
            reach a nested element.
          </p>
          <p>
            Do not split when: the &ldquo;components&rdquo; would only ever be
            used together, splitting creates prop-drilling that did not exist
            before, or the component is just long but has a single clear
            responsibility (like a form with 12 fields).
          </p>
          <CodeBlock
            lang="tsx"
            code={`// Before: one component doing everything
function Dashboard() {
  const user = useUser();
  const metrics = useMetrics();
  const notifications = useNotifications();
  // 300 lines of mixed concerns...
}

// After: clear boundaries, clear responsibilities
function Dashboard() {
  return (
    <DashboardShell>
      <MetricsSummary />     {/* owns its data */}
      <ActivityFeed />       {/* owns its data */}
      <NotificationPanel />  {/* owns its data */}
    </DashboardShell>
  );
}
// Each child fetches its own data
// Each can be tested, loaded, and error-handled independently`}
          />
        </>
      ),
    },
    {
      id: "when-to-stop-abstracting",
      title: "When to stop abstracting",
      content: (
        <>
          <p>
            The abstraction trap goes like this: you see two similar things, so
            you make them one thing with a parameter. Then a third case appears
            that is almost the same but slightly different, so you add another
            parameter. By the fifth case, your &ldquo;reusable&rdquo; component
            has 14 props, 8 conditional branches, and is harder to understand
            than the duplication it replaced.
          </p>
          <Principle number={2}>
            Duplication is far cheaper than the wrong abstraction. Three similar
            50-line components are easier to maintain than one 150-line component
            with six conditional paths.
          </Principle>
          <p>
            The rule: do not abstract until you have three concrete cases, and
            even then, only abstract the parts that are truly identical. If two
            components share 80% of their markup but differ in behavior, they
            are not the same component. They are two components that happen to
            look similar right now.
          </p>
          <p>
            When you feel the urge to create a{" "}
            <code className="inline-code">GenericDataTable</code> or a{" "}
            <code className="inline-code">FlexibleCard</code>, stop. Name it
            after what it does in your domain:{" "}
            <code className="inline-code">InvoiceTable</code>,{" "}
            <code className="inline-code">ProjectCard</code>. If you cannot
            name it without the word &ldquo;generic&rdquo; or
            &ldquo;flexible&rdquo;, you are abstracting too early.
          </p>
        </>
      ),
    },
    {
      id: "managing-state",
      title: "Managing state",
      content: (
        <>
          <p>
            State management in React is not one problem — it is four different
            problems that people keep trying to solve with one tool. Separate
            them and the right solution for each becomes obvious.
          </p>
          <p>
            <strong>Server state</strong> (data from APIs): Use React Query or
            SWR. They handle caching, revalidation, loading states, and error
            states. Do not put server data in Zustand or Context — that is
            reinventing a worse version of React Query.
          </p>
          <p>
            <strong>Client state</strong> (UI state like modals, filters,
            selections): Use <code className="inline-code">useState</code> when
            it is local to one component. Use Zustand when multiple unrelated
            components need the same state. Use Context only for
            dependency-injection patterns (themes, auth session) — not as a
            general state store.
          </p>
          <p>
            <strong>URL state</strong> (filters, pagination, search terms): Use
            the URL. That is what it is for.{" "}
            <code className="inline-code">useSearchParams</code> in Next.js. If
            state should survive a page refresh or be shareable via link, it
            belongs in the URL.
          </p>
          <p>
            <strong>Form state</strong>: Use React Hook Form or native form
            elements with server actions. Do not manage form state in a global
            store.
          </p>
          <Principle number={3}>
            The right state management tool depends on where the state lives,
            not on how complex it is. Match the tool to the state type, not to
            the project size.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Project uses feature-based file structure with a shared/ directory for cross-cutting concerns",
    "No component file exceeds 250 lines without a clear single responsibility",
    "Abstractions exist only when 3+ concrete use cases share truly identical logic",
    "Server state managed by React Query or SWR, not in global stores",
    "URL-persisted state (filters, pagination) lives in searchParams, not component state",
    "No prop drilling deeper than 2 levels — use composition or co-location instead",
  ],
};

/* ─── Guide 7: Testing ─── */

const testingGuide: GuideData = {
  sections: [
    {
      id: "what-to-test",
      title: "What to test",
      content: (
        <>
          <p>
            Not everything needs a test. Tests have a maintenance cost, and
            bad tests are worse than no tests — they give false confidence
            while slowing down every refactor. The goal is not 100% coverage.
            The goal is confidence that your software works as users expect.
          </p>
          <p>
            Test behavior, not implementation. A test that checks whether a
            function was called with the right arguments is fragile — it
            breaks when you refactor internals even though the behavior is
            unchanged. A test that checks whether the user sees the right
            output after an action is durable — it only breaks when something
            actually breaks.
          </p>
          <Principle number={1}>
            Write tests that fail when something is broken, not when something
            is refactored. The test should not care how the code works, only
            that it produces the correct result.
          </Principle>
          <p>
            Prioritize testing: critical user paths (sign up, checkout,
            publish), complex business logic (pricing calculations, permission
            checks), things that have broken before (regression tests), and
            edge cases you discovered during development. Skip testing: simple
            pass-through components, framework boilerplate, and CSS.
          </p>
        </>
      ),
    },
    {
      id: "unit-vs-integration-vs-e2e",
      title: "Unit vs integration vs E2E",
      content: (
        <>
          <p>
            The &ldquo;testing trophy&rdquo; (not pyramid) puts integration
            tests at the widest point. Integration tests give the best
            return on investment because they test real user flows through
            real code paths without the brittleness of E2E tests or the
            narrowness of unit tests.
          </p>
          <p>
            <strong>Unit tests</strong> for pure logic: utility functions,
            calculations, data transformations. Fast, focused, no DOM needed.
            Use Vitest.
          </p>
          <p>
            <strong>Integration tests</strong> for user flows: render a
            component, simulate user interactions, verify the result. Use
            Testing Library. These are your bread and butter — they catch
            the most real bugs per line of test code.
          </p>
          <p>
            <strong>E2E tests</strong> for critical paths: the full sign-up
            flow, the checkout process, the deploy pipeline. Use Playwright.
            Keep these few and focused — they are slow and flaky by nature.
            Reserve them for paths where a failure means lost revenue or data.
          </p>
          <DosDonts
            dont={{
              label: "Testing implementation details",
              lang: "tsx",
              code: `// Brittle: tests internals
test("calls setCount with prev + 1", () => {
  const setState = vi.fn();
  vi.spyOn(React, "useState")
    .mockReturnValue([0, setState]);

  fireEvent.click(button);
  expect(setState)
    .toHaveBeenCalledWith(expect.any(Function));
});`,
            }}
            do={{
              label: "Testing user-visible behavior",
              lang: "tsx",
              code: `// Durable: tests what the user sees
test("increments counter on click", () => {
  render(<Counter />);

  expect(screen.getByText("Count: 0"))
    .toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: /increment/i })
  );
  expect(screen.getByText("Count: 1"))
    .toBeInTheDocument();
});`,
            }}
          />
        </>
      ),
    },
    {
      id: "meaningful-tests",
      title: "Writing meaningful tests",
      content: (
        <>
          <p>
            A meaningful test has three qualities: a descriptive name that reads
            like a specification, a clear arrange-act-assert structure, and it
            tests one behavior per test. If a test name starts with
            &ldquo;should&rdquo; and you cannot finish the sentence with
            something specific, the test is probably too vague.
          </p>
          <CodeBlock
            lang="tsx"
            code={`// Bad: vague name, unclear intent
test("works correctly", () => { ... });
test("should handle edge cases", () => { ... });

// Good: reads like a spec
test("displays error when email format is invalid", () => {
  render(<SignupForm />);

  const email = screen.getByLabelText(/email/i);
  await userEvent.type(email, "not-an-email");
  await userEvent.tab(); // trigger blur validation

  expect(
    screen.getByText(/enter a valid email address/i)
  ).toBeInTheDocument();
});

test("disables submit button while request is in flight", () => {
  // Arrange: render form with mocked slow endpoint
  // Act: fill form, click submit
  // Assert: button is disabled, shows loading state
});`}
          />
          <Principle number={2}>
            Your test names are your specification. If someone deleted all your
            source code, could they rebuild the feature by reading only the test
            names? That is the bar.
          </Principle>
          <p>
            Avoid test helpers that hide what the test is doing. A 10-line test
            you can read top-to-bottom is better than a 3-line test that calls{" "}
            <code className="inline-code">setupTestEnvironment()</code> which
            does 47 things you cannot see. Tests are documentation — optimize
            for readability, not DRY.
          </p>
        </>
      ),
    },
    {
      id: "visual-regression",
      title: "expect.dev integration",
      content: (
        <>
          <p>
            Visual regression testing catches the bugs that unit and integration
            tests miss: a padding change that breaks a layout, a color that
            lost contrast after a theme update, a z-index collision that hides a
            dropdown. These bugs are invisible to logic-based tests and
            extremely visible to users.
          </p>
          <p>
            expect.dev (and similar tools like Chromatic or Percy) take
            screenshots of your components in various states and diff them
            against approved baselines. When something changes visually, you
            get a clear before/after comparison to approve or reject.
          </p>
          <CodeBlock
            lang="tsx"
            code={`// Visual regression test with expect.dev
import { test, expect } from "@playwright/test";

test("invoice table matches baseline", async ({ page }) => {
  await page.goto("/billing/invoices");

  // Wait for data to load
  await page.waitForSelector("[data-testid='invoice-row']");

  // Full page snapshot
  await expect(page).toHaveScreenshot("invoices-full.png", {
    maxDiffPixelRatio: 0.01,
  });

  // Component-level snapshot
  const table = page.locator("[data-testid='invoice-table']");
  await expect(table).toHaveScreenshot("invoice-table.png");
});`}
          />
          <p>
            Run visual regression tests in CI on every PR. Store baselines in
            the repo. When a visual change is intentional, update the baselines
            in the same PR so reviewers can see exactly what changed and why.
            Treat visual diffs with the same rigor as code diffs.
          </p>
          <Principle number={3}>
            If your users see it, test it visually. Logic tests verify that code
            works. Visual tests verify that the result looks right. You need
            both.
          </Principle>
        </>
      ),
    },
  ],
  checklist: [
    "Critical user paths (auth, checkout, data mutations) have integration tests",
    "Tests verify user-visible behavior, not implementation details",
    "Test names read as specifications — descriptive and specific",
    "Integration tests form the bulk of the test suite (testing trophy shape)",
    "Visual regression tests run in CI for core UI components",
    "No mocked modules unless absolutely necessary — prefer real implementations",
  ],
};

const guideDataMap: Record<string, GuideData> = {
  accessibility: accessibilityGuide,
  "design-typography": designTypographyGuide,
  color: colorGuide,
  seo: seoGuide,
  "content-copy": contentCopyGuide,
  performance: performanceGuide,
  architecture: architectureGuide,
  testing: testingGuide,
};

const defaultGuideData: GuideData = {
  sections: [
    {
      id: "coming-soon",
      title: "Coming soon",
      content: (
        <p>
          This guide is currently being written. Check back soon for the full
          content.
        </p>
      ),
    },
  ],
  checklist: [],
};

/* ─── Sub-components ─── */

function Principle({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="principle">
      <span className="principle-number">Principle {number}</span>
      <p className="principle-text">{children}</p>
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{lang}</span>
        <button className="code-copy" onClick={copy} aria-label="Copy code">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DosDonts({
  dont,
  do: doItem,
}: {
  dont: { label: string; code: string; lang: string };
  do: { label: string; code: string; lang: string };
}) {
  return (
    <div className="dos-donts">
      <div className="dos-donts-col dos-donts--dont">
        <span className="dos-donts-label dos-donts-label--dont">Don&apos;t</span>
        <p className="dos-donts-desc">{dont.label}</p>
        <pre>
          <code>{dont.code}</code>
        </pre>
      </div>
      <div className="dos-donts-col dos-donts--do">
        <span className="dos-donts-label dos-donts-label--do">Do</span>
        <p className="dos-donts-desc">{doItem.label}</p>
        <pre>
          <code>{doItem.code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ─── Checklist ─── */

function Checklist({
  items,
  guideSlug,
}: {
  items: string[];
  guideSlug: string;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return items.map(() => false);
    try {
      const stored = localStorage.getItem(`bc-checklist-${guideSlug}`);
      if (stored) {
        const parsed = JSON.parse(stored) as boolean[];
        if (parsed.length === items.length) return parsed;
      }
    } catch {
      /* ignore */
    }
    return items.map(() => false);
  });

  useEffect(() => {
    localStorage.setItem(`bc-checklist-${guideSlug}`, JSON.stringify(checked));
  }, [checked, guideSlug]);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));

  const completed = checked.filter(Boolean).length;
  const pct = items.length > 0 ? (completed / items.length) * 100 : 0;

  return (
    <div className="checklist">
      <h3 className="checklist-title">Checklist</h3>
      <div className="checklist-progress-track">
        <div
          className="checklist-progress-bar"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="checklist-count">
        {completed} of {items.length} complete
      </p>
      <ul className="checklist-items">
        {items.map((item, i) => (
          <li key={i} className="checklist-item">
            <label className="checklist-label">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="checklist-checkbox"
              />
              <span className={checked[i] ? "checklist-text--done" : ""}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Difficulty color helper ─── */
const difficultyColor: Record<Guide["difficulty"], string> = {
  Beginner: "#5B8C5A",
  Intermediate: "var(--text-muted)",
  Advanced: "var(--accent)",
};

/* ─── Main component ─── */

export default function GuideContent({
  guide,
  prev,
  next,
}: {
  guide: Guide;
  prev: Guide | null;
  next: Guide | null;
}) {
  const guideData = guideDataMap[guide.slug] ?? defaultGuideData;
  const [activeSection, setActiveSection] = useState<string>(
    guideData.sections[0]?.id ?? ""
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* IntersectionObserver for ToC */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [guideData.sections]);

  const registerRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el);
      else sectionRefs.current.delete(id);
    },
    []
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  /* Track hydration so sections are visible immediately on the server/first
     paint and only animate on the client after mount. This prevents the
     whileInView observer from leaving off-screen sections stuck at opacity 0. */
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <main>
      {/* ─── NAV ─── */}
      <nav className="site-nav">
        <Link href="/" className="nav-wordmark">
          BUILDCRAFT
        </Link>
        <span className="nav-issue">Issue 001</span>
      </nav>

      {/* ─── BREADCRUMB ─── */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-sep">/</span>
        <span>{guide.title}</span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="guide-header">
        <span className="guide-header-number">Guide {guide.number}</span>
        <h1 className="guide-header-title">{guide.title}</h1>
        <p className="guide-header-desc">{guide.description}</p>
        <div className="guide-header-meta">
          <span className="guide-header-time">{guide.readTime}</span>
          <span
            className="guide-header-difficulty"
            style={{ color: difficultyColor[guide.difficulty] }}
          >
            {guide.difficulty}
          </span>
        </div>
      </header>
      <div className="guide-rule" />

      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div className="guide-layout">
        {/* ToC Sidebar */}
        <aside className="toc">
          <p className="toc-title">Contents</p>
          <ul className="toc-list">
            {guideData.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`toc-link ${activeSection === s.id ? "toc-link--active" : ""}`}
                >
                  {s.title}
                </a>
              </li>
            ))}
            {guideData.checklist.length > 0 && (
              <li>
                <a
                  href="#checklist"
                  className={`toc-link ${activeSection === "checklist" ? "toc-link--active" : ""}`}
                >
                  Checklist
                </a>
              </li>
            )}
          </ul>
        </aside>

        {/* Main content */}
        <article className="guide-article">
          {guideData.sections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              ref={registerRef(section.id)}
              className="guide-section"
              variants={sectionVariants}
              initial={hydrated ? "hidden" : "visible"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i === 0 ? 0 : 0.1 }}
            >
              <h2 className="section-heading">{section.title}</h2>
              <div className="section-body">{section.content}</div>
            </motion.section>
          ))}

          {/* Checklist */}
          {guideData.checklist.length > 0 && (
            <motion.section
              id="checklist"
              ref={registerRef("checklist")}
              className="guide-section"
              variants={sectionVariants}
              initial={hydrated ? "hidden" : "visible"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Checklist
                items={guideData.checklist}
                guideSlug={guide.slug}
              />
            </motion.section>
          )}

          {/* Prev/Next nav */}
          <nav className="guide-pn">
            {prev ? (
              <Link href={`/guides/${prev.slug}`} className="guide-pn-link">
                <span className="guide-pn-label">← Previous</span>
                <span className="guide-pn-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/guides/${next.slug}`}
                className="guide-pn-link guide-pn-link--next"
              >
                <span className="guide-pn-label">Next →</span>
                <span className="guide-pn-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>

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
            /* ─── Shared layout ─── */
            .site-nav,
            .breadcrumb,
            .guide-header,
            .guide-rule,
            .guide-layout,
            .site-footer {
              padding-left: max(24px, calc((100vw - 1080px) / 2));
              padding-right: max(24px, calc((100vw - 1080px) / 2));
            }

            /* ─── Nav ─── */
            .site-nav {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 24px;
              padding-bottom: 0;
            }
            .nav-wordmark {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.12em;
              color: var(--text);
              text-decoration: none;
            }
            .nav-wordmark:hover {
              color: var(--accent);
            }
            .nav-issue {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: var(--text-muted);
            }

            /* ─── Breadcrumb ─── */
            .breadcrumb {
              margin-top: 24px;
              margin-bottom: 48px;
              font-family: var(--font-body);
              font-size: 13px;
              color: var(--text-faint);
            }
            .breadcrumb-link {
              color: var(--text-faint);
              text-decoration: none;
            }
            .breadcrumb-link:hover {
              color: var(--accent);
            }
            .breadcrumb-sep {
              margin: 0 8px;
            }

            /* ─── Guide Header ─── */
            .guide-header {
              padding-top: 0;
              padding-bottom: 0;
            }
            .guide-header-number {
              font-family: var(--font-body);
              font-size: 13px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--accent);
            }
            .guide-header-title {
              font-family: var(--font-display);
              font-size: clamp(36px, 5vw, 56px);
              font-weight: 500;
              line-height: 1.1;
              letter-spacing: -0.02em;
              color: var(--text);
              margin-top: 12px;
            }
            .guide-header-desc {
              font-family: var(--font-body);
              font-size: 18px;
              line-height: 1.6;
              color: var(--text-muted);
              margin-top: 16px;
              max-width: 60ch;
            }
            .guide-header-meta {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-top: 20px;
            }
            .guide-header-time {
              font-family: var(--font-body);
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
            }
            .guide-header-difficulty {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            /* ─── Rule ─── */
            .guide-rule {
              height: 1px;
              background: var(--border);
              margin: 48px 0;
            }
            .section-rule {
              height: 1px;
              background: var(--border);
            }

            /* ─── Two-column layout ─── */
            .guide-layout {
              display: flex;
              gap: 80px;
              padding-bottom: 80px;
            }

            /* ─── ToC Sidebar ─── */
            .toc {
              width: 200px;
              flex-shrink: 0;
              position: sticky;
              top: 100px;
              align-self: flex-start;
            }
            .toc-title {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
              margin-bottom: 16px;
            }
            .toc-list {
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .toc-link {
              font-family: var(--font-body);
              font-size: 14px;
              color: var(--text-muted);
              text-decoration: none;
              padding-left: 12px;
              border-left: 2px solid transparent;
              display: block;
              transition: color 0.2s ease, border-color 0.2s ease;
            }
            .toc-link:hover {
              color: var(--text);
            }
            .toc-link--active {
              color: var(--text);
              border-left-color: var(--accent);
            }

            /* ─── Article ─── */
            .guide-article {
              max-width: 680px;
              min-width: 0;
              flex: 1;
            }

            /* ─── Section ─── */
            .guide-section:first-child .section-heading {
              margin-top: 0;
            }
            .section-heading {
              font-family: var(--font-display);
              font-size: 32px;
              font-weight: 500;
              color: var(--text);
              margin-top: 64px;
              margin-bottom: 24px;
              letter-spacing: -0.01em;
            }
            .section-body p {
              font-family: var(--font-body);
              font-size: 17px;
              line-height: 1.7;
              color: var(--text);
              margin-bottom: 24px;
              max-width: 65ch;
            }
            .inline-code {
              font-family: var(--font-mono);
              font-size: 0.9em;
              background: var(--code-bg);
              padding: 2px 6px;
              border-radius: 4px;
            }

            /* ─── Principle ─── */
            .principle {
              border-left: 2px solid var(--accent);
              padding-left: 24px;
              margin: 40px 0;
            }
            .principle-number {
              font-family: var(--font-body);
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--accent);
            }
            .principle-text {
              font-family: var(--font-display);
              font-size: 20px;
              font-weight: 500;
              line-height: 1.5;
              color: var(--text);
              margin-top: 8px;
            }

            /* ─── Code block ─── */
            .code-block {
              background: var(--code-bg);
              border-radius: 8px;
              margin: 32px 0;
              overflow: hidden;
            }
            .code-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 12px 24px 0;
            }
            .code-lang {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
            }
            .code-copy {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: var(--text-faint);
              background: none;
              border: none;
              cursor: pointer;
              padding: 4px 8px;
              border-radius: 4px;
              transition: color 0.2s ease, background 0.2s ease;
            }
            .code-copy:hover {
              color: var(--text);
              background: rgba(0,0,0,0.05);
            }
            .code-block pre {
              padding: 16px 24px 24px;
              margin: 0;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
            .code-block code {
              font-family: var(--font-mono);
              font-size: 14px;
              line-height: 1.6;
              color: #1A1A1A;
            }

            /* ─── Do/Don't ─── */
            .dos-donts {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin: 40px 0;
            }
            .dos-donts-col {
              border: 1px solid var(--border);
              border-radius: 8px;
              overflow: hidden;
            }
            .dos-donts--dont {
              background: rgba(196, 85, 58, 0.04);
            }
            .dos-donts--do {
              background: rgba(91, 140, 90, 0.04);
            }
            .dos-donts-label {
              display: block;
              font-family: var(--font-body);
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              padding: 12px 16px 0;
            }
            .dos-donts-label--dont {
              color: #C4553A;
            }
            .dos-donts-label--do {
              color: #5B8C5A;
            }
            .dos-donts-desc {
              font-family: var(--font-body);
              font-size: 13px;
              color: var(--text-muted);
              padding: 4px 16px 0;
            }
            .dos-donts-col pre {
              padding: 12px 16px 16px;
              margin: 0;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
            .dos-donts-col code {
              font-family: var(--font-mono);
              font-size: 13px;
              line-height: 1.5;
              color: #1A1A1A;
            }

            /* ─── Checklist ─── */
            .checklist {
              margin-top: 64px;
            }
            .checklist-title {
              font-family: var(--font-display);
              font-size: 24px;
              font-weight: 500;
              color: var(--text);
              margin-bottom: 20px;
            }
            .checklist-progress-track {
              height: 3px;
              background: var(--border);
              border-radius: 2px;
              overflow: hidden;
              margin-bottom: 8px;
            }
            .checklist-progress-bar {
              height: 100%;
              background: var(--accent);
              border-radius: 2px;
              transition: width 0.3s ease;
            }
            .checklist-count {
              font-family: var(--font-body);
              font-size: 12px;
              color: var(--text-faint);
              margin-bottom: 20px;
            }
            .checklist-items {
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .checklist-item {
              margin: 0;
            }
            .checklist-label {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              cursor: pointer;
              font-family: var(--font-body);
              font-size: 15px;
              line-height: 1.5;
              color: var(--text);
            }
            .checklist-checkbox {
              appearance: none;
              -webkit-appearance: none;
              width: 18px;
              height: 18px;
              min-width: 18px;
              border: 1.5px solid var(--border-strong);
              border-radius: 3px;
              background: transparent;
              cursor: pointer;
              margin-top: 3px;
              flex-shrink: 0;
              position: relative;
              transition: background 0.15s ease, border-color 0.15s ease;
            }
            .checklist-checkbox:checked {
              background: var(--accent);
              border-color: var(--accent);
            }
            .checklist-checkbox:checked::before {
              content: '';
              position: absolute;
              top: 2px;
              left: 5px;
              width: 5px;
              height: 9px;
              border: solid #fff;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
            .checklist-text--done {
              text-decoration: line-through;
              color: var(--text-faint);
            }

            /* ─── Prev/Next ─── */
            .guide-pn {
              display: flex;
              justify-content: space-between;
              gap: 24px;
              margin-top: 80px;
              padding-top: 48px;
              border-top: 1px solid var(--border);
            }
            .guide-pn-link {
              display: flex;
              flex-direction: column;
              gap: 6px;
              text-decoration: none;
              min-width: 0;
            }
            .guide-pn-link--next {
              text-align: right;
              margin-left: auto;
            }
            .guide-pn-label {
              font-family: var(--font-body);
              font-size: 11px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: var(--text-faint);
            }
            .guide-pn-title {
              font-family: var(--font-display);
              font-size: 20px;
              font-weight: 500;
              color: var(--text);
              transition: color 0.2s ease;
            }
            .guide-pn-link:hover .guide-pn-title {
              color: var(--accent);
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

            /* ─── Mobile ─── */
            @media (max-width: 899px) {
              .toc {
                display: none;
              }
              .guide-layout {
                gap: 0;
              }
              .dos-donts {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 767px) {
              .site-nav,
              .breadcrumb,
              .guide-header,
              .guide-rule,
              .guide-layout,
              .site-footer {
                padding-left: 24px;
                padding-right: 24px;
              }
              .guide-header-title {
                font-size: clamp(28px, 7vw, 42px);
              }
              .guide-pn {
                flex-direction: column;
              }
              .guide-pn-link--next {
                text-align: left;
                margin-left: 0;
              }
            }
          `,
        }}
      />
    </main>
  );
}
