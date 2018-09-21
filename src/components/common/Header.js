// Import libraries for making a component
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

// Make a component
const Header = props => {
  const { textStyle, viewStyle, iconPosition } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      <View />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  textStyle: {
    fontSize: 20
  },
  iconPosition: {
    flex: 1,
    flexDirection: "row",
    alignItems: "right",
    justifyContent: "right",
    marginLeft: "50%"
  }
};

// Make the component available to other parts of the app
export { Header };
