import { interval } from "rxjs";
import { bixtronConfig } from "../../bixtronconfig";
import { getElement, pxToVh } from "../../scripts/aux-actions";
import { store } from "../../store/store";

export const initShadow = () => {
  const defaultWidth = 150;
  const defaultHeight = 20;

  return interval(16).subscribe(() => {
    const contentShape = getElement("#content-shape");
    const contentShadow = getElement("#content-shadow");
    if (!contentShape || !contentShadow) return;

    const { thruster } = store.getState().robot;

    const contentShapePos = contentShape.getBoundingClientRect();
    const floorY =
      document.body.clientHeight - pxToVh(17) + contentShapePos.height;
    const robotBottom = contentShapePos.bottom;

    const distanceFromFloor = floorY - robotBottom;
    const maxDistance = floorY - pxToVh(bixtronConfig.floorPosition);

    contentShadow.style.position = "fixed";
    contentShadow.style.bottom = `${pxToVh(10) + 30}px`;
    contentShadow.style.left = `${
      contentShapePos.x + contentShapePos.width / 2
    }px`;
    contentShadow.style.transform = "translateX(-50%)";

    if (distanceFromFloor > 0) {
      const percent = Math.min(distanceFromFloor / maxDistance, 1);

      const newWidth = defaultWidth * (1 - percent * 0.7);
      const newHeight = defaultHeight * (1 - percent * 0.8);
      const newOpacity = 1 - percent * 0.8;
      const newBlur = 10 + percent * 15;

      contentShadow.style.width = `${Math.max(newWidth, 20)}px`;
      contentShadow.style.height = `${Math.max(newHeight, 3)}px`;
      contentShadow.style.opacity = `${newOpacity}`;
      contentShadow.style.filter = `blur(${newBlur}px)`;

      if (thruster) {
        const glowIntensity = 1 - percent;
        const blueGlow = Math.round(glowIntensity * 100);
        contentShadow.style.background = `radial-gradient(ellipse, rgba(0, 200, 255, ${
          glowIntensity * 0.6
        }) 0%, rgba(0, 0, 0, 0.8) ${50 + blueGlow * 0.3}%)`;
      } else {
        contentShadow.style.background = "rgba(0, 0, 0, 0.8)";
      }
    } else {
      contentShadow.style.width = `${defaultWidth}px`;
      contentShadow.style.height = `${defaultHeight}px`;
      contentShadow.style.opacity = "1";
      contentShadow.style.filter = "blur(10px)";
      contentShadow.style.background = thruster
        ? "radial-gradient(ellipse, rgba(0, 200, 255, 0.6) 0%, rgba(0, 0, 0, 0.8) 50%)"
        : "rgba(0, 0, 0, 0.8)";
    }
  });
};
