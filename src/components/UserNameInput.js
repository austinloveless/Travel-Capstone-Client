import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { Header, CommonButton } from "./common";

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/users";

class UserNameInput extends Component {
  state = { username: "", password: "" };

  onInputChange = (value, field) => {
    console.log("text feild", field);
    this.setState({ [field]: value });
  };

  render() {
    console.log("props user", this.props);
    return (
      <View>
        <Header headerText="Travelgram" />
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Create A Username</FormLabel>
          <FormInput
            onChangeText={username => this.onInputChange(username, "username")}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Create A Password</FormLabel>
          <FormInput
            onChangeText={password => this.onInputChange(password, "password")}
          />
        </View>

        <Button
          buttonStyle={styles.buttonStyle}
          title="See Travelgram Posts!"
          onPress={this.props.onComplete}
        />
      </View>
    );
  }
}
const styles = {
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15
  }
};

export default UserNameInput;
