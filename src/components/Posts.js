import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Spinner, Card, CardSection, Button } from "./common";
import PostDetail from "./PostDetail";
import { Header } from "./common";
import NewPostForm from "./NewPostForm";
import axios from "axios";
import { RNS3 } from "react-native-aws3";
// import  from "react-native-file-type"

const APIURL = "https://infinite-mountain-39369.herokuapp.com/api/posts";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  /*let file = {
  // `uri` can also be a file system path (i.e. file://)
  uri: "assets-library://asset/asset.PNG?id=655DBE66-8008-459C-9358-914E1FB532DD&ext=PNG",
  name: "image.png",
  type: "image/png"
}*/

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

  // addPost = async ({ title, desc, image }) => {
  //   let location = "";
  //   console.log("image", image);
  //   if (image) {
  //     const uploadedImage = await this.addImage(image);
  //     console.log("we have uploaded image");
  //     if (uploadedImage && uploadedImage.hasOwnProperty("location")) {
  //       location = uploadedImage.location;
  //     }
  //   }
  //   console.log("before add profile", location);
  //   this.addProfile({
  //     profile: {
  //       title,
  //       desc,
  //       image: location
  //     }
  //   });
  // };
  //
  addImage = uri => {
    const formData = new FormData();
    formData.append("image", { uri: file, name: new Date().getTime() });
    const fileName = Date.now();
    options.keyPrefix = `files/${Date.now()}_${fileName}`;
    const file = {
      uri,
      name: fileName,
      type: "image/jpg"
    };
    console.log("file to upload", file);
    return RNS3.put(file, options)
      .then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
        return response.body;
      })
      .catch(err => {
        console.error(err);
        return "";
      });
  };
  //   /*
  //   return fetch(APIURL + "/upload", {
  //     method: "post",
  //     body: formData
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => {
  //       console.log("add Image response", res);
  //       return res;
  //     })
  //     .catch(error => {
  //       this.setState({
  //         message: `There was an error: ${error.message}`
  //       });
  //     });*/
  // };
  //
  // addProfile = async payload => {
  //   const response = await fetch(APIURL, {
  //     method: "post",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     }),
  //     body: JSON.stringify({ profiles: payload })
  //   });
  //   const profile = await response.json();
  //
  //   console.log("profile received", profile);
  //   /*this.setState({
  //     profiles: [...this.state.profiles, profile]
  //   });*/
  //   console.log("state", this.state);
  // };

  /*async addPost({ title, desc, image }) {
    const data = new FormData();
    data.append("title", title);
    data.append("desc", desc);
    data.append("image", image);

    const post = await axios.post(APIURL, {
      //method: "post",
      headers: new Headers({
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }),
      //body: JSON.stringify({ posts: payload })
      body: { posts: data }
    });
    //const post = await response.json();

    console.log("post received", post);
    this.setState({
      profiles: [...this.state.posts, post]
    });
    console.log("state", this.state);
  }*/

  render() {
    const posts = this.state.posts
      ? this.state.posts.map(p => {
          return <PostDetail key={p._id} {...p} />;
        })
      : "Loading Posts";

    return (
      <ScrollView>
        <Header headerText="Travelgram" />
        <NewPostForm addPost={this.addPost} />
        {posts}
      </ScrollView>
    );
  }
}

export default Posts;
