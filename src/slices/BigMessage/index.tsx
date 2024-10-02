import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigMessage`.
 */
export type BigMessageProps = SliceComponentProps<Content.BigMessageSlice>;

/**
 * Component for "BigMessage" Slices.
 */
const BigMessage = ({ slice }: BigMessageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg flex min-h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-r from-[#f12711] to-[#f5af19] text-[#fee832]"
    >
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        {/* Adjust text size for responsiveness */}
        <div className="text-[20vw] md:text-[34vw]">Taste</div>
        <div className="grid gap-[3vw] text-[20vw] md:text-[11vw]">
          <span className="inline-block">The </span>
          <span className="inline-block">Bold</span>
          <span className="inline-block">Flavors</span>
        </div>
        <div className="text-[20vw] md:text-[34vw]">Now!</div>
      </h2>
    </section>
  );
};

export default BigMessage;