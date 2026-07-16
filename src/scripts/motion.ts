/* ============================================================
   NextBridge IT — motion choreography
   The scene is lit by default; JS only adds the performance.
   Reduced motion: no Lenis, no choreography, everything visible.
   ============================================================ */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    // Static scene: light every station, show the pulse resting at the arch peak.
    document.querySelectorAll('[data-step]').forEach((s) => s.classList.add('lit'));
    const fill = document.querySelector<HTMLElement>('[data-rail-fill]');
    if (fill) fill.style.transform = 'scaleY(1)';
    anchorFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  /* ---- Smooth scroll ---- */
  const lenis = new Lenis({ duration: 1.05 });
  document.documentElement.classList.add('has-lenis');
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 });
    });
  });

  /* ---- Hero: draw the span, send the first signal ---- */
  const arch = document.querySelector<SVGPathElement>('#arch-path');
  const pulse = document.querySelector<SVGCircleElement>('.pulse');

  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

  intro
    .from('.hero-title .line-inner', {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.09,
    })
    .from('.hero-lead', { opacity: 0, y: 18, duration: 0.7 }, '-=0.45')
    .from('.hero-actions', { opacity: 0, y: 14, duration: 0.6 }, '-=0.45')
    .from('.hero-readout', { opacity: 0, duration: 0.8 }, '-=0.3');

  if (arch) {
    const len = arch.getTotalLength();
    gsap.set(arch, { strokeDasharray: len, strokeDashoffset: len });
    intro.to(arch, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      onComplete: () => gsap.set(arch, { strokeDasharray: 'none' }),
    }, 0.15);
    intro.from('.hanger', {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 0.5,
      stagger: { each: 0.035, from: 'center' },
      ease: 'power3.out',
    }, 0.9);
    intro.from('.foot', { scale: 0, transformOrigin: 'center', duration: 0.4 }, 1.2);
  }

  if (arch && pulse) {
    // The traveling signal: crosses the span, rests, crosses again.
    gsap.timeline({ repeat: -1, delay: 2.2, repeatDelay: 2.4 })
      .set(pulse, { opacity: 1 })
      .to(pulse, {
        motionPath: { path: arch, align: arch, alignOrigin: [0.5, 0.5] },
        duration: 4.2,
        ease: 'power1.inOut',
      })
      .to(pulse, { opacity: 0, duration: 0.4 }, '-=0.4');
  }

  /* ---- Services: each beam assembles as it reaches the viewport ----
     The line draws in like the hero arch, then the load settles on it:
     name → outcome → body → points. */
  document.querySelectorAll<HTMLElement>('.services .svc').forEach((beam) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: beam, start: 'top 81%', toggleActions: 'play none none reverse' },
      defaults: { ease: 'power4.out' },
    });

    tl.from(beam.querySelector('.svc-line'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power2.inOut',
      }, 0)
      .from(beam.querySelector('.svc-name'), { opacity: 0, y: 30, duration: 0.7 }, 0.12)
      .from(beam.querySelector('.svc-outcome'), { opacity: 0, y: 16, duration: 0.6 }, 0.3)
      .from(beam.querySelector('.svc-body'), { opacity: 0, y: 18, duration: 0.6 }, 0.4)
      .from(beam.querySelectorAll('.svc-points li'), {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
      }, 0.52);
  });

  /* ---- Approach: the signal crosses the winding span ----
     Desktop: the S-path draws with scroll, the head travels it and lights
     each station as it arrives. Mobile: the straight rail fills instead. */
  const mm = gsap.matchMedia();

  mm.add('(min-width: 861px)', () => {
    const scene = document.querySelector<SVGSVGElement>('.crossing-scene');
    const draw = document.querySelector<SVGPathElement>('[data-cross-draw]');
    const head = document.querySelector<HTMLElement>('[data-cross-head]');
    const steps = Array.from(document.querySelectorAll('.approach [data-step]'));
    if (!scene || !draw || !head) return;

    const vb = scene.viewBox.baseVal;
    const len = draw.getTotalLength();

    // arc-length position of each station along the span
    const pts: { x: number; y: number }[] = JSON.parse(scene.dataset.stations || '[]');
    const stations = pts.map((pt) => {
      let best = 0;
      let bestD = Infinity;
      const samples = 480;
      for (let s = 0; s <= samples; s++) {
        const l = (s / samples) * len;
        const q = draw.getPointAtLength(l);
        const dd = (q.x - pt.x) ** 2 + (q.y - pt.y) ** 2;
        if (dd < bestD) { bestD = dd; best = l; }
      }
      return best;
    });

    gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });

    // scene size cached so the scrub writes transform only (no per-frame layout)
    let sceneW = 0;
    let sceneH = 0;
    const measure = () => {
      const r = scene.getBoundingClientRect();
      sceneW = r.width;
      sceneH = r.height;
    };
    measure();

    gsap.to(draw, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.crossing',
        start: 'top 72%',
        end: 'bottom 62%',
        scrub: 0.6,
        onRefresh: measure,
        onUpdate: (self) => {
          const drawn = len * self.progress;
          const p = draw.getPointAtLength(drawn);
          head.style.transform = `translate(${(p.x / vb.width) * sceneW}px, ${(p.y / vb.height) * sceneH}px)`;
          head.style.opacity = self.progress > 0.004 && self.progress < 0.996 ? '1' : '0';
          steps.forEach((s, i) => s.classList.toggle('lit', drawn >= stations[i] - 0.5));
        },
      },
    });
  });

  mm.add('(max-width: 860px)', () => {
    const railFill = document.querySelector('[data-rail-fill]');
    if (railFill) {
      gsap.to(railFill, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.crossing',
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
    }

    document.querySelectorAll('.approach [data-step]').forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        onEnter: () => step.classList.add('lit'),
        onLeaveBack: () => step.classList.remove('lit'),
      });
    });
  });

  /* ---- About: routes draw outward from Belgrade ---- */
  document.querySelectorAll<SVGPathElement>('.route').forEach((route, i) => {
    const len = route.getTotalLength();
    gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(route, {
      strokeDashoffset: 0,
      duration: 1.4,
      delay: i * 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.routes', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  });

  gsap.from('.route-end', {
    scale: 0,
    transformOrigin: 'center',
    duration: 0.4,
    stagger: 0.15,
    delay: 1.1,
    scrollTrigger: { trigger: '.routes', start: 'top 80%', toggleActions: 'play none none reverse' },
  });

  /* ---- About: the promise types itself in ---- */
  const quote = document.querySelector<HTMLElement>('.about-quote');
  if (quote) {
    // Screen readers get the sentence whole as real (visually hidden) text;
    // the animated char spans are aria-hidden presentation.
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = quote.innerText.replace(/\s+/g, ' ').trim();

    const chars: HTMLElement[] = [];
    Array.from(quote.childNodes).forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent ?? '') {
        const span = document.createElement('span');
        span.textContent = ch;
        span.setAttribute('aria-hidden', 'true');
        frag.appendChild(span);
        chars.push(span);
      }
      quote.replaceChild(frag, node);
    });

    quote.prepend(srText);

    const caret = document.createElement('span');
    caret.className = 'quote-caret';
    caret.setAttribute('aria-hidden', 'true');
    quote.appendChild(caret);

    gsap.set(chars, { opacity: 0 });

    const placeCaret = (i: number) => {
      const el = chars[Math.max(0, Math.min(i, chars.length - 1))];
      caret.style.height = `${el.offsetHeight}px`;
      caret.style.transform = `translate(${el.offsetLeft + el.offsetWidth}px, ${el.offsetTop}px)`;
    };

    // type → rest with a blinking caret → erase backwards → breathe → again
    const typeLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 });
    typeLoop
      .call(() => {
        caret.classList.remove('idle');
        caret.style.visibility = 'visible';
      })
      .to(chars, {
        opacity: 1,
        duration: 0.001,
        ease: 'none',
        stagger: 0.028,
        onUpdate() {
          placeCaret(Math.floor(this.progress() * (chars.length - 1)));
        },
      })
      .call(() => caret.classList.add('idle'))
      .to({}, { duration: 2.8 })
      .call(() => caret.classList.remove('idle'))
      .to(chars, {
        opacity: 0,
        duration: 0.001,
        ease: 'none',
        stagger: { each: 0.012, from: 'end' },
        onUpdate() {
          placeCaret(Math.floor((1 - this.progress()) * (chars.length - 1)));
        },
      })
      .call(() => caret.classList.add('idle'));

    ScrollTrigger.create({
      trigger: quote,
      start: 'top 85%',
      end: 'bottom top',
      onEnter: () => typeLoop.play(),
      onEnterBack: () => typeLoop.play(),
      onLeave: () => typeLoop.pause(),
      onLeaveBack: () => {
        // off-screen below the fold: reset so the next visit types afresh
        typeLoop.pause().totalTime(0, true);
        caret.style.visibility = 'hidden';
      },
    });
  }

  /* ---- Contact: the circuit hums awake ---- */
  gsap.from('.contact .field', {
    scrollTrigger: { trigger: '.contact-grid', start: 'top 78%', toggleActions: 'play none none reverse' },
    opacity: 0,
    y: 22,
    duration: 0.6,
    stagger: 0.09,
    ease: 'power4.out',
  });
}

/* Native smooth anchors when Lenis is off */
function anchorFallback() {
  // scroll-behavior: smooth in CSS handles it; nothing to do.
}
