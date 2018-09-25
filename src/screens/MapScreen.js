import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MapView } from "expo";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";
import PostDetail from "../components/PostDetail";

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    hide: true,
    region: {
      longitude: -104.991531,
      latitude: 39.742043,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  getLocation = async region => {
    try {
      let zip = await reverseGeocode(region);
    } catch (err) {
      console.log(err);
    }
  };
  onMap = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          onRegionChangeComplete={this.onRegionChangeComplete}
          region={this.state.region}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
export default MapScreen;
