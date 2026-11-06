import { useEffect } from "react";

const revealTargets = [
  ".hero-top",
  ".hero-heading",
  ".curiosity-object",
  ".hero-bottom",
  ".hero-foot",
  ".section-kicker",
  ".opening h2",
  ".opening-copy > p",
  ".section-title",
  ".project-featured .project-art",
  ".project-featured .project-info",
  ".project-pair > article",
  ".about-statement",
  ".about-details",
  ".off-duty-heading",
  ".fun-fact",
  ".future-note",
  ".inventory-heading",
  ".chest-layout > .item-inspector",
  ".contact-pre",
  "#contact-title",
  ".contact-action",
  "footer",
].join(",");

const driftTargets = [
  [".hero h1", -30, 0],
  [".orb-frame", 42, 0],
  [".big-asterisk", 0, 55],
  [".agent-diagram", 22, 4],
  [".trip-map", -24, 0],
  [".answer-sheet", 12, -3],
  [".profile-note", -20, 3],
  [".quest-star", 0, 70],
];

export default function useScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function setup() {
      if (motion.matches || !("IntersectionObserver" in window))
        return () => {};
      const elements = [...root.querySelectorAll(revealTargets)];
      const drifters = driftTargets.flatMap(([selector, distance, rotation]) =>
        [...root.querySelectorAll(selector)].map((element) => ({
          element,
          distance,
          rotation,
        })),
      );
      let frame = 0;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -25px 0px" },
      );

      elements.forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.style.setProperty("--reveal-delay", `${(index % 3) * 85}ms`);
        if (
          element.matches(
            ".about-details, .contact-action, .project-pair > article:last-child",
          )
        ) {
          element.classList.add("motion-from-right");
        } else if (element.matches(".about-statement")) {
          element.classList.add("motion-from-left");
        }
        observer.observe(element);
      });
      drifters.forEach(({ element }) => element.classList.add("scroll-drift"));

      function update() {
        frame = 0;
        const height = window.innerHeight;
        const amount = window.innerWidth < 761 ? 0.5 : 1;
        drifters.forEach(({ element, distance, rotation }) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -150 || rect.top > height + 150) return;
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (height / 2 - rect.top - rect.height / 2) /
                (height / 2 + rect.height / 2),
            ),
          );
          element.style.setProperty(
            "--drift-y",
            `${(progress * distance * amount).toFixed(2)}px`,
          );
          element.style.setProperty(
            "--drift-rotation",
            `${(progress * rotation * amount).toFixed(2)}deg`,
          );
        });
      }
      function onScroll() {
        if (!frame) frame = requestAnimationFrame(update);
      }
      function onFocus(event) {
        const target = event.target.closest(".motion-reveal");
        if (target) {
          target.classList.add("is-revealed");
          observer.unobserve(target);
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      root.addEventListener("focusin", onFocus);
      onScroll();
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        root.removeEventListener("focusin", onFocus);
        elements.forEach((element) => {
          element.classList.remove(
            "motion-reveal",
            "is-revealed",
            "motion-from-right",
            "motion-from-left",
          );
          element.style.removeProperty("--reveal-delay");
        });
        drifters.forEach(({ element }) => {
          element.classList.remove("scroll-drift");
          element.style.removeProperty("--drift-y");
          element.style.removeProperty("--drift-rotation");
        });
      };
    }
    let teardown = setup();
    function onMotionChange() {
      teardown();
      teardown = setup();
    }
    motion.addEventListener("change", onMotionChange);
    return () => {
      teardown();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [rootRef]);
}
