import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteStrategy } from "./../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/button";

const StrategyRules = (props) => {
  const handleClick = () => {
    console.log("clicked");
  };

  const classes = useStyles();

  async function handleSaveStrategy(event) {
    console.log("removing strategy via btn");
    console.log(event);

    try {
      await API.graphql(
        graphqlOperation(deleteStrategy, { input: { id: event.id } })
      );
      // delete from app state
      var array = [...props.savedStrategies]; // make a separate copy of the array
      var index = array.indexOf(event);
      if (index !== -1) {
        array.splice(index, 1);
        props.setSavedStrategies(array);
      }
    } catch (err) {
      console.log("error deleting Strategy:", err);
    }
  }

  return (
    <div>
      <h2>Saved Strategies</h2>
      {props.savedStrategies.map((item) => (
        <>
          <p>
            {item.dateStart} to {item.dateEnd} for ${item.investmentAmount}{" "}
            every {item.investmentFrequency}
          </p>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() =>
              props.setLoadedStrategy({
                loaded: true,
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
                investmentAmount: item.investmentAmount,
                investmentFrequency: item.investmentFrequency,
              })
            }
          >
            Load
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => handleSaveStrategy(item)}
            // startIcon={<RemoveCircleIcon />}
          >
            <RemoveCircleIcon />
          </Button>
        </>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  RemoveCircleIcon: {
    // display: "flex",
    // alignItems: "center",
    margin: 0,
  },
}));
export default StrategyRules;
