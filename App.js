import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/common";
import Posts from "./src/components/Posts";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header headerText="Travelgram" />
        <Posts />
      </View>
    );
  }
}
