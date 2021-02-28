import React, { Component } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
    console.log("object")
  }

  render() {
    console.log(this.props.isAuthenticated)
    return (
      <ChakraProvider>
        <Header type = {this.props.isAuthenticated}/>
        <Main />
        <Footer />
      </ChakraProvider>
    );
  } 
}

const mapStateToProps = state => {
  return {
      isAuthenticated: !(state.token === null || state.token === undefined),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );