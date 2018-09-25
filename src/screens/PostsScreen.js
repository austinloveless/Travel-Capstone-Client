import React, { Component } from "react";
import { View, Text } from "react-native";
import Posts from "../components/Posts";
import { Icon } from "react-native-elements";

class PostsScreen extends Component {
  state = { hide: true };
  onSignInComplete = () => {
    this.props.navigation.navigate("camera");
  };
  onCameraComplete = () => {
    this.props.navigation.navigate("posts");
  };
  showMapScreen = () => {
    this.props.navigation.navigate("map");
  };

  render() {
    return (
      <View>
        <Posts
          openMap={this.showMapScreen}
          openCamera={this.onSignInComplete}
          onComplete={this.onCameraComplete}
        />
      </View>
    );
  }
}
export default PostsScreen;
