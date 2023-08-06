import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Error  from "./pages/Error/Error.jsx"
import App from "./App.jsx" 
import Authentication from "./pages/Authentication/Authentication.jsx"
import Tournament from "./pages/Tournament/Tournament.jsx"
import Tournaments from "./pages/Tournaments/Tournaments.jsx"
import About from "./pages/About/About.jsx"
import Tutorial from "./pages/Tutorial/Tutorial.jsx"
import JoinTournament from "./components/JoinTournament/JoinTournament.jsx"

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
                path:process.env.REACT_APP_VERIFY_PAGE,
                element:<Authentication formType="verify"/>
            },
            {
                path:process.env.REACT_APP_RESET_PASS_PAGE,
                element:<Authentication formType="reset_pass"/>
            },
            {
                path:process.env.REACT_APP_TOURNAMENTS_PAGE,
                element:<Tournaments/>
            },
            {
                path:process.env.REACT_APP_BRACKETS_PAGE,
                element:<Tournament type="Brackets"/>
            }, 
            {
                path:process.env.REACT_APP_POINTS_PAGE,
                element:<Tournament type="Points"/>
            },
            {
                path:process.env.REACT_APP_JOIN_PAGE,
                element:<JoinTournament/>
            },
            {
                path:process.env.REACT_APP_ABOUT_PAGE,
                element:<About/>
            },
            {
                path:process.env.REACT_APP_TUTORIAL_PAGE,
                element:<Tutorial/>
            },
            {
                path:"*",
                element:<Error/>
            }
        ]
    },
])