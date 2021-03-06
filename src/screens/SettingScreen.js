import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { Header } from "../components/common";

class SettingsScreen extends Component {
  onLogout = async () => {
    await AsyncStorage.removeItem("JWT");
    try {
      const token = await AsyncStorage.getItem("JWT");
      const username = await AsyncStorage.getItem("username");
      // We have data!!
      console.log("username", username);
      console.log("token", token);
      this.props.navigation.navigate("welcome");
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  render() {
    return (
      <View>
        <Header headerText="Travelgram" />

        <Button
          buttonStyle={{ backgroundColor: "red" }}
          title="Logout"
          onPress={this.onLogout}
        />
      </View>
    );
  }
}
export default SettingsScreen;
