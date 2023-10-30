import {
  createBrowserRouter,
} from "react-router-dom";

import Map from "./pages_/map";
import CafePage from "./pages_/CafePage/cafePage"
import teste from "./pages_/CafePage/teste"


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