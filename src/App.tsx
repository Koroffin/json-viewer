import { FilePage } from "./FilePage";
import { QuestsPage } from "./QuestsPage";
import { MainPage } from "./Main";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/quests",
    element: <FilePage />,
  },
  {
    path: "/quests/list",
    element: <QuestsPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
