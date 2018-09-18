import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Spinner, Card, CardSection, Button } from "./common";
import PostDetail from "./PostDetail";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    return fetch("https://infinite-mountain-39369.herokuapp.com/api/posts")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ posts: responseJson });
      });
  }

  render() {
    const posts = this.state.posts
      ? this.state.posts.map(p => {
          return <PostDetail key={p._id} {...p} />;
        })
      : "Loading Posts";

    return (
      <ScrollView>
        {posts}
        <Button>Hello</Button>
      </ScrollView>
    );
  }
}

export default Posts;
