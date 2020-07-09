/* src/App.js */
import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createStrategy } from "./graphql/mutations";
import { listStrategys } from "./graphql/queries";
// import StrategyAnalysis from "./components/strategyAnalysis.js";
// import InputForm from "./components/searchInputForm.js";
import StrategyView from "./components/strategyView";
import StrategyRules from "./components/strategyRules";

const buyFrequencyOptions = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};
const initialStrategy = {
  dateStart: "2018-11-11",
  dateEnd: "2019-05-02",
  investmentAmount: 200.1,
  investmentFrequency: buyFrequencyOptions.monthly,
};

const App = () => {
  const [strategies, setStrategies] = useState([]);
  const [loadedStrategy, setLoadedStrategy] = useState(initialStrategy);
  const [graphView, setGraphView] = useState(true); // graph vs table views

  useEffect(() => {
    fetchStrategies();
  }, []);

  async function fetchStrategies() {
    try {
      const data = await API.graphql(graphqlOperation(listStrategys));
      // const strategies = data.data.listStrategys.items;
      setStrategies(data.data.listStrategys.items);
    } catch (err) {
      console.log("error fetching strategies");
    }
  }

  async function handleAddStrategy() {
    console.log("adding strategy");
    try {
      const dummyPayload = {
        dateStart: "2018-11-11",
        dateEnd: "2019-05-02",
        investmentAmount: 200.1,
        investmentFrequency: "MONTHLY",
      };
      setStrategies([...strategies, dummyPayload]);
      await API.graphql(
        graphqlOperation(createStrategy, { input: dummyPayload })
      );
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div className={"App"}>
      <div className={"saved-strategies"} style={styles.container}>
        <h2>Strategy</h2>
        <button style={styles.button} onClick={handleAddStrategy}>
          Save Strategy
        </button>
        {/* onclick load strategy function to view */}
        {strategies.map((item) => (
          <>
            <p>
              {item.dateStart} to {item.dateEnd} for ${item.investmentAmount}{" "}
              every {item.investmentFrequency}
            </p>
          </>
        ))}
      </div>
      {/* configuration strategy inputs, view toggle + more, states will be held in this function */}
      <StrategyRules
        strategy={loadedStrategy}
        handleChange={setLoadedStrategy}
        graphView={graphView}
        setGraphView={setGraphView}
      />
      {/* graph view/table views (pass all props to caleld function), 
      this func can manage the view state default is graph. */}
      <StrategyView strategy={loadedStrategy} graphView={graphView} />
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "darkblue",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default App;
