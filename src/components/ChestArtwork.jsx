import { useId } from "react";

const mix = (from, to, progress) => from + (to - from) * progress;
const points = (closed, opened, progress) =>
  closed
    .map(
      ([x, y], i) =>
        `${mix(x, opened[i][0], progress)},${mix(y, opened[i][1], progress)}`,
    )
    .join(" ");

// Real geometry, rather than crossfading two pictures: every lid corner moves
// with the scroll position, and the latch travels with its front edge.
export default function ChestArtwork({ progress }) {
  const id = useId().replaceAll(":", "");
  const wood = `${id}-wood`;
  const lid = points(
    [
      [64, 220],
      [616, 200],
      [616, 280],
      [64, 300],
    ],
    [
      [48, 28],
      [580, 8],
      [568, 240],
      [20, 260],
    ],
    progress,
  );
  const top = points(
    [
      [20, 180],
      [568, 160],
      [616, 200],
      [64, 220],
    ],
    [
      [42, 10],
      [574, -10],
      [580, 8],
      [48, 28],
    ],
    progress,
  );
  const side = points(
    [
      [20, 180],
      [64, 220],
      [64, 300],
      [20, 260],
    ],
    [
      [42, 10],
      [48, 28],
      [20, 260],
      [10, 240],
    ],
    progress,
  );
  const latchX = mix(321, 307, progress);
  const latchY = mix(251, 38, progress);

  return (
    <svg
      className="chest-artwork"
      viewBox="0 0 640 510"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
      strokeLinejoin="bevel"
    >
      <defs>
        <pattern
          id={wood}
          width="128"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <rect width="128" height="64" fill="#a97524" />
          <path
            d="M0 0h57v13H0zM79 0h49v8H79zM15 34h70v12H15zM98 42h30v22H98z"
            fill="#b6812b"
          />
          <path
            d="M0 16h31v13H0zM51 12h58v10H51zM31 49h50v15H31zM109 22h19v12h-19z"
            fill="#91651f"
          />
          <path
            d="M0 44h15v20H0zM31 26h20v12H31zM85 34h24v12H85zM57 0h22v8H57z"
            fill="#9a752b"
          />
          <path
            d="M0 8h28v6H0zM67 23h36v6H67zM19 40h44v6H19z"
            fill="#c18a30"
            opacity=".65"
          />
        </pattern>
        <filter id={`${id}-shadow`} x="-20%" width="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse
        cx="325"
        cy="487"
        rx="284"
        ry="9"
        fill="#182010"
        opacity=".17"
        filter={`url(#${id}-shadow)`}
      />
      {/* Chest body, dark cavity, and the two halves of the double chest. */}
      <path
        d="M20 260 568 240 616 280 64 300Z"
        fill="#26251c"
        stroke="#39382c"
        strokeWidth="14"
      />
      <path d="M37 264 565 248 596 280 67 290Z" fill="#15150f" />
      <path
        d="M20 260 64 300 64 480 20 440Z"
        fill={`url(#${wood})`}
        stroke="#37362a"
        strokeWidth="12"
      />
      <path d="M20 260 64 300 64 480 20 440Z" fill="#16190f" opacity=".27" />
      <path
        d="M64 300 616 280 616 460 64 480Z"
        fill={`url(#${wood})`}
        stroke="#39392c"
        strokeWidth="13"
      />
      <path d="m76 313 527-19v18L76 331Z" fill="#cb9d4e" opacity=".52" />
      <path d="m337 292 0 177" stroke="#704f22" strokeWidth="12" opacity=".4" />
      <path d="m76 454 527-18v12L76 468Z" fill="#785b28" opacity=".7" />
      {/* The lid folds back to reveal its darker wooden underside. */}
      <polygon
        points={side}
        fill={`url(#${wood})`}
        stroke="#34352a"
        strokeWidth="12"
      />
      <polygon points={side} fill="#292b1c" opacity=".3" />
      <polygon
        points={top}
        fill={`url(#${wood})`}
        stroke="#3b3c2d"
        strokeWidth="12"
      />
      <polygon
        points={lid}
        fill={`url(#${wood})`}
        stroke="#393a2d"
        strokeWidth="14"
      />
      <polygon points={lid} fill="#29240b" opacity={progress * 0.62} />
      <polygon
        points={lid}
        fill="none"
        stroke="#706033"
        strokeWidth={progress * 8}
      />
      <path d={`M${latchX - 14} ${latchY - 22}h31v63h-31z`} fill="#565b50" />
      <path
        d={`M${latchX - 17} ${latchY - 24}h30v60h-30z`}
        fill="#b7bab2"
        stroke="#454a40"
        strokeWidth="3"
      />
      <path d={`M${latchX - 15} ${latchY - 22}h26v15h-26z`} fill="#d5d8cf" />
      <path d={`M${latchX + 5} ${latchY - 7}h6v40h-6z`} fill="#93988f" />
    </svg>
  );
}
