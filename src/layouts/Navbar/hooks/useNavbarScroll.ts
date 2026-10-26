"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

export function useNavbarScroll() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return { scrolled };
}
