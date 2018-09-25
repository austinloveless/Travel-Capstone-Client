import React, { Component } from "react";
import { View, Text, CameraRoll, Image } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import axios from "axios";
import { ImagePicker, Permissions } from "expo";
import { Header } from "./common";

class EditPost extends Component {
  state = {
    loadingPost: true,
    posts: null
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.getPost(this.props.match.params.id);
    }
  }
  toggleForm = () => {
    this.setState({
      toggleForm: !this.state.toggleForm
    });
  };

  updatePost = async id => {
    const response = await fetch("/api/posts/" + id, {
      method: "put",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(this.state.posts)
    });
  };

  getPost = async id => {
    try {
      const response = await fetch("/api/posts/" + id, {
        method: "get"
      });
      const posts = await response.json();
      this.setState({ posts });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loadingPost: false });
    }
  };
  onSubmit = e => {
    e.preventDefault();
    this.updatePost(this.props.match.params.id);
  };
  render() {
    console.log("state", this.state);
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Username</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={title => this.onInputChange(title, "title")}
          />
        </View>
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
            title="Upload image"
          />
        </View>
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
  },
  buttonStyle2: {
    backgroundColor: "red",
    marginTop: 15
  }
};

export default EditPost;
