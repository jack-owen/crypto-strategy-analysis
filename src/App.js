import React, { Component } from "react";
import "./App.css";
// import Contacts from "./components/contacts.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gbp: null,
      usd: null,
      datetime: null,
    };
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    fetch("https://api.coindesk.com/v1/bpi/currentprice/gbp.json")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            gbp: result.bpi.GBP.rate,
            usd: result.bpi.USD.rate,
            datetime: result.time.updateduk,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    fetch("http://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ contacts: data });
      })
      .catch(console.log);
  }

  Currency({ currency = "null", amount = "null" }) {
    return (
      <div className={currency} style={!currency ? { color: "red" } : {}}>
        {currency}: {currency === "gbp" ? "£" : "$"}
        {amount ? amount : "error"}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Crypto Portfolio Tracker</header>
        <div className="App-container">
          <div className="datetime">{this.state.datetime}</div>
          <this.Currency currency="gbp" amount={this.state.gbp}></this.Currency>
          <this.Currency currency="usd" amount={this.state.usd}></this.Currency>
        </div>
        {/* <Contacts contactss={this.state.contacts} foaas="sss" /> */}
      </div>
    );
  }
}

export default App;
