import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <PrismicNextLink
      className={clsx(
        "rounded-md bg-purple-800 px-6 py-3 text-center text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-purple-700", className
      )}
      field={buttonLink}
    >
      {buttonText}
    </PrismicNextLink>
  );
}
