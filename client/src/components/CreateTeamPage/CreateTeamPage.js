import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { validateForm } from "../../utils";
import { errorSelector } from "@/reducers/";
import CreateTeamPage from "./CreateTeamPage.jsx";

class CreateTeamPageContainer extends React.Component {
  state = {
    name: "",
    about: "",
    fieldErrors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    // validate user's login info on client side
    const fieldErrors = validateForm.createTeam(this.state);
    this.setState({ fieldErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      const { fetchCreateTeam, history } = this.props;
      const { name, about } = this.state;
      fetchCreateTeam({ name, about });
      history.push(`/`);
    }
  };

  render() {
    const { fieldErrors, name, about } = this.state;
    const { error } = this.props;

    return (
      <CreateTeamPage
        fieldErrors={fieldErrors}
        name={name}
        about={about}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        error={error}
      />
    );
  }
}

CreateTeamPageContainer.propTypes = {
  fetchCreateTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired
};

const stateToProps = state => ({
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateTeam: teamFormInfo => {
    dispatch(teamAction.fetchCreateTeam(teamFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(CreateTeamPageContainer);
