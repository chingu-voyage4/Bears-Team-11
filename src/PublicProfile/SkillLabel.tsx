import * as React from 'react';

class SkillLabel extends React.Component<{ skills: any }, {}> {
  render() {
    var skills = this.props.skills;
    var renderedSkills;
    if (skills === undefined || skills.length === 0) {
      renderedSkills = null;
    } else {
      renderedSkills = skills.map((skill: string, index: number) => {
        return (
          <div className="public-profile-skill" key={'skill_' + index}>
            {skill}
          </div>
        );
      });
    }
    return (
      <div className="public-profile-skill-container">
        <div className="public-profile-header">Skills</div>
        {renderedSkills}
      </div>
    );
  }
}

export default SkillLabel;
