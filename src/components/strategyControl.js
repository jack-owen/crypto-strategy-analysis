import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { API, graphqlOperation } from "aws-amplify";
import { createStrategy } from "./../graphql/mutations";
import { listStrategys } from "./../graphql/queries";

const StrategyRules = (props) => {
  const classes = useStyles();

  //+ add input validation checks
  const handleChange = (event) => {
    // update this function to use the method below '...' read about this js method
    // setTableView({ ...tableView, [event.target.name]: event.target.checked });

    const strategy = {
      ...props.strategy,
      [event.target.name]: event.target.value,
    };
    strategy.loaded = isStrategyValid(strategy);
    props.handleChange(strategy);
  };

  const isStrategyValid = (item) => {
    if (
      item.dateStart === "" ||
      item.dateEnd === "" ||
      item.investmentAmount === "" ||
      item.investmentFrequency === ""
    ) {
      console.log("false");
      console.log(props.strategy);

      return false;
    }
    console.log("true");

    return true;
  };

  const handleChangeGraphView = (event) => {
    // localStorage.setItem("graphView", event.target.checked);
    props.setGraphView(event.target.checked);
  };

  async function handleSaveStrategy(event) {
    console.log("adding strategy via btn");
    try {
      // props.setSavedStrategies([...props.savedStrategies, props.strategy]); // this line is slightly redundant whilst later hack is in place to get all saved strategies from dynamodb
      await API.graphql(
        graphqlOperation(createStrategy, {
          input: {
            dateStart: props.strategy.dateStart,
            dateEnd: props.strategy.dateEnd,
            investmentAmount: props.strategy.investmentAmount,
            investmentFrequency: props.strategy.investmentFrequency,
          },
        })
      );
      // get updated set of saved strategies (to find the id of the new strategy record from dynamodb)
      // there is a known inefficiency in having to fetch ALL savedStrategy records just to get the id
      //    of the current added strategy from dynamodb for future integrity
      try {
        const data = await API.graphql(graphqlOperation(listStrategys));
        props.setSavedStrategies(data.data.listStrategys.items);
      } catch (err) {
        console.log("error fetching strategies");
      }
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div className="strategy-rules">
      <h2>Strategy Control</h2>
      <TextField
        id="date"
        label="start"
        type="date"
        // defaultValue={props.strategy.dateStart}
        value={props.strategy.dateStart}
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
        // defaultValue={props.strategy.dateEnd}
        value={props.strategy.dateEnd}
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
              onChange={handleChangeGraphView}
              name="graphView"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="Graph View"
          labelPlacement="start"
          handle="true"
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSaveStrategy}
      >
        Save
      </Button>
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
  button: {
    margin: theme.spacing(1),
  },
}));

export default StrategyRules;
