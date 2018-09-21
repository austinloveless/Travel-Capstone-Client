import React, { Component } from "react";
import { View, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import NavSlides from "../components/NavSlides";

const SLIDE_DATA = [
  { text: "Welcome to Travelgram", color: "#03A9F4" },
  { text: "Use this to share travel experiences", color: "#009688" },
  { text: "Join Travelgram Today", color: "#03A9F4" }
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    return <NavSlides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}
export default WelcomeScreen;
