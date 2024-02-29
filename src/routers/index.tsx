import { default as Pages } from "../pages";
import Home from "../pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Config from "../pages/Config";
import { useSelector } from "react-redux";
import { selectorRobot } from "../store/reducers/robot";

export default function Routers() {
  const { configured } = useSelector(selectorRobot);

  let routers = Object.entries(Pages).map(([nameScreen, Component]) => {
    return {
      path: nameScreen,
      element: <Component />,
    };
  });

  routers.push({
    path: "/",
    element: <Home />,
  });

  if (!configured) {
    routers = [
      {
        path: "/",
        element: <Config />,
      },
    ];
  }

  return <RouterProvider router={createBrowserRouter([...routers])} />;
}
