import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      const length = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.width = `${length > 0 ? Math.min(100, (window.scrollY / length) * 100) : 0}%`;
      frame = 0;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true" ref={progressRef} />
  );
}
