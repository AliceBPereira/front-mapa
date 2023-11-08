import React from 'react';
import { router } from "./routes";
import { BrowserRouter,RouterProvider , Routes} from 'react-router-dom';
import Sidebar from "./components/Layout/Sidebar/Sidebar"


export default function App() {
   return (
      
      <RouterProvider router={router} >
         
        
      </RouterProvider>
   );
}
