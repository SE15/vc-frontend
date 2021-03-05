import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { connect } from 'react-redux';

import Settings from './Settings';
import ProfileSettings from './ProfileSettings';
import Profile from './Profile';
import Search from './Search';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import Delete from '../popups/DeleteAccount'
import Change from '../popups/ChangePassword'
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardHolder from '../components/ContainerTemplates/CardHolder';
import SkilLCard from '../components/Skill/SkillCard';
import Recommendation from '../components/Recommendation/Recommendation';
import Connection from '../components/Connection/Connection';

import * as actions from '../store/actions';

const Main = (props) => {
    return (
        <BrowserRouter>
            <div>
                <Header isAuthenticated={props.isAuthenticated} logout={props.onLogout} />
                <Content isAuthenticated={props.isAuthenticated} />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

const AuthenticatedRoutes = ({ isAuthenticated }) => {
    if (isAuthenticated) return ([
        <Route path="/" exact>
            <Profile />
        </Route>,
        <Route path="/settings" exact>
            <Settings />
        </Route>
    ]);
    return ([
        <Route path="/" exact>
            <Login />
        </Route>,
        <Route path="/signup" exact>
            <SignUp />
        </Route>
    ]);
}

const Content = ({ isAuthenticated }) => {
    const location = useLocation();
    const transitions = useTransition(location, (location) => location.pathname, {
        from: { position: "absolute", opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            <Switch location={item}>
                <Route path="/delete" exact>
                    <Delete />
                </Route>
                <Route path="/change" exact>
                    <Change />
                </Route>
                <Route path="/search" exact>
                    <Search />
                </Route>
                <Route path="/psettings" exact>
                    <ProfileSettings />
                </Route>
                <AuthenticatedRoutes isAuthenticated={isAuthenticated} />
                <Route path="/profile" exact>
                    <Profile button="3" />
                </Route>
                <Route path="/user/profile" exact>
                    <Profile />
                </Route>
                <Route path="/logout" exact>
                    <Logout />
                </Route>
            </Switch>
        </animated.div>
    ));
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout('/'))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Main);
