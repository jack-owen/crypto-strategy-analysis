// import React, { useState, useEffect } from "react";
import React from "react";
// import { render } from "@testing-library/react";
import Graph from "../components/graph.js";

const StrategyAnalysis = ({ historic_bpi_usd, investmentPerMonth }) => {
  // const [analysis, setAnalysis] = useState("loading");
  // const [monthlyInvestmentAmount, setMonthlyInvestmentAmount] = useState(200);

  let accumulative = [];
  let btc_cummulative = 0;
  // let rate_usd;
  let cummulative_investment = 0;

  historic_bpi_usd.map(function (item) {
    btc_cummulative += (1 / item.bpi) * investmentPerMonth; // add this transaction/order to cummulative BTC total
    accumulative.push({
      date: item.date, //"2018-02-01"
      rate_usd: item.bpi, //$9052.5763 unformatted
      btc_amount_single_order: (1 / item.bpi) * investmentPerMonth, //0.022093158165372214 BTC unformatted
      btc_cummulative: btc_cummulative, //
      btc_cummulative_usd: btc_cummulative * item.bpi,
      cummulative_investment_usd: (cummulative_investment += investmentPerMonth),
    });
    return null;
  });

  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  function Analysis() {
    if (accumulative.length === 0) {
      return <p>no data</p>;
    }

    /* write a profit report, pct loss/gain, net loss/gain */
    const obj = accumulative[accumulative.length - 1];
    const netGain = obj.btc_cummulative_usd - obj.cummulative_investment_usd;

    let profitLoss;
    netGain > 0 ? (profitLoss = "profit") : (profitLoss = "loss");
    return (
      <div>
        <h3>Investment Strategy Analysis</h3>
        <>
          If you invested {longToUSD(investmentPerMonth)} each month for{" "}
          {accumulative.length - 1} Months since{" "}
          {accumulative[0].date[0] +
            accumulative[0].date[1] +
            accumulative[0].date[2] +
            accumulative[0].date[3]}{" "}
          you would have made a{" "}
          <strong className="profitLossType">{profitLoss}</strong> of{" "}
          {longToUSD(netGain)}, totaling a{" "}
          {((netGain / obj.cummulative_investment_usd) * 100).toFixed(1)}%
          return.
        </>
        <p>
          {longToUSD(obj.btc_cummulative_usd)} final portfolio value
          <br />
          {longToUSD(obj.cummulative_investment_usd)} investment total
        </p>
      </div>
    );
  }

  function GraphView() {
    let data = [];
    for (let i = 0; i < accumulative.length; i++) {
      const obj = accumulative[i];
      data.push({
        name: obj.date,
        invested: obj.cummulative_investment_usd,
        worth: obj.btc_cummulative_usd,
      });
    }

    // const data2 = [
    //   { name: "day1", invested: 400, worth: 400 },
    //   { name: "day2", invested: 450, worth: 470 },
    //   { name: "day3", invested: 500, worth: 490 },
    //   { name: "day4", invested: 550, worth: 600 },
    // ];

    return <Graph data={data}></Graph>;
  }

  function TableView(data) {
    return (
      <table>
        <thead>
          <tr>
            <th>Portfolio Value USD</th>
            <th>Portfolio Value BTC</th>
            <th>BTC Rate</th>
            <th>Cuumulative Invested</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {accumulative.map((item) => (
            <tr key={item.date}>
              {/*Portfolio Value*/}
              <td>{longToUSD(item.btc_cummulative_usd)}</td>
              <td>{item.btc_cummulative}</td>
              {/*BTC Rate*/}
              <td>{longToUSD(item.rate_usd)}</td>
              {/*Invested*/}
              <td>{longToUSD(item.cummulative_investment_usd)}</td>
              {/*Date*/}
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="calculations">
      {/* Investment strategy analysis */}
      <div className="investment_strategy_analysis">
        <Analysis />
        <GraphView />
        <TableView />
      </div>
    </div>
  );
};

export default StrategyAnalysis;
