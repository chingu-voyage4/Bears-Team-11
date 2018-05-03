import * as React from 'react';

class ChosenTeam extends React.Component<{
  team: any;
  handleOptionRemoval: any;
}> {
  render() {
    let chosenTeam;
    let team = Object.assign([], this.props.team);
    if (team.length === 0) {
      chosenTeam = null;
    } else {
      if (team.length === 1) {
        chosenTeam = (
          <div className="tag-container" key={1}>
            <input
              type="button"
              className="new-project-chosen-tag"
              value={team}
            />
            <button
              type="button"
              className="remove-tag-btn"
              onClick={e =>
                this.props.handleOptionRemoval(
                  e,
                  'team',
                  Object.assign([], this.props.team)
                )
              }
            >
              X
            </button>
          </div>
        );
      } else {
        chosenTeam = team.map((teamMemeber: string, index: number) => {
          return (
            <div className="tag-container" key={index}>
              <input
                type="button"
                className="new-project-chosen-tag"
                value={teamMemeber}
              />
              <button
                type="button"
                className="remove-tag-btn"
                onClick={e =>
                  this.props.handleOptionRemoval(
                    e,
                    'team',
                    Object.assign([], this.props.team)
                  )
                }
              >
                X
              </button>
            </div>
          );
        });
      }
    }
    return chosenTeam;
  }
}

export default ChosenTeam;
