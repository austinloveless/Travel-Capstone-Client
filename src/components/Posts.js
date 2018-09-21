import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Spinner, Card, CardSection, Button } from "./common";
import PostDetail from "./PostDetail";
import { Header } from "./common";
import NewPostForm from "./NewPostForm";
import axios from "axios";
import { Icon } from "react-native-elements";

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/posts";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      toggleForm: true
    };
  }

  toggleForm = () => {
    this.setState({
      toggleForm: !this.state.toggleForm
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

  render() {
    const posts = this.state.posts
      ? this.state.posts.map(p => {
          return <PostDetail key={p._id} {...p} />;
        })
      : "Loading Posts";

    return (
      <ScrollView>
        <Header headerText="Travelgram" toggleForm={this.toggleForm} />
        <Icon name="plus" type="font-awesome" onPress={this.toggleForm} />
        {!this.state.toggleForm ? <NewPostForm addPost={this.addPost} /> : null}
        {posts}
      </ScrollView>
    );
  }
}

export default Posts;
