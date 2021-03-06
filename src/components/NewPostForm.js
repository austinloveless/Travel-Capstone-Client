import React, { Component } from "react";
import { View, Text, CameraRoll, Image } from "react-native";
import {
  FormLabel,
  FormInput,
  Button,
  TouchableOpacity
} from "react-native-elements";
import axios from "axios";
import { ImagePicker, Permissions } from "expo";
import { Header } from "./common";
import Camera from "./Camera";

class NewPostForm extends Component {
  state = {
    title: "",
    image: "",
    desc: "",
    error: "",
    username: "",
    hasCameraPermission: null,
    camera: true,
    zipcode: ""
  };

  useCamera = () => {
    this.setState({
      camera: !this.state.camera
    });
  };

  onSubmit = e => {
    const { title, image, desc, username } = this.state;
    this.setState({ error: null });

    const postData = {
      title,
      image,
      desc,
      username
    };
    console.log("post Data", postData);
    e.preventDefault();
    this.props.savePost(image, postData).catch(err => {
      console.log("post error", err);
      this.setState({ error: err.message });
    });
    this.props.toggleForm();
  };
  //
  onInputChange = (value, field) => {
    console.log("text feild", field);
    this.setState({ [field]: value });
  };

  openPicker = async () => {
    console.log("opening picker");
    const { status, ...data } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    console.log("result", status, data);
    if (status === "granted") {
      console.log("Status granted");
      const {
        cancelled,
        uri,
        ...data
      } = await ImagePicker.launchImageLibraryAsync();

      console.log("data", data);
      if (!cancelled) {
        this.setState({
          image: uri
        });
        console.log("state", this.state);
      }
    } else {
      console.log("Status not granted");
    }
  };

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Travel Photo</FormLabel>
          {this.state.image && (
            <Image
              width={400}
              height={400}
              source={{ uri: this.state.image }}
            />
          )}
          <Button
            onPress={this.openPicker}
            buttonStyle={styles.buttonStyle2}
            title="Upload image from Camera Roll"
          />
          <Button
            onPress={this.props.openCamera}
            buttonStyle={styles.buttonStyle2}
            title="Take Picture"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Describe The Trip!</FormLabel>
          <FormInput onChangeText={desc => this.setState({ desc })} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Five Digit Zip Code</FormLabel>
          <FormInput value={this.state.zipcode} />
        </View>

        <Button
          buttonStyle={styles.buttonStyle}
          onPress={this.onSubmit}
          title="Submit"
        />
      </View>
    );
  }
}
const styles = {
  buttonStyle: {
    backgroundColor: "blue",
    marginTop: 15
  },
  buttonStyle2: {
    backgroundColor: "red",
    marginTop: 15
  }
};

export default NewPostForm;
