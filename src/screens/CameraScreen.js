import React, { Component } from "react";
import { View, Text } from "react-native";
import Camera from "../components/Camera";

class CameraScreen extends Component {
  state = { camera: false };
  render() {
    if (!this.state.camera) return <Camera />;
    return (
      <View>
        <Camera />
      </View>
    );
  }
}
export default CameraScreen;
