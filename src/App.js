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
      investmentPerMonth: 100,
      investmentPeriod: {
        startYear: 2018,
        startMonth: 1,
        startDay: 1,
        endYear: 2019,
        endMonth: 12,
        endDay: 1,
      },
      validationError: true,
    };
    this.updateInvestmentParameters = this.updateInvestmentParameters.bind(
      this
    );
  }

  componentDidMount() {
    this.getCurrentBPI();
    this.getHistoricalBPI(this.state.investmentPeriod);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.investmentPeriod !== this.state.investmentPeriod) {
      // console.log("state has changed -> API request");
      this.getHistoricalBPI(this.state.investmentPeriod);
    }
  }

  getCurrentBPI() {
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
  }

  getHistoricalBPI(date) {
    function validate(data) {
      if (data.toString().length === 1) return "0" + data;
      return data;
    }
    // console.log("fetch API request");
    fetch(
      // "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-01-05"
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        date.startYear +
        "-" +
        validate(date.startMonth) +
        "-" +
        validate(date.startDay) +
        "&end=" +
        date.endYear +
        "-" +
        validate(date.endMonth) +
        "-" +
        validate(date.endDay)
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.bpi);
          let updatedArr = [];
          for (const k in result.bpi) {
            // console.log(k, result.bpi[k]);
            if (parseInt(k[8]) === 0 && parseInt(k[9]) === 1) {
              // static 1st of the month check *should be update to become configurable from UI + be set by component State
              updatedArr.push({
                date: k,
                bpi: result.bpi[k],
              });
            }
          }
          this.setState({
            isLoaded: true,
            historic_bpi_usd: updatedArr, //overwrite array
          });
          // console.log(this.state.historic_bpi_usd);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            historic_bpi_usd: [],
            validationError: true,
          });
        }
      );
  }

  getHistoricalBPIold() {
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
            // console.log(result.bpi[2]);
            this.setState({
              isLoaded: true,
              historic_bpi_usd: updatedArr,
            });
            console.log(updatedArr);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
    // console.log(this.state.historic_bpi_usd);
  }

  updateInvestmentPerMonth_old(props) {
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

  updateInvestmentParameters(props) {
    // console.log(props);
    const name = props.name;
    const value = parseInt(props.value);
    if (name === "investmentPerMonth") {
      if (isNaN(parseInt(value))) {
        this.setState({
          investmentPerMonth: 0,
        });
      } else {
        const value = props.value;
        this.setState({
          investmentPerMonth: parseInt(value),
        });
      }
    } else {
      // name = startDay, ..., endYear
      let investmentPeriod = { ...this.state.investmentPeriod }; // copy of the nested object to edit
      switch (name) {
        case "startDay":
          investmentPeriod.startDay = value;
          break;
        case "startMonth":
          investmentPeriod.startMonth = value;
          break;
        case "startYear":
          investmentPeriod.startYear = value;
          break;
        case "endDay":
          investmentPeriod.endDay = value;
          break;
        case "endMonth":
          investmentPeriod.endMonth = value;
          break;
        case "endYear":
          investmentPeriod.endYear = value;
          break;
        default:
          console.log("switch statement default was hit, error");
      }
      this.setState({ investmentPeriod });
      // console.log(investmentPeriod);
    }
  }

  DebugInputForm(props) {
    return (
      <>
        {props.investmentPeriod.startDay}-{props.investmentPeriod.startMonth}-
        {props.investmentPeriod.startYear} to {props.investmentPeriod.endDay}-
        {props.investmentPeriod.endMonth}-{props.investmentPeriod.endYear}{" "}
        calculated monthly
      </>
    );
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
              update={this.updateInvestmentParameters}
              investmentPeriod={this.state.investmentPeriod}
            ></InputForm>
            {/* <this.DebugInputForm
              investmentPeriod={this.state.investmentPeriod}
            /> */}

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
