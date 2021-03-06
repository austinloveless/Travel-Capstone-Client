import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Linking,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { CommonButton, Card, CardSection } from "./common";
import { Button } from "react-native-elements";
import moment from "moment";
import UserInfo from "./UserInfo";
import EditPost from "./EditPost";

class PostDetail extends Component {
  state = { userInfo: [], toggleForm: true };

  componentWillMount() {
    console.log("posts mounted");
    return fetch("https://infinite-mountain-39369.herokuapp.com/api/users")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ userInfo: responseJson });
      });
  }

  render() {
    const {
      headerContentStyle,
      thumbnailStyle,
      imageContainerStyle,
      headerTextStyle,
      imageStyle,
      timeText,
      descText,
      profileImageStyle,
      buttonStyle2
    } = styles;

    const user = this.state.userInfo
      ? this.state.userInfo.map(user => {
          return <UserInfo key={user._id} {...user} />;
        })
      : null;
    console.log("post detail props", this.props);
    return (
      <Card style={{ paddingTop: 5 }}>
        <CardSection>
          <View>
            <TouchableOpacity onPress={this.props.openMap}>
              <Image
                style={profileImageStyle}
                source={{
                  uri:
                    "https://s3.us-east-2.amazonaws.com/capstone-travel-profile/files/IMG_1011.JPG"
                }}
              />
              <Text style={headerTextStyle}>Austin</Text>
            </TouchableOpacity>
          </View>
          <Button
            buttonStyle={buttonStyle2}
            title="Delete"
            onPress={this.props.onDelete}
          />
        </CardSection>

        <Image style={imageStyle} source={{ uri: this.props.image }} />
        <CardSection>
          <Text style={headerTextStyle}>{this.props.title}</Text>
          <View>
            <Text style={descText}>{this.props.desc}</Text>
          </View>
          <View>
            <Text style={timeText}>
              {moment(this.props.createdAt).fromNow()}
            </Text>
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
    borderRadius: 2
  },
  imageContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0
  },
  imageStyle: {
    height: 450,
    flex: 1,
    width: null
  },
  profileImageStyle: {
    height: 50,
    flex: 1,
    width: null,
    borderRadius: 27
  },
  timeText: {
    marginLeft: 38
  },
  descText: {
    marginLeft: 20
  },
  buttonStyle2: {
    backgroundColor: "red",
    marginTop: 15
  }
};

export default PostDetail;
