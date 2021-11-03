import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  getTransactions,
  addAccount,
  deleteAccount
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
// AiOutlineUser
//import Transactions from "./Transactions";
const Transactions = (props) => {
  useEffect(()=> {
    const { accounts } = props;
    props.getTransactions(accounts);
  },[])
  
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
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  
    const { user, accounts } = props;
    const { transactions, transactionsLoading } = props.plaid;
    
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

    // Setting up data table 
    const transactionsColumns = [
      { title: "Account", field: "account" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Name", field: "name" },
      { title: "Amount", field: "amount", type: "numeric" },
      { title: "Category", field: "category" }
    ];
    //console.log(props.plaid);
    let transactionsData = [];
    setTimeout(transactions.forEach(function(account) {
      account.transactions.forEach(function(transaction) {
        transactionsData.push({
          account: account.accountName,
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: transaction.amount
        });
      });
    }),2000);

    return (
     
      <div className="flex flex-row ">
        
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
    </div>
    );
  
}

Transactions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Transactions);
