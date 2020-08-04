import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { API, graphqlOperation } from "aws-amplify";
import { createStrategy } from "../graphql/mutations";
import { listStrategys } from "../graphql/queries";
import Title from "./Title";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    maxWidth: "168px",
    width: "100%",
  },
  formControl: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const StrategyRules = (props) => {
  const classes = useStyles();

  //+ add input validation checks
  const handleChange = (event) => {
    console.log(event.target.name + ": " + event.target.value);
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
      return false;
    }
    console.log("true");
    return true;
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
      console.log("error creating strategy:", err);
    }
  }

  return (
    <div className="strategy-controls">
      <Title>Control</Title>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              id="dateStart"
              label="start"
              type="date"
              value={props.strategy.dateStart}
              className={classes.textField}
              name="dateStart"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* </Paper> */}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              id="dateEnd"
              label="end"
              type="date"
              value={props.strategy.dateEnd}
              className={classes.textField}
              name="dateEnd"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* </Paper> */}
          </Grid>
          {/* </Grid>
        <Grid container spacing={1}> */}
          <Grid item xs={12} md={6} lg={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              id="standard-basic"
              label="Amount"
              name="investmentAmount"
              value={props.strategy.investmentAmount}
              className={classes.textField}
              onChange={handleChange}
            />
            {/* </Paper> */}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <Paper className={classes.paper}> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="frequency-select" id="frequency-label">
                Frequency
              </InputLabel>
              <Select
                labelId="frequency-label"
                id="frequency-select"
                name="investmentFrequency"
                value={props.strategy.investmentFrequency}
                className={classes.textField}
                onChange={handleChange}
              >
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
              </Select>
              {/* NativeSelect is a temporary replacement to the MUI select component, due to issue with testing not able to locate ids/aria/forHTML */}
              {/* <InputLabel htmlFor="frequency-select">Frequency</InputLabel>
              <NativeSelect
                id="frequency-select"
                name="investmentFrequency"
                value={props.strategy.investmentFrequency}
                onChange={handleChange}
              >
                <option value={"daily"}>Daily</option>
                <option value={"weekly"}>Weekly</option>
                <option value={"monthly"}>Monthly</option>
              </NativeSelect> */}
            </FormControl>

            {/* </Paper> */}
          </Grid>
          <Grid item xs={3}>
            {/* <Paper className={classes.paper}> */}
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
            {/* </Paper> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default StrategyRules;
