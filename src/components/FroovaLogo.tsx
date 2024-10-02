import { SVGProps } from "react";

const FroovaLogo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className} 
      width="200" 
      height="100"
      viewBox="0 0 200 100"
      aria-labelledby="froova-logo-title"
    >
      <title id="froova-logo-title">FRV</title>
      {/* Text Element for the Logo */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fontFamily="Proxima Nova"
        fill="currentColor"
      >
        FRV
      </text>
    </svg>
  );
};

export default FroovaLogo;
