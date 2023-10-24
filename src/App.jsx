import React from 'react';
import { router } from "./routes";
import { BrowserRouter,RouterProvider , Routes} from 'react-router-dom';
import Header from './Layout/header';


export default function App() {
   return (
      <RouterProvider router={router} >
         
        
      </RouterProvider>
   );
}
