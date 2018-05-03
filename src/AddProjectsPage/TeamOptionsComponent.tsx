import * as React from 'react';

class TeamOptionsComponent extends React.Component<{
  allUsers: any;
  user: any;
  onFormChange: any;
  teamFilter: any;
}> {
  render() {
    let teamOptionsComponent: JSX.Element[];
    let usersFromStore = this.props.allUsers!;
    let username = this.props.user.username;
    if (usersFromStore instanceof Array) {
      usersFromStore = usersFromStore.filter(
        user => user.username !== username
      );
      teamOptionsComponent = usersFromStore.map((users: any, index: number) => {
        return (
          <input
            key={'users_' + index}
            type="button"
            name="team"
            value={users.username}
            onClick={this.props.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
    }
    return (
      <div>
        <input
          className="search-input-box"
          type="text"
          placeholder="Search for Teammates"
          id="teamSearch"
          onKeyUp={this.props.teamFilter}
        />
        {teamOptionsComponent!}
      </div>
    );
  }
}

export default TeamOptionsComponent;
