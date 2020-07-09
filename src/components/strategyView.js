import React, { useState, useEffect } from "react";
import Graph from "../components/graph.js";
import CoindeskAPI from "./../client/coindesk";

const StrategyView = (props) => {
  const [historicBPI, setHistoricalBPI] = useState({
    isLoaded: false,
    bpi_usd: [],
  });
  const [strategy, setStrategy] = useState(props.strategy);
  const [strategyReport, setStrategyReport] = useState([]);
  const [tableView] = useState(true);

  useEffect(() => {
    CoindeskAPI(
      strategy.dateStart,
      strategy.dateEnd,
      strategy.investmentFrequency,
      setHistoricalBPI
    );
  }, [strategy.dateStart, strategy.dateEnd, strategy.investmentFrequency]);

  useEffect(() => {
    if (!historicBPI.isLoaded) return;
    setStrategyReport(getStrategyReport(historicBPI, strategy));
  }, [historicBPI, strategy]);

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
      {tableView ? <TableView report={strategyReport} /> : <GraphView />}
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
      bpi_usd: item.bpi, //$9052.5763 unformatted
      depositTotal_usd: (investmentTotal_usd += strategy.investmentAmount),
      date: item.date, //"2018-02-01"
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
