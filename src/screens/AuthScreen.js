import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import SignUpForm from "../components/SignUpForm";

class AuthScreen extends Component {
  SignUpComplete = () => {
    this.props.navigation.navigate("code");
  };

  render() {
    return (
      <View>
        <SignUpForm onComplete={this.SignUpComplete} />
      </View>
    );
  }
}
export default AuthScreen;
