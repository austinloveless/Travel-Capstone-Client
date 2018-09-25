import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Spinner, Card, CardSection } from "./common";
import { Button } from "react-native-elements";
import PostDetail from "./PostDetail";
import { Header } from "./common";
import NewPostForm from "./NewPostForm";
import { Icon } from "react-native-elements";
import GalleryScreen from "./GalleryScreen";

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/posts/";
const USERAPI = "https://infinite-mountain-39369.herokuapp.com/api/users";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      toggleForm: true,
      username: "",
      hideComponent: true,
      camera: true
    };
  }

  toggleForm = () => {
    this.setState({
      toggleForm: !this.state.toggleForm
    });
  };
  hideComponent = () => {
    this.setState({
      hideComponent: !this.state.hideComponent
    });
  };

  componentDidMount() {
    console.log("posts mounted");
    return fetch(APIURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ posts: responseJson });
      });
  }
  //
  addPost = async data => {
    const response = await fetch(APIURL, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });
    const posts = await response.json();

    console.log("profile received", posts);
    this.setState({
      posts: [posts, ...this.state.posts]
    });
  };
  addUsername = async data => {
    const response = await fetch(USERAPI, {
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
  };

  uploadImageAsync(uri) {
    let apiUrl =
      "https://infinite-mountain-39369.herokuapp.com/api/posts/upload";

    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("image", {
      uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };

    return fetch(apiUrl, options).then(res => res.json());
  }

  savePost = (image, post) => {
    return Promise.all([this.addPost(post), this.uploadImageAsync(image)]);
  };

  deletePost(id) {
    const deleteURL = APIURL + id;
    fetch(deleteURL, {
      method: "delete"
    })
      .then(resp => {
        console.log("resp", resp);
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Please try again later, server is not responding"
            };
            throw err;
          }
        }
      })
      .then(() => {
        const posts = this.state.posts.filter(post => post._id !== id);
        console.log("posts", posts);
        this.setState({ posts: posts });
      });
  }

  render() {
    const posts = this.state.posts
      ? this.state.posts.map(p => {
          return (
            <PostDetail
              key={p._id}
              {...p}
              onDelete={this.deletePost.bind(this, p._id)}
              openMap={this.props.openMap}
            />
          );
        })
      : "Loading Posts";

    return (
      <ScrollView>
        <Header headerText="Travelgram" />
        <Button
          buttonStyle={styles.buttonStyle}
          title="New Post "
          onPress={this.toggleForm}
        />
        {!this.state.toggleForm ? (
          <NewPostForm
            openCamera={this.props.openCamera}
            savePost={this.savePost}
            toggleForm={this.toggleForm}
          />
        ) : null}

        {posts}
      </ScrollView>
    );
  }
}
const styles = {
  buttonStyle: {
    backgroundColor: "blue"
  }
};

export default Posts;
