import React, { Component } from "react";
import "./App.css";
// import Contacts from "./components/contacts.js";
import Calculation from "./components/calculator.js";
import InputForm from "./components/searchInputForm.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gbp: null,
      usd: null,
      datetime: null,
      contacts: [],
      historic_bpi_usd: [],
      investmentPerMonth: 311,
    };
    this.updateInvestmentPerMonth = this.updateInvestmentPerMonth.bind(this);
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

  updateInvestmentPerMonth(props) {
    if (isNaN(parseInt(props))) {
      this.setState({
        investmentPerMonth: 0,
      });
    } else {
      this.setState({
        investmentPerMonth: parseInt(props),
      });
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

  RecentBPItable({ input }) {
    return (
      <table>
        <thead>
          <tr>
            <th>$</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {input.map((item) => (
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
          <div className="strategyAnalysis">
            {/* <this.RecentBPItable input={this.state.historic_bpi_usd} /> */}
            <InputForm
              handleStateChange={this.handleStateChange}
              investmentPerMonth={this.state.investmentPerMonth}
              update={this.updateInvestmentPerMonth}
            ></InputForm>
            {/* <p>{this.state.investmentPerMonth} iPM</p> */}
            <Calculation
              historic_bpi_usd={this.state.historic_bpi_usd}
              investmentPerMonth={this.state.investmentPerMonth}
            />
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
