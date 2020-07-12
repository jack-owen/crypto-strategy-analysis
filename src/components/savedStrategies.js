import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteStrategy } from "./../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/button";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";

const StrategyRules = (props) => {
  const classes = useStyles();
  async function handleSaveStrategy(event) {
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
        <div key={item}>
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
        </div>
      ))}
    </div>
  );
};

export const SavedStrategiesList = (props) => (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    {props.savedStrategies.map((item) => (
      <ListItem
        button
        key={item.id}
        onClick={() => {
          console.log(item.id + " clicked");
          props.setLoadedStrategy({
            loaded: true,
            dateStart: item.dateStart,
            dateEnd: item.dateEnd,
            investmentAmount: item.investmentAmount,
            investmentFrequency: item.investmentFrequency,
          });
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            (Date.parse(item.dateEnd) - Date.parse(item.dateStart)) /
              (1000 * 60 * 60 * 24) +
            " days" //add options for months when days > 30. and years etc.
          }
        />
      </ListItem>
    ))}
  </div>
);

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
