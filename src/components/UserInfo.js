import React from "react";
import { Text, View, Image, Linking, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";

const UserInfo = ({ avatar, username }) => {
  return (
    <View>
      <Text>{avatar}</Text>
    </View>
  );
};

export default UserInfo;
