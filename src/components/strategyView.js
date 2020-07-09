import React, { useState, useEffect } from "react";
import Graph from "../components/graph.js";
import CoindeskAPI from "./../client/coindesk";
import { logDOM } from "@testing-library/react";

const StrategyView = (props) => {
  const [historicBPI, setHistoricalBPI] = useState({
    isLoaded: false,
    bpi_usd: [],
  });
  const [strategyReport, setStrategyReport] = useState([]);

  // update historicalBPI data for the given strategy parameters
  useEffect(() => {
    CoindeskAPI(
      props.strategy.dateStart,
      props.strategy.dateEnd,
      props.strategy.investmentFrequency,
      setHistoricalBPI
    );
  }, [
    props.strategy.dateStart,
    props.strategy.dateEnd,
    props.strategy.investmentFrequency,
  ]);

  // calculate strategy report for the updated historicalBPI data
  useEffect(() => {
    if (!historicBPI.isLoaded) return; // before coindesk api has updated the historical bpi
    setStrategyReport(getStrategyReport(historicBPI, props.strategy));
  }, [historicBPI, props.strategy]);

  function GraphView() {
    // for some reason this function breaks when moved outside of this scope.
    let data = [];
    for (let i = 0; i < strategyReport.length; i++) {
      const item = strategyReport[i];
      data.push({
        name: item.date,
        invested: item.depositTotal_usd,
        worth: item.portfolioValue_usd,
      });
    }
    return <Graph data={data}></Graph>;
  }

  return (
    <>
      <h2>Strategy analysis</h2>
      {/* textual analysis report section here */}
      {props.graphView ? (
        <GraphView />
      ) : (
        <TableView report={strategyReport} historicBPI={historicBPI} />
      )}
    </>
  );
};

const getStrategyReport = (historicBPI, strategy) => {
  let report = [];
  let investmentTotal_btc = 0;
  let investmentTotal_usd = 0; // usd
  historicBPI.bpi_usd.map((item) =>
    report.push({
      portfolioValue_btc: (investmentTotal_btc +=
        (1 / item.bpi) * strategy.investmentAmount),
      portfolioValue_usd: investmentTotal_btc * item.bpi,
      bpi_usd: item.bpi, //eg. $9052.5763 unformatted
      depositTotal_usd: (investmentTotal_usd += strategy.investmentAmount),
      date: item.date, //eg. "2018-02-01"
    })
  );
  return report;
};

function TableView(props) {
  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

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
        {props.report.map((item) => (
          <tr key={item.date}>
            <td>{longToUSD(item.portfolioValue_usd)}</td>
            <td>{item.portfolioValue_btc}</td>
            <td>{longToUSD(item.bpi_usd)}</td>
            <td>{longToUSD(item.depositTotal_usd)}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StrategyView;