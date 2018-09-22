import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import axios from "axios";
import firebase from "firebase";
import { Header, CommonButton } from "./common";

const ROOT_URL = "https://us-central1-travel-capstone-auth.cloudfunctions.net";

class SignInForm extends Component {
  state = { phone: "1", code: "", token: "" };

  handleSubmit = async ({ navigation }) => {
    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: this.state.phone,
        code: this.state.code
      });
      AsyncStorage.setItem("JWT", data.token);
      this.setState({ token: data.token });
      firebase.auth().signInWithCustomToken(data.token);
      this.props.onComplete;
    } catch (err) {
      console.log(err);
    }
  };

  onLogin = async () => {
    let token = await AsyncStorage.getItem("token");
    console.log("storage token", token);
  };

  render() {
    console.log("state token", this.state.token);

    return (
      <View>
        <Header headerText="Travelgram" />
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number Again</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Code We Text To You</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>

        <Button
          buttonStyle={styles.buttonStyle}
          onPress={this.handleSubmit}
          title="Submit"
        />
        <Button
          buttonStyle={styles.buttonStyle}
          title="Create User Name"
          onPress={this.props.onComplete}
        />
        <Button title="test" onPress={this.onLogin} />
      </View>
    );
  }
}
const styles = {
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15
  },
  buttonStyle2: {}
};

export default SignInForm;
