import React, { Component } from "react";
import { View, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import axios from "axios";
import { Header } from "./common";

const ROOT_URL = "https://us-central1-travel-capstone-auth.cloudfunctions.net";

class SignUpForm extends Component {
  state = { phone: "1", error: "", success: "" };

  handleSubmit = async ({ navigation }) => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
        phone: this.state.phone
      });
      this.props.onComplete();
    } catch (err) {
      this.setState({ error: err });
    }
  };

  render() {
    console.log("phone", this.state.phone);
    return (
      <View>
        <Header headerText="Travelgram" />

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button
          buttonStyle={styles.buttonStyle}
          onPress={this.handleSubmit}
          title="Create Account"
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

export default SignUpForm;
