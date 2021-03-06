import _ from "lodash";
import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { Apploading } from "expo";
import NavSlides from "../components/NavSlides";

const SLIDE_DATA = [
  { text: "Welcome to Travelgram", color: "#03A9F4" },
  { text: "Use this to share travel experiences", color: "#009688" },
  { text: "Join Travelgram Today", color: "#03A9F4" }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem("JWT");

    if (token) {
      this.props.navigation.navigate("posts");
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    console.log("welcome state", this.state.token);
    // if (_.isNull(this.state.token)) {
    //   return <Apploading />;
    // }
    return <NavSlides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}
export default WelcomeScreen;
