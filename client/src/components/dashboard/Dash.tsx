import React from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  getAccounts,
  deleteAccount,
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";

var adac: (arg0: { public_token: any; metadata: any }) => void;
var ac: any;
var veryUniqueId;
const Dash = (props: {
  addAccount?: any;
  accounts?: any;
  getAccounts?: any;
  deleteAccount?: any;
  plaid?: any;
  user?: any;
}) => {
  // Add account
  const [linkToken, setLinkToken] = useState(null);
  const [decoded, setdecoded] = useState(null);
  const generateToken = async () => {
    const token = localStorage.jwtToken;

    var newToken = token.substring(7); // used to remove the Bearer string and space from the token so that
    //it consists of only header,payload and signature.
    veryUniqueId = parseJWT(newToken).id;
    console.log(veryUniqueId);
    setdecoded(veryUniqueId);
    const response = await fetch("api/plaid/create_link_token", {
      method: "POST",
      body: JSON.stringify({ ids: decoded }),
    });
    const data = await response.json();

    setLinkToken(data.link_token);
    //console.log(linkToken);
  };
  const parseJWT = (tkn: string) => {
    var base64Url = tkn.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
  useEffect(() => {
    generateToken();

    props.getAccounts();
  }, [decoded]);
  console.log(props);
  adac = props.addAccount;
  ac = props.plaid.accounts;
  //console.log(adac,ac);
  // props.getAccount() props
  // Delete account

  const onDeleteClick = (id: any) => {
    const { accounts } = props.plaid;
    const accountData = {
      id: id,
      accounts: accounts,
    };
    props.deleteAccount(accountData);
  };

  // Logout

  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance

  // const { open, exit, ready } = usePlaidLink(config);

  const { user } = props.plaid;
  //generateToken();
  const accounts = props.plaid.accounts;
  let accountItems =
    accounts === undefined
      ? ""
      : accounts.map(
          (account: {
            _id: React.Key | null | undefined;
            institutionName:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <li
              key={account._id}
              style={{ width: "100%" }}
              className="border-2 border-black p-4"
            >
              {/* <button
                style={{ marginRight: "1rem" }}
                onClick={onDeleteClick.bind(this, account._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <i className="material-icons">delete</i>
              </button> */}
              {/* <p>
                <b className="text-xl">{account.institutionName}</b> delete
              </p> */}
              <div
                className="flex flex-row"
                style={{ justifyContent: "space-between" }}
              >
                <b style={{ width: "80%" }}>{account.institutionName}</b>
                <p
                  className="text-blue-700"
                  onClick={onDeleteClick.bind(this, account._id)}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </p>
              </div>
            </li>
          )
        );
  return (
    <div
      className="flex flex-row mainc ml-10"
      style={{ justifyContent: "space-between", marginRight: "20%" }}
    >
      <div>
        <br />
        Fantastic!
        <br />
        <br />
        <p className="text-gray-500">
          Next, which bank does your business use?
        </p>
        <br />
        {linkToken != null && decoded != null ? (
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link {...props} linkToken={linkToken} />
          </button>
        ) : (
          <h3 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Loading..
          </h3>
        )}
      </div>
      <div style={{ width: "50%", justifyContent: "center" }}>
        {accountItems.length > 0 ? (
          <div>
            You're all set!
            <br />
            <br />
            <p className="text-gray-500">
              Below are systems you mapped to ClaimYourAid.com:
            </p>
            <br />
            <ul style={{ width: "60%", margin: "auto" }} className="text-lg">
              {accountItems}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    //const { accounts } = props;
    const plaidData = {
      public_token: public_token,
      metadata: metadata,
      accounts: ac,
    };

    adac(plaidData); // props.addAccount(plaidData)
    console.log(public_token, metadata, props);

    // const response = fetch('api/plaid/accounts/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ public_token,metadata }),
    // });
    // Handle response ...
  }, []);
  const configg: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(configg);
  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>
    </>
  );
};
Dash.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  // accounts: PropTypes.array.isRequired,
  // plaid: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired
};

const mapStateToProps = (state: { plaid: any }) => ({
  plaid: state.plaid,
});

export default connect(mapStateToProps, {
  logoutUser,
  getTransactions,
  getAccounts,
  addAccount,
  deleteAccount,
})(Dash);
