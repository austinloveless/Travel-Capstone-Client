import React, { Component } from "react";
import { View, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { Header, CommonButton } from "./common";

class SignInForm extends Component {
  state = { username: "" };

  render() {
    return (
      <View>
        <Header headerText="Travelgram" />
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Create A Username</FormLabel>
          <FormInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
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

export default SignInForm;
