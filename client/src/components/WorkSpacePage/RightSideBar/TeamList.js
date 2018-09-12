import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";

class TeamList extends React.Component {
  handleClick = teamId => {
    const { getTeam, getTeamAssociatedList } = this.props;
    getTeam(teamId);
    getTeamAssociatedList(teamId);
  };

  render() {
    const { teamList } = this.props;
    return (
      <React.Fragment>
        {teamList.map((team, i) => (
          <Link
            className="rightsidebar__list__link"
            key={`index${i}teamid${team.id}`}
            to={`/workspace/channel/${team.id}`}
            onClick={this.handleClick.bind(this, team.id)}
          >
            <li className="rightsidebar__list__link__item">
              {team.name.charAt(0).toUpperCase()}
            </li>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}

TeamList.propTypes = {
  teamList: PropTypes.array
};

const stateToProps = state => ({
  teamList: state.teamReducer.teamList,
  error: state.teamReducer.error
});

const dispatchToProps = dispatch => ({
  getTeam: teamId => {
    dispatch(teamAction.getTeam(teamId));
  },
  getTeamAssociatedList: teamId => {
    dispatch(teamAction.getTeamAssociatedList(teamId));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(TeamList);
