import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { Header, CommonButton } from "./common";

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/users";

class UserNameInput extends Component {
  state = { username: "" };
  onSubmit = e => {
    const { username } = this.state;

    const Data = {
      username
    };
    console.log("username Data", Data.username);
    e.preventDefault();
    AsyncStorage.setItem("username", Data.username);
    this.addUsername(Data).catch(err => {
      console.log("post error", err);
    });
  };
  addUsername = async data => {
    const response = await fetch(APIURL, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });
    const username = await response.json();

    console.log("username received", username);
    this.setState({
      username: [username, ...this.state.username]
    });
    console.log("state user", this.state.username);
  };

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
        <Button
          buttonStyle={styles.buttonStyle}
          onPress={this.onSubmit}
          title="Submit"
        />
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
