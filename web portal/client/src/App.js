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
      path: "/showDocument",
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
      path: "/showDoc",
      element: <ShowDoc/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;


// function App() {
//   return (
//     <>
//     <Routes>
//       <Route exact path="/" element={<Login/>}/>
//       <Route exact path= '/login' element={<Login/>}/>
//       <Route exact path='/signup' element={<SignUp/>}/>
//       <Route exact path='/main' element={<Main/>}/>
//       <Route exact path='/addemployee' element={<Addnew />}/>
//       <Route exact path= '/request' element={<Request/>}/>
//       <Route exact path= '/manage' element={<Manage/>}/>
//       <Route exact path= '/employee' element={<Employee/>}/>
//     </Routes>
//     </>
//   );
// }

// export default App;