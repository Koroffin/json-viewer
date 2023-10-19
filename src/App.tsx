import { FilePage } from "./FilePage";
import { QuestsPage } from "./QuestsPage";
import { MainPage } from "./Main";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DialogPage } from "./DialogPage";

export const rootUrl = "/json-viewer"

const router = createBrowserRouter([
  {
    path: `${rootUrl}/`,
    element: <MainPage />,
  },
  {
    path: `${rootUrl}/quests`,
    element: <FilePage />,
  },
  {
    path: `${rootUrl}/quests/list`,
    element: <QuestsPage />,
  },
  {
    path: `${rootUrl}/dialogs`,
    element: <DialogPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
