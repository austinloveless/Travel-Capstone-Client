import React, { Component } from "react";
import { View, Text } from "react-native";
import Camera from "../components/Camera";

class CameraScreen extends Component {
  state = { camera: false };

  SignUpComplete = () => {
    this.props.navigation.navigate("posts");
  };
  render() {
    if (!this.state.camera) return <Camera onComplete={this.SignUpComplete} />;
    return (
      <View>
        <Camera />
      </View>
    );
  }
}
export default CameraScreen;
