import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const StrategyRules = (props) => {
  const classes = useStyles();

  //+ add input validation checks
  const handleChange = (event) => {
    // update this function to use the method below '...' read about this js method
    // setTableView({ ...tableView, [event.target.name]: event.target.checked });
    const item = {
      dateStart: props.strategy.dateStart,
      dateEnd: props.strategy.dateEnd,
      investmentAmount: props.strategy.investmentAmount,
      investmentFrequency: props.strategy.investmentFrequency,
    };
    item[event.target.name] = event.target.value;
    props.handleChange(item);
  };

  const handleChangeSwitch = (event) => {
    props.setGraphView(event.target.checked);
  };

  return (
    <div className="strategy-rules">
      <h2>Strategy Rules</h2>
      <TextField
        id="date"
        label="start"
        type="date"
        defaultValue={props.strategy.dateStart}
        className={classes.textField}
        name="dateStart"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="end"
        type="date"
        defaultValue={props.strategy.dateEnd}
        className={classes.textField}
        name="dateEnd"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="standard-basic"
        label="Amount"
        name="investmentAmount"
        value={props.strategy.investmentAmount}
        onChange={handleChange}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="investmentFrequency"
          value={props.strategy.investmentFrequency}
          onChange={handleChange}
        >
          <MenuItem value={"daily"}>Daily</MenuItem>
          <MenuItem value={"weekly"}>Weekly</MenuItem>
          <MenuItem value={"monthly"}>Monthly</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset">
        <FormControlLabel
          value="graph"
          control={
            <Switch
              checked={props.graphView}
              onChange={handleChangeSwitch}
              name="graphView"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="Graph View"
          labelPlacement="start"
          handle
        />
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default StrategyRules;
