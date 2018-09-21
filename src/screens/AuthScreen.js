import React, { Component } from "react";
import { View, Text } from "react-native";
import SignUpForm from "../components/SignUpForm";

class AuthScreen extends Component {
  onSignUpComplete = () => {
    this.props.navigation.navigate("code");
  };

  render() {
    return (
      <View>
        <SignUpForm onComplete={this.onSignUpComplete} />
      </View>
    );
  }
}
export default AuthScreen;
