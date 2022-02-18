import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import LogoHeader from "../layout/LogoHeader";
class Register2 extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      cell: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dash");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dash");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props, this.state);
    var fulluser = this.props.location.state;

    fulluser.fname = this.state.fname;
    fulluser.lname = this.state.lname;
    fulluser.cell = this.state.cell;

    this.props.history.push({
      pathname: "/company",
      state: fulluser,
    });
  };

  render() {
    return (
      <div>
        <LogoHeader />
        <div className="ml-20">
          <p>Thank you for registering for ClaimYourAid.com!</p>

          <p className="mt-10 text-gray-500">
            Next, may we request your details
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <label htmlFor="fname" className="block mb-2 text-green-500">
                First Name
              </label>

              <input
                onChange={this.onChange}
                value={this.state.name}
                id="fname"
                type="text"
                className={classnames(
                  "w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
                )}
              />
            </div>
            <div className="input-field col s12">
              <label htmlFor="lname" className="block mb-2 text-green-500">
                Last Name
              </label>

              <input
                onChange={this.onChange}
                value={this.state.email}
                id="lname"
                type="text"
                className={classnames(
                  "w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
                )}
              />
            </div>
            <div className="input-field col s12">
              <label htmlFor="cell" className="block mb-2 text-green-500">
                Cell Phone number
              </label>

              <input
                onChange={this.onChange}
                value={this.state.password}
                id="cell"
                type="text"
                className={classnames(
                  "w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
                )}
              />
            </div>

            <div className="col" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="w-full bg-green-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-1 rounded"
              >
                Click here to continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register2.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(Register2)
);
