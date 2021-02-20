import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProfileSettings from './ProfileSettings';
import Profile from './Profile';
import Home from './Home';
import Login from '../screens/Login';
import SignUp from './SignUp';
import Logout from './Logout';
import Delete from '../popups/DeleteAccount'
import Change from '../popups/ChangePassword'

const Main = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Login />
            </Route>
            <Route path="/delete" exact>
                <Delete />
            </Route>
            <Route path="/change" exact>
                <Change />
            </Route>
            <Route path="/home" exact>
                <Home />
            </Route>
            <Route path="/settings" exact>
                <ProfileSettings />
            </Route>
            <Route path="/profile">
                <Profile button="3" />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
            <Route path="/logout" exact>
                <Logout />
            </Route>
        </Switch>
    );
}

export default Main;
