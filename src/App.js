/* src/App.js */
import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createStrategy } from "./graphql/mutations";
import { listStrategys } from "./graphql/queries";
// import StrategyAnalysis from "./components/strategyAnalysis.js";
// import InputForm from "./components/searchInputForm.js";
import StrategyView from "./components/strategyView";
import StrategyControl from "./components/strategyControl";
import SavedStrategies from "./components/savedStrategies";

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
  const [savedStrategies, setSavedStrategies] = useState([]);
  const [loadedStrategy, setLoadedStrategy] = useState({
    loaded: false,
    id: "",
    dateStart: "",
    dateEnd: "",
    investmentAmount: "",
    investmentFrequency: "",
  });
  console.log(localStorage.getItem("graphView"));

  const [graphView, setGraphView] = useLocalStorage("graphView", true); // persist state between page refresh graph vs table views

  useEffect(() => {
    fetchStrategies();
  }, []);

  async function fetchStrategies() {
    try {
      const data = await API.graphql(graphqlOperation(listStrategys));
      setSavedStrategies(data.data.listStrategys.items);
      const item = data.data.listStrategys.items[0];
      setLoadedStrategy({
        loaded: true, //! this may break something else, by now using a string instead of boolean
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        investmentAmount: item.investmentAmount,
        investmentFrequency: item.investmentFrequency,
      });
    } catch (err) {
      console.log("error fetching strategies");
    }
  }

  return (
    <div className={"App"}>
      <div className={"saved-strategies"} style={styles.container}>
        <h2>Strategy</h2>
        {/* onclick load strategy function to view */}
      </div>
      <SavedStrategies
        savedStrategies={savedStrategies}
        setSavedStrategies={setSavedStrategies}
        setLoadedStrategy={setLoadedStrategy}
      />
      {/* configuration strategy inputs, view toggle + more, states will be held in this function */}
      <StrategyControl
        strategy={loadedStrategy}
        handleChange={setLoadedStrategy}
        graphView={graphView}
        setGraphView={setGraphView}
        savedStrategies={savedStrategies}
        setSavedStrategies={setSavedStrategies}
      />
      {/* graph view/table views (pass all props to caleld function), 
      this func can manage the view state default is graph. */}
      <StrategyView strategy={loadedStrategy} graphView={graphView} />
    </div>
  );
};

// custom hook to persist state between page refresh
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

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
