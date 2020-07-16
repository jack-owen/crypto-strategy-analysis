import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteStrategy } from "./../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/button";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";

export function SavedStrategiesList(props) {
  return (
    <div>
      <ListSubheader inset>Saved strategies</ListSubheader>
      {props.savedStrategies.map((item) => (
        <StrategyItem
          item={item}
          key={item.id}
          setLoadedStrategy={props.setLoadedStrategy}
          savedStrategies={props.savedStrategies}
          setSavedStrategies={props.setSavedStrategies}
        />
      ))}
    </div>
  );
}

const StrategyItem = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const item = props.item;

  async function handleDeleteStrategy(event) {
    try {
      console.log("the id is " + event.id);
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

  function handleLoadStrategy(item) {
    console.log(item.id + " clicked");
    props.setLoadedStrategy({
      loaded: true,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      investmentAmount: item.investmentAmount,
      investmentFrequency: item.investmentFrequency,
    });
  }

  return (
    <>
      <ListItem
        button
        key={item.id}
        onMouseLeave={() => setIsHovering(false)}
        onMouseOver={() => setIsHovering(true)}
      >
        <ListItemIcon onClick={() => handleLoadStrategy(item)}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          primary={timePeriodCalculator(item.dateStart, item.dateEnd)}
          onClick={() => handleLoadStrategy(item)}
        />
        {isHovering && (
          <DeleteIcon onClick={() => handleDeleteStrategy(item)} />
        )}
      </ListItem>
    </>
  );
};

function timePeriodCalculator(start, end) {
  const ms = Date.parse(end) - Date.parse(start);
  const days = ms / (1000 * 60 * 60 * 24);
  const weeks = days / 7;
  const months = weeks / 4.34524; // ~ value
  const years = weeks / 52;
  if (parseInt(years) > 0) return parseInt(years) + " years";
  if (parseInt(months) > 0) return parseInt(months) + " months";
  if (parseInt(weeks) > 0) return parseInt(weeks) + " weeks";
  return parseInt(days) + " days";
}
