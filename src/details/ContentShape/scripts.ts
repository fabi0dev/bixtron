import { bixtronConfig } from "../../bixtronconfig";
import { getElement } from "../../scripts/aux-actions";

//cuida somente da sombra
export const initShadow = () => {
  const contentShape = getElement("#content-shape");
  const defaultHeight = 25;

  setInterval(() => {
    const contentShadow = getElement("#content-shadow");
    const contentShapePos = contentShape.getBoundingClientRect();
    const documentHeight = document.body.clientHeight;
    const floorDefault =
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight;

    const widthShadow = contentShapePos.width / 2;
    contentShadow.style.width = `${widthShadow}px`;

    contentShadow.style.marginLeft = `${
      contentShadow.getBoundingClientRect().width / 2
    }px`;

    if (contentShapePos.y < floorDefault) {
      const percentDistance = 100 - (contentShapePos.y * 100) / floorDefault;
      const percentWidthShadow =
        widthShadow - (percentDistance * widthShadow) / 100;
      let percentHeightShadow =
        defaultHeight - (percentDistance * defaultHeight) / 100 - 5;
      percentHeightShadow = percentHeightShadow < 1 ? 0 : percentHeightShadow;

      if (percentDistance > 0 && percentWidthShadow > 0) {
        contentShadow.style.width = `${percentWidthShadow}px`;
        contentShadow.style.height = `${percentHeightShadow}px`;
        contentShadow.style.transition = "none";
      } else {
        contentShadow.style.width = "0px";
      }
    } else {
      contentShadow.style.transition = "all .5s";
      contentShadow.style.top = `${
        contentShapePos.y + contentShapePos.height
      }px`;
    }
  }, 1);
};
