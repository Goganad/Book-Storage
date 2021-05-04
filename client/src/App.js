import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import 'materialize-css'
import "bootstrap/dist/css/bootstrap.min.css";
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {Navbar} from "./components/Navbar";
import {AuthContext} from './context/AuthContext'
import {Loader} from "./components/Loader";
import {LoaderCentered} from "./components/LoaderCentered";

function App() {
    const {isAuthenticated, verify, logout, ready} = useAuth()
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            verify, logout, isAuthenticated
        }}>
            <Router>
                { isAuthenticated && <Navbar/>}
                {ready?
                    <div className="container">
                        {routes}
                    </div>
                :
                    <LoaderCentered />
                }
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
