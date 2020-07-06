/* src/App.js */
import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, createStrategy } from "./graphql/mutations";
import { listTodos, listStrategys } from "./graphql/queries";

const initialStrategy = {
  dateStart: "2018-11-11",
  dateEnd: "2019-05-02",
  investmentAmount: 200.1,
  investmentFrequency: "MONTHLY",
};

const App = () => {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    fetchStrategies();
  }, []);

  async function fetchStrategies() {
    try {
      const data = await API.graphql(graphqlOperation(listStrategys));
      const strategies = data.data.listStrategys.items;
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
      <div className={"temporary"} style={styles.container}>
        <h2>Strategy</h2>
        <button style={styles.button} onClick={handleAddStrategy}>
          Save Strategy
        </button>
        {strategies.map((item) => (
          <>
            <p>{item.dateEnd}</p>
            <p>{item.dateStart}</p>
            <p>{item.investmentAmount}</p>
            <p>{item.investmentFrequency}</p>
          </>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default App;
