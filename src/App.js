import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listStrategys } from "./graphql/queries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { withAuthenticator } from "@aws-amplify/ui-react";

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

  useEffect(() => {
    fetchStrategies();
  }, []);

  async function fetchStrategies() {
    try {
      const data = await API.graphql(graphqlOperation(listStrategys));
      setSavedStrategies(data.data.listStrategys.items);
      const item = data.data.listStrategys.items[0];
      setLoadedStrategy({
        loaded: true,
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        investmentAmount: item.investmentAmount,
        investmentFrequency: item.investmentFrequency,
      });
    } catch (err) {
      console.log("error fetching strategies from AppSync & DynamoDB");
    }
  }

  return (
    <div className={"App"}>
      <Router>
        <Switch>
          <Route path="/">
            <Dashboard
              savedStrategies={savedStrategies}
              setLoadedStrategy={setLoadedStrategy}
              strategy={loadedStrategy}
              setSavedStrategies={setSavedStrategies}
            />
          </Route>
          <Route path="/somethingelse">
            <div className={"saved-strategies"} style={styles.container}>
              <h2>Something else</h2>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

// custom hook to persist state between page refresh
// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       // Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }

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

// export default App;
export default withAuthenticator(App);
