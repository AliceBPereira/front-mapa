import {
  createBrowserRouter,
} from "react-router-dom";

import Map from "./pages_/Map/map";
import CafePage from "./pages_/CafePage/cafePage"



export const router = createBrowserRouter([
  {
    path: "/",
    element: Map(),
  },
  {
    path: "/CafePage",
    element: CafePage( ),
  },

  
]);