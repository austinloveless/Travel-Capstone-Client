import React from "react";
import { Text, View, Image, Linking } from "react-native";
import { Button, Card, CardSection } from "./common";

const AlbumDetail = ({ title, desc, createdAt, image, liked }) => {
  const {
    headerContentStyle,
    thumbnailStyle,
    imageContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;
  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{ url: image }} />
      </CardSection>
      <CardSection>
        <Text>{desc}</Text>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 2
  },
  imageContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default AlbumDetail;
