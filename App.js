import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/common";
import Posts from "./src/components/Posts";
import SignUpForm from "./src/components/SignUpForm";
import SignInForm from "./src/components/SignInForm";
import firebase from "firebase";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
//Screens
import AuthScreen from "./src/screens/AuthScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import UploadScreen from "./src/screens/UploadScreen";
import SettingScreen from "./src/screens/SettingScreen";
import MapScreen from "./src/screens/MapScreen";
import PostsScreen from "./src/screens/PostsScreen";
import CodeScreen from "./src/screens/CodeScreen";
import UserNameScreen from "./src/screens/UserNameScreen";

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBiNDVyuwmlix6mqDWdHZJHe0pxFDSfQUQ",
      authDomain: "travel-capstone-auth.firebaseapp.com",
      databaseURL: "https://travel-capstone-auth.firebaseio.com",
      projectId: "travel-capstone-auth",
      storageBucket: "travel-capstone-auth.appspot.com",
      messagingSenderId: "23103383602"
    };
    firebase.initializeApp(config);
  }
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      code: { screen: CodeScreen },
      username: { screen: UserNameScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          posts: { screen: PostsScreen },
          upload: {
            screen: createStackNavigator({
              upload: { screen: UploadScreen },
              settings: { screen: SettingScreen }
            })
          }
        })
      }
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
