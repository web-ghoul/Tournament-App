import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Login from "./pages/Login/Login.jsx"
import SignUp from "./pages/SignUp/SignUp.jsx"
import Error  from "./pages/Error/Error.jsx"
import App from "./App.jsx" 

export const router= createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"profile/:id",
                element:<Profile/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"signup",
                element:<SignUp/>
            },
            {
                path:"*",
                element:<Error/>
            }
        ]
    },
])