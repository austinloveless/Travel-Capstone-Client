import React, { Component } from "react";
import { View, Text } from "react-native";
import SignInForm from "../components/SignInForm";

class CodeScreen extends Component {
  onSignInComplete = () => {
    this.props.navigation.navigate("username");
  };

  render() {
    return (
      <View>
        <SignInForm onComplete={this.onSignInComplete} />
      </View>
    );
  }
}
export default CodeScreen;
