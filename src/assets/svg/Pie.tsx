import { asset } from "../utils";

export const PieSVG = asset(
  ({ color = "#ffffff", stroke = "none", weight = 3, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="114.81"
      viewBox="-26 0 244.55 114.81"
    >
      <defs>
        <path
          id="pie"
          d="M238.78,56.28c-3.83-19.27-9.55-38.12-17.07-56.28L0,91.84c2.93,7.08,4.55,14.83,4.55,22.97H244.55c0-19.65-1.93-39.26-5.77-58.53Z"
        />

        <mask id="mask">
          <path
            fill="white"
            d="M238.78,56.28c-3.83-19.27-9.55-38.12-17.07-56.28L0,91.84c2.93,7.08,4.55,14.83,4.55,22.97H244.55c0-19.65-1.93-39.26-5.77-58.53Z"
          />
        </mask>
      </defs>

      <use
        xlinkHref="#pie"
        mask="url(#mask)"
        fill={color}
        stroke={stroke}
        strokeWidth={weight}
        {...props}
      />
    </svg>
  )
);
