import {
  createBrowserRouter,
} from "react-router-dom";

import Map from "./pages_/map";
import Details from "./pages_/details"

export const router = createBrowserRouter([
  {
    path: "/",
    element: Map(),
  },
  {
    path: "/details",
    element: Details( ),
  },
]);