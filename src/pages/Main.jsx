import React from "react";
import { BrowserRouter, Switch, Route, useLocation, Redirect, withRouter } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { connect } from 'react-redux';

import Settings from './Settings';
import Home from './Home';
import Profile from './Profile';
import Search from './Search';
import Login from './Login';
import SignUp from './SignUp';
import Header from "../containers/Header/Header";
import Footer from "../components/Footer/Footer";

import * as actions from '../store/actions';

const Main = (props) => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Content isAuthenticated={props.isAuthenticated} />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

const Content = ({ isAuthenticated }) => {
    const location = useLocation();
    const transitions = useTransition(location, (location) => location.pathname, {
        from: { position: "absolute", opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    let routes = (item) => (
        <Switch location={item}>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/search" component={Search} />
            <Route path="/profiles" component={Profile} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) routes = (item) => (
        <Switch location={item}>
            <Route path="/" exact component={Home} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/search" component={Search} />
            <Route path="/profiles" component={Profile} />
            <Redirect to="/" />
        </Switch>
    );

    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            {routes(item)}
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
