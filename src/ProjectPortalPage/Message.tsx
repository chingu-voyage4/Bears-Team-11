import * as React from 'react';
import * as moment from 'moment';
// import axios from 'axios';
// import host from '../hostname';
interface MessageProps {
  creator: string;
  createdAt: string;
  comment: string;
}

interface MessageState {
  thumbnailURL: string;
}
class Message extends React.PureComponent<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      thumbnailURL: ''
    };
  }
  componentDidMount() {
    // FIX NEEDED: API for fetching user images broken due to recent changes
    // axios
    //   .get(
    //     host + `/api/user/${this.props.creator}/profile/picture`
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
