import * as React from 'react';
import * as moment from 'moment';
// import axios from 'axios';

// FIX NEEDED: API for fetching user images broken due to recent changes
class Message extends React.PureComponent<
  {
    creator: string;
    createdAt: string;
    comment: string;
  },
  { thumbnailURL: string }
> {
  constructor(props: { creator: string; createdAt: string; comment: string }) {
    super(props);

    this.state = {
      thumbnailURL: ''
    };
  }
  componentDidMount() {
    // axios
    //   .get(
    //     `http://localhost:8080/api/user/${this.props.creator}/profile/picture`
    //   )
    //   .then(response => {
    //     this.setState({
    //       thumbnailURL: response.data.profileImage
    //     });
    //   });
  }

  render() {
    return (
      <div className="message">
        {/* <img
          className="message__thumbnail"
          src={this.state.thumbnailURL}
          alt=""
        /> */}
        <div className="message__body">
          <h3 className="message__sender">
            {this.props.creator}{' '}
            <span className="message__time">
              {moment(this.props.createdAt).calendar()}
            </span>
          </h3>
          <p className="message__text">{this.props.comment}</p>
        </div>
      </div>
    );
  }
}

export default Message;
