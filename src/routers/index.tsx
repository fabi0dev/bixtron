import { useMemo } from "react";
import { default as Pages } from "../pages";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Config from "../pages/Config";
import { useSelector } from "react-redux";
import { selectorRobot } from "../store/reducers/robot";

export default function Routers() {
  const { configured } = useSelector(selectorRobot);

  const router = useMemo(() => {
    if (!configured) {
      return createBrowserRouter([
        {
          path: "*",
          element: <Config />,
        },
      ]);
    }

    const routes = Object.entries(Pages).map(([nameScreen, Component]) => ({
      path: nameScreen.toLowerCase(),
      element: <Component />,
    }));

    routes.push({
      path: "/home",
      element: <Home />,
    });

    routes.push({
      path: "/",
      element: <Landing />,
    });

    return createBrowserRouter(routes);
  }, [configured]);

  return <RouterProvider router={router} />;
}
