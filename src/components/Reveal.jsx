import { motion, useReducedMotion } from "framer-motion";

// Blocks in this design enter one of two ways, once, when they first
// scroll into view.
//
// "rise" is the default and the one most of the page uses: up, in and out
// of focus. The numbers match the reveal the other two designs use, so all
// three move alike.
//
// "pop" is for things that arrive as a set - the programme cards - where a
// whole block rising at once lands as a slab. A popped card scales up past
// its size and settles back, and given a delay per card the set deals
// itself out instead.
const RISE = {
  hidden: { opacity: 0, filter: "blur(7px)", y: 52 },
  shown: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const POP = {
  hidden: { opacity: 0, scale: 0.82 },
  shown: { opacity: 1, scale: 1 },
};

// Whatever was asked for, already arrived.
const STILL = {
  hidden: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
  shown: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
};

const EASE = {
  // settles without overshooting
  rise: [0.16, 0.82, 0.24, 1],
  // overshoots a little and comes back - this is what reads as a pop
  pop: [0.34, 1.56, 0.64, 1],
};

const DURATION = { rise: 0.85, pop: 0.52 };

export function Reveal({ as = "div", className, children, delay = 0, variant = "rise", ...rest }) {
  const Motion = motion[as] ?? motion.div;
  // Someone who asked their device for less motion gets the content with
  // none of the travel.
  const still = useReducedMotion();
  const kind = variant === "pop" ? "pop" : "rise";

  return (
    <Motion
      className={className}
      initial="hidden"
      whileInView="shown"
      // "some" means any sliver of the block counts. This used to ask for
      // 0.2 of it, which a block taller than about five screens can never
      // show at once - it would have stayed invisible for good.
      viewport={{ once: true, amount: "some" }}
      variants={still ? STILL : kind === "pop" ? POP : RISE}
      transition={
        still ? { duration: 0 } : { duration: DURATION[kind], delay, ease: EASE[kind] }
      }
      {...rest}
    >
      {children}
    </Motion>
  );
}
