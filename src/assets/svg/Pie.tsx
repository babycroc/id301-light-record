import { asset } from "../utils";

export const PieSVG = asset(({ color = "#ffffff", stroke = "none" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="244.55"
    height="114.81"
    viewBox="0 0 244.55 114.81"
  >
    <path
      fill={color}
      stroke={stroke}
      strokeWidth="2"
      d="M238.78,56.28c-3.83-19.27-9.55-38.12-17.07-56.28L0,91.84c2.93,7.08,4.55,14.83,4.55,22.97H244.55c0-19.65-1.93-39.26-5.77-58.53Z"
    />
  </svg>
));
