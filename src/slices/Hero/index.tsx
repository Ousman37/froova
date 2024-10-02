"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTimeline = gsap.timeline();

      introTimeline.set(".hero", { opacity: 1 });
      introTimeline.from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      });
      introTimeline.from(
        ".hero-subheading",
        {
          y: 30,
          opacity: 0,
        },
        "+=.8",
      );
      introTimeline.from(".hero-body", {
        y: 0,
        opacity: 0,
      });
      introTimeline.from(".hero-button", {
        y: 0,
        opacity: 0,
        duration: 0.6,
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#fde047", // Start color
          },
          {
            backgroundColor: "#a7ea29", // End color
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          opacity: 0,
          rotate: -25,
          stagger: 0.1,
          ease: "back.out",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero relative z-10 opacity-0" // Ensure it's above other layers
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-0 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}
      <div className="grid">
        <div className="relative z-30 grid h-screen place-items-center">
          {/* Ensuring button and content have a higher z-index */}
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header mt-8 text-6xl font-black uppercase leading-tight text-teal-600 md:text-[7rem] lg:text-[10rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-6 text-4xl font-semibold text-sky-950 lg:text-5xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button z-40 mt-10 cursor-pointer" 
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balance text-5xl font-black uppercase text-sky-950 lg:text-7xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-lg font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
