import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Error  from "./pages/Error/Error.jsx"
import App from "./App.jsx" 
import Authentication from "./pages/Authentication/Authentication.jsx"

export const router= createBrowserRouter([
    {
        path:process.env.REACT_APP_HOME_PAGE,
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:process.env.REACT_APP_PROFILE_PAGE,
                element:<Profile/>
            },
            {
                path:process.env.REACT_APP_LOGIN_PAGE,
                element:<Authentication formType="login"/>
            },
            {
                path:process.env.REACT_APP_SIGNUP_PAGE,
                element:<Authentication formType="register"/>
            },
            {
                path:process.env.REACT_APP_FORGOT_PASS_PAGE,
                element:<Authentication formType="forgot_pass"/>
            },
            {
                path:process.env.REACT_APP_RESET_PASS_PAGE,
                element:<Authentication formType="reset_pass"/>
            },
            {
                path:"*",
                element:<Error/>
            }
        ]
    },
])