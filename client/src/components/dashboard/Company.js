import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
import { registerUser } from "../../actions/authActions";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      ein: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Company page, should redirect them to dashboard
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
    //console.log(this.state.email,this.state.password);
  };

  onSubmit = (e) => {
    e.preventDefault();

    // const userData = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };

    // fetch('/api/plaid/getemail',{
    //   method: 'POST',
    //   body: JSON.stringify({email:userData.email})
    // }).then();
    //axios.post("/api/plaid/CreateCompany", this.state);
    this.props.registerUser(this.props.history.nusr, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container flex h-screen ">
        <h1>
          Lets create your company profile so we can match Grants, Credits, and
          Refunds to your business
        </h1>
        <div
          style={{ marginTop: "4rem" }}
          className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5"
        >
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
            <br />
            <br />
            <div className="text-xl col s12">
              <h4>
                <b>Company Profile</b>
              </h4>
            </div>
            <br />
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <label className="block mb-2 text-indigo-500">
                  Official Company name
                </label>

                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.email}
                  id="email"
                  type="text"
                  className={classnames(
                    "w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300",
                    {
                      invalid: errors.email || errors.emailnotfound,
                    }
                  )}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <label className="block mb-2 text-indigo-500">EIN Number</label>

                <input
                  onChange={this.onChange}
                  value={this.state.ein}
                  error={errors.password}
                  id="ein"
                  type="number"
                  className={classnames(
                    "w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300",
                    {
                      invalid: errors.password || errors.passwordincorrect,
                    }
                  )}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Company);
