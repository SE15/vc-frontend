import React, { Component } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

import './App.css';

import Main from "./pages/Main";

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    );
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );