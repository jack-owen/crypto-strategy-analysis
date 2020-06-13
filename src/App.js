import React, { Component } from "react";
import "./App.css";
// import Contacts from "./components/contacts.js";
import Calculation from "./components/calculator.js";
import InputForm from "./components/searchInputForm.js";

const buyFrequencyOptions = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};

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
      investmentPerMonth: 100, //+ rename to buyAmount or investmentAmount
      investmentPeriod: {
        startYear: 2018,
        startMonth: 1,
        startDay: 1,
        endYear: 2019,
        endMonth: 12,
        endDay: 1,
      },
      validationError: true,
      buyFrequency: buyFrequencyOptions.monthly,
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
    if (
      prevState.investmentPeriod !== this.state.investmentPeriod ||
      prevState.buyFrequency !== this.state.buyFrequency
    ) {
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

    // select desired frequency of bitcoin records from daily json records (daily, weekly, monthly)
    function frequencySelection(data, buyFrequency) {
      let result = [];
      if (buyFrequency === buyFrequencyOptions.monthly) {
        // select first of the month dates only
        for (const key in data) {
          const day = key[8] + key[9];
          if (day === "01") {
            const value = data[key];
            result.push({
              date: key,
              bpi: value,
            });
          }
        }
      } else if (buyFrequency === buyFrequencyOptions.weekly) {
        // select the following days in each month -> 1, 8, 15, 22, 29
        //* a more advanced method would be to select all dates that fall on a Monday
        for (const key in data) {
          const day = key[8] + key[9];
          if (["01", "08", "15", "22", "29"].includes(day)) {
            const value = data[key];
            result.push({
              date: key,
              bpi: value,
            });
          }
        }
      } else {
        for (const key in data) {
          const value = data[key];
          result.push({
            date: key,
            bpi: value,
          });
        }
      }
      return result;
    }

    fetch(
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
          this.setState({
            isLoaded: true,
            historic_bpi_usd: frequencySelection(
              result.bpi,
              this.state.buyFrequency
            ), //overwrite array
          });
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

  updateInvestmentParameters(props) {
    const name = props.name;
    let value = props.value;
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
    } else if (name === "buyFrequency") {
      // change state of buyFrequency according to the value prop.
      this.setState({
        buyFrequency: value,
      });
    } else {
      // name = startDay, ..., endYear
      let investmentPeriod = { ...this.state.investmentPeriod }; // copy of the nested object to edit
      value = parseInt(value);
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
          console.log(
            "switch statement default was hit, error \nname:" +
              name +
              "\nvalue: " +
              value
          );
      }
      this.setState({ investmentPeriod });
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
        <header className="header">Crypto Historic Strategy Analysis</header>
        <div className="container">
          <div className="key-information">
            <div className="datetime">{this.state.datetime}</div>
            <this.Currency
              currency="gbp"
              amount={this.state.gbp}
            ></this.Currency>
            <this.Currency
              currency="usd"
              amount={this.state.usd}
            ></this.Currency>
          </div>
          <div className="strategyAnalysis">
            <InputForm
              handleStateChange={this.handleStateChange}
              investmentPerMonth={this.state.investmentPerMonth}
              update={this.updateInvestmentParameters}
              investmentPeriod={this.state.investmentPeriod}
              buyFrequency={this.state.buyFrequency}
            ></InputForm>
            <Calculation
              historic_bpi_usd={this.state.historic_bpi_usd}
              investmentPerMonth={this.state.investmentPerMonth}
            />
          </div>
        </div>
        <div className="footer">
          <div className="bpi-disclaimer">{this.state.disclaimer}</div>
        </div>
      </div>
    );
  }
}

export default App;
