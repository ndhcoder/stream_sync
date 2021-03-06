import React from "react";
import "../css/App.css";
import Navbar from "./Navbar";
import { createConnection } from "../utils/webRTC_utils";
import { Redirect } from "react-router-dom";
import { store_data } from "../utils/data_storage_utils";
class Host extends React.Component {
  state = {
    user_name: "",
    youtube_video_id: "",
    host_peer_id: null,
    is_host: true,
    submitted: false
  };
  handleSubmit = e => {
    e.preventDefault();
    var video_id = this.parseIdFromURL(e.target.youtubeLink.value);
    console.log(e.target.onlyHost.checked);
    this.setState({
      user_name: e.target.userName.value,
      youtube_video_id: video_id,
      only_host_controls: e.target.onlyHost.checked,
      submitted: true
    });
    createConnection(this, true);
  };
  parseIdFromURL = url => {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return false;
    }
  };
  render() {
    console.log(this.state.host_peer_id);
    if (this.state.host_peer_id) {
      store_data(this.state.host_peer_id, this.state);

      return (
        <Redirect
          push
          to={{
            pathname: "party/" + this.state.host_peer_id,
            state: this.state
          }}
        ></Redirect>
      );
    }
    return (
      <>
        <Navbar></Navbar>

        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="card box">
                  <div className="card-content">
                    <form onSubmit={this.handleSubmit} className="room_name">
                      <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                          <input
                            className="input"
                            ref={this.hostUserName}
                            placeholder="Please enter your username"
                            type="text"
                            name="userName"
                            required
                          ></input>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Youtube Link</label>
                        <div className="control">
                          <input
                            className="input"
                            ref={this.youtubeLinkRef}
                            placeholder="The Youtube link to be shared"
                            type="url"
                            name="youtubeLink"
                            required
                          ></input>
                        </div>
                      </div>

                      <div className="field">
                        <label class="checkbox">
                          <input
                            type="checkbox"
                            name="onlyHost"
                            ref={this.onlyHostRef}
                          />
                          &nbsp;Only allow host to control video
                        </label>
                      </div>
                      <div className="buttons is-right">
                        <button
                          className={
                            "button is-primary" +
                            (this.state.submitted ? " is-loading" : "")
                          }
                        >
                            🥳 Party
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Host;
