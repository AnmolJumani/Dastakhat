import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom';
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Main from "./pages/main";
import Addnew from "./pages/addemployee";
import Employee from "./pages/employee";
import Manage from "./pages/manage";
import Request from "./pages/request"
import ViewEmployee from "./pages/viewEmployee";
import EditEmployee  from "./pages/editEmployee";
import Settings from "./pages/settings";
import AdminProfile from "./pages/adminProfile";
import ShowDocument from "./pages/showDocument";
import EditEmployee_forDocs from "./pages/uploadRequestedDoc";
import Dashboard from './pages/dashboard';
import ContactUs from "./pages/contactUs";
import AboutM from "./pages/aboutM";
import ShowDoc from "./pages/showDoc";
import { useRef } from "react";
import handleSubmit from "./handles/handlesubmit";



function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: < Dashboard/>, 
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Main />,
    },
    {
      path: "/addemployee",
      element: <Addnew />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
    {
      path: "/manage",
      element: <Manage />,
    },
    {
      path: "/request",
      element: <Request />,
    },
    {
      path: "/viewEmployee/:id",
      element: <ViewEmployee />,
    },
    {
      path: "/EditEmployee/:id",
      element: <EditEmployee />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/adminProfile",
      element: <AdminProfile />,
    },
    {
      path: "/showDocument/:id/:req_id",
      element: <ShowDocument />,
    },
    {
      path: "/uploadDocument/:id",
      element: <EditEmployee_forDocs/>,
    },
    {
      path: "/contactUs",
      element: <ContactUs/>
    },
    {
      path: "/about",
      element: <AboutM/>
    },
    {
      path: "/showDoc/:Doc_id/:_id",
      element: <ShowDoc/>
    }
  ]);

  return(
    
    <RouterProvider router={router} />
  ) ;
}

export default App;

