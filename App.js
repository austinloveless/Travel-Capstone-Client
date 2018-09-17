import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/common";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header headerText="Travelgram" />
      </View>
    );
  }
}
