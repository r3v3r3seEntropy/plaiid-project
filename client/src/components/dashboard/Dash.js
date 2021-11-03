import React from "react";
import PlaidLinkButton from "react-plaid-link-button";
const Dash = (props) => {
    // Add account
  const handleOnSuccess = (token, metadata) => {
    const { accounts } = props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts
    };

    props.addAccount(plaidData);
  };

  // Delete account
  const onDeleteClick = id => {
    const { accounts } = props;
    const accountData = {
      id: id,
      accounts: accounts
    };
    props.deleteAccount(accountData);
  };

  // Logout
  

  
    const { user, accounts } = props;
    
    
    let accountItems = accounts.map(account => (
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
            Hey there, {user.name.split(" ")[0]}
          </p>
          <h5>
            <b className="text-3xl text-indigo-800">Linked Accounts</b>
          </h5>
          <p className="text-xl smol">
            Add or remove your bank accounts below
          </p>
          <ul className="text-lg">{accountItems}</ul>
          <br/>
          <PlaidLinkButton
            
            buttonProps={{
              className:
                "rounded px-4 py-2 text-xs border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-blue-100 duration-300"
            }}
            plaidLinkProps={{
              clientName: "YOUR_APP_NAME",
              key: "4508d464022e7606f19a772439b37c",
              env: "sandbox",
              product: ["transactions"],
              onSuccess: handleOnSuccess
            }}
            // onScriptLoad={() => setState({ loaded: true })}
          >
            Add Account
          </PlaidLinkButton>
          </div>
    )
}

export default Dash
