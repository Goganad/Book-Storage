import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {BookListPage} from "./pages/BookListPage";
import {BookPage} from "./pages/BookPage";
import {AddPage} from "./pages/AddPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/main" exact>
                    <BookListPage/>
                </Route>
                <Route path="/add" exact>
                    <AddPage />
                </Route>
                <Route path="/books/:id" component={BookPage}/>
                <Redirect to="/main"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}