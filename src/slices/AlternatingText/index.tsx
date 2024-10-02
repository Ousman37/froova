"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import clsx from "clsx";
import Scene from "./Scene";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export type AlternatingTextProps = SliceComponentProps<Content.AlternatingTextSlice>;

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  useEffect(() => {
    // Cast sections as HTMLElement[]
    const sections = gsap.utils.toArray(".alternating-section") as HTMLElement[];
    const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,  // Typed correctly as an HTMLElement
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Update background color when entering each section
          gsap.to(".alternating-text-container", {
            backgroundColor: bgColors[index % bgColors.length],
            ease: "none",
            duration: 1,
          });
        },
        onLeaveBack: () => {
          // Restore the previous background color when leaving back
          gsap.to(".alternating-text-container", {
            backgroundColor: bgColors[(index - 1 + bgColors.length) % bgColors.length],
            ease: "none",
            duration: 1,
          });
        },
      });
    });
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative text-sky-950"
    >
      <div className="relative z-[100] grid">
        <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
          <Scene />
        </View>
        {slice.primary.text_group?.map((item, index) => (
          <div
            key={asText(item.heading)}
            className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
          >
            <div
              className={clsx(
                index % 2 === 0 ? "md:col-start-1" : "md:col-start-2",
                "rounded-lg p-4 backdrop-blur-lg",
              )}
            >
             
              <h2 className="text-balance text-6xl font-bold">
                <PrismicText field={item.heading} />
              </h2>
              <div className="mt-4 text-xl">
                <PrismicRichText field={item.body} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default AlternatingText;
