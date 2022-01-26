import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
import LogoHeader from "../layout/LogoHeader";

import { registerUser } from "../../actions/authActions";
import Select from "react-select";
const states = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: "California", label: "California" },
  { value: "Colorado", label: "Colorado" },
  { value: "Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: "Florida", label: "Florida" },
  { value: "Georgia", label: "Georgia" },
  { value: "Hawaii", label: "Hawaii" },
  { value: "Idaho", label: "Idaho" },
  { value: "Illinois", label: "Illinois" },
  { value: "Indiana", label: "Indiana" },
  { value: "Iowa", label: "Iowa" },
  { value: "Kansas", label: "Kansas" },
  { value: "Kentucky", label: "Kentucky" },
  { value: "Louisiana", label: "Louisiana" },
  { value: "Maine", label: "Maine" },
  { value: "Maryland", label: "Maryland" },
  { value: "Massachusetts", label: "Massachusetts" },
  { value: "Michigan", label: "Michigan" },
  { value: "Minnesota", label: "Minnesota" },
  { value: "Mississippi", label: "Mississippi" },
  { value: "Missouri", label: "Missouri" },
  { value: "Montana", label: "Montana" },
  { value: "Nebraska", label: "Nebraska" },
  { value: "Nevada", label: "Nevada" },
  { value: "New Hampshire", label: "New Hampshire" },
  { value: "New Jersey", label: "New Jersey" },
  { value: "New Mexico", label: "New Mexico" },
  { value: "New York", label: "New York" },
  { value: "North Carolina", label: "North Carolina" },
  { value: "North Dakota", label: "North Dakota" },
  { value: "Ohio", label: "Ohio" },
  { value: "Oklahoma", label: "Oklahoma" },
  { value: "Oregon", label: "Oregon" },
  { value: "Pennsylvania", label: "Pennsylvania" },
  { value: "Rhode Island", label: "Rhode Island" },
  { value: "South Carolina", label: "South Carolina" },
  { value: "South Dakota", label: "South Dakota" },
  { value: "Tennessee", label: "Tennessee" },
  { value: "Texas", label: "Texas" },
  { value: "Utah", label: "Utah" },
  { value: "Vermont", label: "Vermont" },
  { value: "Virginia", label: "Virginia" },
  { value: "Washington", label: "Washington" },
  { value: "West Virginia", label: "West Virginia" },
  { value: "Wisconsin", label: "Wisconsin" },
  { value: "Wyoming", label: "Wyoming" },
];
var selectedStates = null;
class Company extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      ein: "",
      errors: {},
      selectedOptions: null,
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
    // }; [{_id:,accounts:[user.find(itemId:_id_).acces_token).transactions.get(start,endtate)]},{},{}]
    // chima -> chase,boa
    // fetch('/api/plaid/getemail',{
    //   method: 'POST',
    //   body: JSON.stringify({email:userData.email})
    // }).then();
    //axios.post("/api/plaid/CreateCompany", this.state);
    const companyData = {
      name: this.state.name,
      ein: this.state.ein,
      states: selectedStates,
    };
    axios.post("/api/plaid/CreateCompany", companyData);
    this.props.registerUser(this.props.history.nusr, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const handleSelectChange = (event) => {
      const curstates = [];
      event.map((event) => {
        curstates.push(event.value);
      });
      selectedStates = curstates;
    };
    return (
      <>
        <LogoHeader />
        <div className="container flex ">
          <div
            style={{ marginTop: "0.25rem" }}
            className="max-w-xs w-full m-auto bg-green-100 rounded p-5"
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
                  <label className="block mb-2 text-green-500">
                    Official Company name
                  </label>

                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.email}
                    id="name"
                    type="text"
                    className={classnames(
                      "w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300",
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
                  <label className="block mb-2 text-green-500">
                    EIN Number
                  </label>

                  <input
                    onChange={this.onChange}
                    value={this.state.ein}
                    error={errors.password}
                    id="ein"
                    type="number"
                    className={classnames(
                      "w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300",
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
                <label className="block mb-2 text-green-500">States</label>

                <Select
                  isMulti
                  options={states}
                  onChange={handleSelectChange}
                />
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
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
