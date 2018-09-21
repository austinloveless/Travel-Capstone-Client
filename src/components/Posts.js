import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Spinner, Card, CardSection, Button } from "./common";
import PostDetail from "./PostDetail";
import { Header } from "./common";
import NewPostForm from "./NewPostForm";
import axios from "axios";

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/posts";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      toggleForm: true
    };
  }

  componentDidMount() {
    console.log("posts mounted");
    return fetch(APIURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ posts: responseJson });
      });
  }

  toggleHidden = () => {
    this.setState(prevState => ({
      toggleForm: !prevState.toggleForm
    }));
  };

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

  render() {
    const posts = this.state.posts
      ? this.state.posts.map(p => {
          return <PostDetail key={p._id} {...p} />;
        })
      : "Loading Posts";

    return (
      <ScrollView>
        <Header headerText="Travelgram" />
        <Button title="Make New Post" onPress={this.toggleForm} />
        {!this.state.toggleForm ? (
          <NewPostForm savePost={this.savePost} />
        ) : null}
        {posts}
      </ScrollView>
    );
  }
}

export default Posts;
