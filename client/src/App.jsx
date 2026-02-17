import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Shop from './pages/shop';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Detail from './pages/Detail';

const App = () => {




  const router=createBrowserRouter([{
    path:"/",
    element:<MainLayout></MainLayout>,
    children:[{
      path:"/",
      element:<Home></Home>
    },
  
  {
    path:"/shop",
    element:<Shop></Shop>
  },
  {
    path:"/cart",
    element:<Cart></Cart>
  },
  
  {
    path:"/about",
    element:<AboutUs></AboutUs>
  },
{
  path:"/shop/:id/category/:category",
  element:<Detail></Detail>
}
  
  
  ]

  }])
  // console.log(count,dispatch);
  
  return (
<>


<RouterProvider router={router}></RouterProvider>


</>
  )
}

export default App