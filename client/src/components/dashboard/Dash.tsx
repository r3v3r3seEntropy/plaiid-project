import React from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from 'react-plaid-link';
import axios from "axios";
import {useState,useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  deleteAccount
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";


var adac: (arg0: { public_token: any; metadata: any; }) => void;
var ac: any;
const Dash = (props: { addAccount?: any; accounts?: any; deleteAccount?: any; plaid?: any; user?: any; }) => {
    // Add account
    const [linkToken, setLinkToken] = useState(null);

const generateToken = async () => {
    const response = await fetch('api/plaid/create_link_token', {
      method: 'POST'
    });
    const data = await response.json();

    setLinkToken(data.link_token);
    //console.log(linkToken);
  };
    useEffect(() => {
      generateToken();
    }, [])
    console.log(props);
    adac = props.addAccount;
    ac = props.plaid.accounts;
    //console.log(adac,ac);
// props.getAccount() props
  // Delete account
  const onDeleteClick = (id: any) => {
    const { accounts } = props;
    const accountData = {
      id: id,
      accounts: accounts
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
    let accountItems = accounts.map((account: { _id: React.Key | null | undefined; institutionName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
      <li key={account._id} style={{ marginTop: "1rem" }}>
        <button
          style={{ marginRight: "1rem" }}
          onClick={onDeleteClick.bind(this, account._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <i className="material-icons">delete</i>
        </button>
        <b>{account.institutionName}</b>
      </li>
    ));
    return (
        <div className="ml-20 mainc">
         <br/><br/><br/><br/>
          <h2 >
            <p className="font-bold text-5xl text-indigo-500">Welcome!</p>
          </h2>
          <p className="text-2xl smol">
            Hey there
          </p>
          <h5>
            <b className="text-3xl text-indigo-800">Linked Accounts</b>
          </h5>
          <p className="text-xl smol">
            Add or remove your bank accounts below
          </p>
          <ul className="text-lg">{accountItems}</ul>
          <br/>
          
          { linkToken != null ? <Link {...props} linkToken={linkToken} /> : <></>}

          </div>
    )
}

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
      accounts: ac
    };
    
    adac(plaidData); // props.addAccount(plaidData)
    console.log(public_token,metadata,props);

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

const mapStateToProps = (state: { plaid: any; }) => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Dash);
