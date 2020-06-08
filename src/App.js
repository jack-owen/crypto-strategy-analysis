import React, { Component } from "react";
import "./App.css";
// import Contacts from "./components/contacts.js";
import Calculation from "./components/calculator.js";

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
    this.state = {
      historic_bpi_usd: [],
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
            disclaimer: result.disclaimer,
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

    for (let i = 1; i <= 12; i++) {
      let mm;
      i.toString().length === 1 ? (mm = "0" + i) : (mm = i); //add leading 0 for single digit values
      fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-" +
          mm +
          "-01&end=2018-" +
          mm +
          "-01"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            let updatedArr = this.state.historic_bpi_usd.concat(result.bpi);
            this.setState({
              isLoaded: true,
              historic_bpi_usd: updatedArr,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
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
        <header className="header">Crypto Portfolio Tracker</header>
        <div className="container">
          <div className="datetime">{this.state.datetime}</div>
          <this.Currency currency="gbp" amount={this.state.gbp}></this.Currency>
          <this.Currency currency="usd" amount={this.state.usd}></this.Currency>
          <div className="historic-bpi">
            <table>
              <thead>
                <tr>
                  <th>$</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.historic_bpi_usd.map((item) => (
                  <tr key={Object.keys(item)}>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Object.values(item))}
                    </td>
                    <td>{Object.keys(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Calculations */}
            <Calculation
              historic_bpi_usd={this.state.historic_bpi_usd}
            ></Calculation>
          </div>
        </div>
        {/* <Contacts contacts={this.state.contacts} foaas="sss" /> */}
        <div className="footer">
          <div className="bpi-disclaimer">{this.state.disclaimer}</div>
        </div>
      </div>
    );
  }
}

export default App;
