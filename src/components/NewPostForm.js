import React, { Component } from "react";
import { View, Text, CameraRoll, Image } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import axios from "axios";
import { ImagePicker, Permissions } from "expo";
import { Header } from "./common";
//import ImagePicker from 'react-native-image-crop-picker'

class NewPostForm extends Component {
  state = { title: "", image: "", desc: "" };

  onSubmit = e => {
    const { title, image, desc } = this.state;

    const postData = {
      title,
      image,
      desc
    };
    console.log("post Data", postData);
    e.preventDefault();
    this.props.addPost(postData).catch(err => {
      console.log("post error", err);
    });
  };
  //
  onInputChange = (value, field) => {
    console.log("text feild", field);
    this.setState({ [field]: value });
  };
  //
  openPicker = async () => {
    console.log("opening picker");
    const { status, ...data } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
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

    //ImagePicker.openPicker()
  };

  render() {
    console.log("state", JSON.stringify(this.state));
    return (
      <View>
        <Header headerText="Travelgram" />

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Title</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={title => this.onInputChange(title, "title")}
          />
        </View>
        {/* <View style={{ marginBottom: 10 }}>
          <FormLabel>Travel Photo</FormLabel>
          {this.state.image && (
            <Image
              width={300}
              height={300}
              source={{ uri: this.state.image }}
            />
          )}
          <Button onPress={this.openPicker} title="Upload image" />
        </View> */}
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Describe The Trip!</FormLabel>
          <FormInput
            value={this.state.desc}
            onChangeText={desc => this.setState({ desc })}
          />
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
    backgroundColor: "#0288D1",
    marginTop: 15
  }
};

export default NewPostForm;
