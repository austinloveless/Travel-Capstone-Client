import React, { Component } from "react";
import { View, Text } from "react-native";
import Posts from "../components/Posts";
import { Icon } from "react-native-elements";

class PostsScreen extends Component {
  render() {
    return (
      <View>
        <Posts />
      </View>
    );
  }
}
export default PostsScreen;
