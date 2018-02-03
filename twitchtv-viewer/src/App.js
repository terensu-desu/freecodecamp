import React, { Component } from "react";

import Loading from "./Loading";
import ChannelList from "./ChannelList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      names: ["esl_csgo", "freecodecamp", "sgthegg"],
      data: [
        { lookup_name: "esl_csgo" },
        { lookup_name: "freecodecamp" },
        { lookup_name: "sgthegg" }
      ]
    };
    this.requestAllData = this.requestAllData.bind(this);
  }

  componentWillMount() {
    this.requestAllData();
  }

  requestAllData() {
    const streamsUrl = "https://wind-bow.glitch.me/twitch-api/streams/";
    const usersUrl = "https://wind-bow.glitch.me/twitch-api/users/";
    for (var x = 0; x < this.state.names.length; x++) {
      axios
        .get(streamsUrl + this.state.names[x])
        .then(streamData => {
          const channel = streamData.data._links.channel.substr(
            streamData.data._links.channel.lastIndexOf("/") + 1
          );
          let streamDataObj = this.state.data.find(
            o => o.lookup_name === channel
          );
          !streamData.data.stream
            ? (streamDataObj.status = "Offline")
            : (streamDataObj.data = streamData.data);
          this.setState({
            data: this.state.data.map(
              channelObj =>
                channelObj.lookup_name === channel
                  ? { ...channelObj, ...streamDataObj }
                  : channelObj
            )
          });
        })
        .catch(error => {
          console.log("Error at streamData request:", error);
        });
      axios
        .get(usersUrl + this.state.names[x])
        .then(userData => {
          this.setState({
            data: this.state.data.map(
              channelObj =>
                channelObj.lookup_name === userData.data.name
                  ? { ...channelObj, ...userData.data }
                  : channelObj
            )
          });
        })
        .catch(error => {
          console.log("Error at userData request:", error);
        });
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  render() {
    return (
      <div className="container">
        <div className="row no-margin-bot">
          <div className="col s12 center">
            <div className="card-panel card-round">
              <img
                alt="twitch logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Twitch_logo_%28wordmark_only%29.svg/300px-Twitch_logo_%28wordmark_only%29.svg.png"
              />
              <h5>See what's happening on Twitch.tv!</h5>
              <h5>
                by <span>Terence Mangram</span> for FreeCodeCamp
              </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {this.state.loading ? (
              <Loading />
            ) : (
              <ChannelList displayData={this.state.data} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
