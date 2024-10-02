import React from "react";
import FroovaLogo from "./FroovaLogo";
import CircleText from "./CircleText";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#fee832]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
        <FroovaLogo className="cursor-pointer font-semibold text-[#a70666]" />
        <div className="md:Fuel your body. Elevate your life. md:-translate-y absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
          {/* Circle text */}
          <CircleText />
        </div>
      </div>
    </footer>
  );
}
