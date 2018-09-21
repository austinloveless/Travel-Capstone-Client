import React, { Component } from "react";
import { View, Text } from "react-native";
import UserNameInput from "../components/UserNameInput";

class UserNameScreen extends Component {
  onUsernameComplete = () => {
    this.props.navigation.navigate("posts");
  };
  render() {
    return (
      <View>
        <UserNameInput onComplete={this.onUsernameComplete} />
      </View>
    );
  }
}
export default UserNameScreen;
