import React, { Component } from "react";
import { View, Text } from "react-native";
import Posts from "../components/Posts";
import { Icon } from "react-native-elements";

class PostsScreen extends Component {
  onSignInComplete = () => {
    this.props.navigation.navigate("camera");
  };

  render() {
    return (
      <View>
        <Posts openCamera={this.onSignInComplete} />
      </View>
    );
  }
}
export default PostsScreen;
