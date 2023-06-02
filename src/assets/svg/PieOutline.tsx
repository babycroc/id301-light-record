import { asset } from "../utils";

export const PieOutlineSVG = asset(({ color = "var(--black)", weight = 3 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="244.55"
    height="114.81"
    viewBox="0 0 247.96 118.26"
  >
    <path
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={weight}
      d="M240.75,58.26c-3.8-19.3-9.5-38.1-17.1-56.3L1.95,93.76c2.9,7.1,4.5,14.8,4.5,23H246.45c.1-19.7-1.9-39.3-5.7-58.5Z"
    />
  </svg>
));
