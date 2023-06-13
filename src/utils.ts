import { Color } from "./types";

export const convertToHexColor = (color: Color) => {
  let hexColor = null;
  switch (color) {
    case Color.RED:
      hexColor = getComputedStyle(document.body).getPropertyValue("--red");
      break;
    case Color.ORANGE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--orange");
      break;
    case Color.YELLOW:
      hexColor = getComputedStyle(document.body).getPropertyValue("--yellow");
      break;
    case Color.GREEN:
      hexColor = getComputedStyle(document.body).getPropertyValue("--green");
      break;
    case Color.BLUE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--blue");
      break;
    case Color.PURPLE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--purple");
      break;
    case Color.PINK:
      hexColor = getComputedStyle(document.body).getPropertyValue("--pink");
      break;
    case Color.WHITE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--white");
      break;
    case Color.NONE:
      hexColor = getComputedStyle(document.body).getPropertyValue(
        "--background"
      );
      break;
    default:
      hexColor = getComputedStyle(document.body).getPropertyValue(
        "--background"
      );
      break;
  }
  return hexColor;
};
