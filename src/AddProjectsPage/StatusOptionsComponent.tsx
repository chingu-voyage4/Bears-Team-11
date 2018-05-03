import * as React from 'react';

class StatusOptionsComponent extends React.Component<{
  onFormChange: any;
}> {
  render() {
    let statusOptionsArray = ['Active', 'Completed'];

    var statusComponent = statusOptionsArray.map(
      (status: string, index: number) => {
        return (
          <input
            key={'status_' + index}
            type="button"
            name="status"
            value={status}
            onClick={this.props.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      }
    );

    return statusComponent;
  }
}
export default StatusOptionsComponent;
