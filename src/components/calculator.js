import React, { useState, useEffect } from "react";

const Calculation = ({ historic_bpi_usd, investmentPerMonth }) => {
  const [analysis, setAnalysis] = useState("loading");
  const [monthlyInvestmentAmount, setMonthlyInvestmentAmount] = useState(200);

  let accumulative = [];
  let btc_aggregate = 0;
  let rate_usd;
  let cummulative_investment = 0;

  historic_bpi_usd.map(function (item) {
    btc_aggregate += (1 / Object.values(item)) * investmentPerMonth;
    rate_usd = Object.values(item)[0];
    console.log(investmentPerMonth);
    accumulative.push({
      date: Object.keys(item)[0], //"2018-02-01"
      rate_usd: longToUSD(rate_usd), //$9052.5763
      btc_amount: (1 / Object.values(item)) * investmentPerMonth, //0.022093158165372214 BTC
      btc_aggregate: btc_aggregate,
      btc_aggregate_usd: longToUSD(btc_aggregate * rate_usd),
      btc_aggregate_usd_unformatted: btc_aggregate * rate_usd,

      cummulative_investment: (cummulative_investment += investmentPerMonth),
    });
  });

  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  // useEffect(() => {
  //   document.title = `You clicked 22 times`;
  //   if (accumulative.length !== 0) {
  //     const obj = accumulative[accumulative.length - 1];
  //     setAnalysis(obj.date + " " + obj.rate_usd + " " + obj.btc_aggregate);
  //   }
  // }, [accumulative]);

  function Analysis() {
    if (accumulative.length === 0) {
      return <p>no data</p>;
    }

    /* write a profit report, pct loss/gain, net loss/gain */
    const obj = accumulative[accumulative.length - 1];
    const netGain =
      obj.btc_aggregate_usd_unformatted - obj.cummulative_investment;

    let profit;
    netGain > 0
      ? (profit = "A profit was made of ")
      : (profit = "A loss was made of ");

    return (
      <div>
        <p>
          {profit}
          {longToUSD(netGain)}
        </p>
        <p>
          {obj.btc_aggregate_usd} final portfolio value
          <br />
          {longToUSD(obj.cummulative_investment)} Cuumulative investment total
        </p>
      </div>
    );
  }

  return (
    <div className="calculations">
      {/* Investment strategy analysis */}
      <div className="investment_strategy_analysis">
        <h3>Investment Strategy Analysis</h3>
        <h5>invest {longToUSD(investmentPerMonth)} every month</h5>

        <Analysis />
      </div>
      <table>
        <thead>
          <tr>
            <th>Portfolio Value USD</th>
            <th>Portfolio Value BTC</th>
            <th>BTC Rate</th>
            <th>Cuumulative Invested</th>
            <th>Invested USD</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {accumulative.map((item) => (
            <tr key={item.date}>
              {/*Portfolio Value*/}
              <td>{item.btc_aggregate_usd}</td>
              <td>{item.btc_aggregate}</td>
              {/*BTC Rate*/}
              <td>{item.rate_usd}</td>
              {/*Invested*/}
              <td>{longToUSD(item.cummulative_investment)}</td>
              <td>{longToUSD(investmentPerMonth)}</td>
              {/*Date*/}
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function StrategyAnalysis(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

export default Calculation;
