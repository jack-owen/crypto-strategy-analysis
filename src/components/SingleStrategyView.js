import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart";
import Summary from "./Summary";
import TableOutput from "./Breakdown";
import Control from "./Control";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
  fixedHeightSmall: {
    minHeight: 180,
  },
}));

// a component that displays the controls and strategy
// analysis reports (chart, summary report and breakdown)
// for a Single Strategy loaded by the user
// export default function SingleStrategyView(props) {
export default function SingleStrategyView({
  strategy,
  setLoadedStrategy,
  setSavedStrategies,
  data,
  strategyReport,
}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);

  return (
    <Grid container spacing={3}>
      {/* Control */}
      <Grid item xs={12} md={10} lg={9}>
        {/* <Paper className={fixedHeightPaper}> */}
        <Paper className={fixedHeightPaperSmall}>
          {/* <Control
            strategy={props.strategy}
            handleChange={props.setLoadedStrategy}
            setSavedStrategies={props.setSavedStrategies}
          /> */}
          <Control
            strategy={strategy}
            handleChange={setLoadedStrategy}
            setSavedStrategies={setSavedStrategies}
          />
        </Paper>
      </Grid>
      {/* Hint */}

      <Grid item lg={3}>
        <Hidden mdDown>
          <Paper className={fixedHeightPaperSmall} elevation={0}>
            {/* <Hint /> */}
            <p>
              Enter your strategy conditions in the control section to test the
              performance of a particular purchase method and save the strategy
              in AWS DynamoDB by selecting 'Save'
            </p>
          </Paper>
        </Hidden>
      </Grid>
      {/* Strategy Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart data={data} />
        </Paper>
      </Grid>
      {/* Summary */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Summary report={strategyReport} />
        </Paper>
      </Grid>
      {/* Strategy Breakdown */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <TableOutput report={strategyReport} />
        </Paper>
      </Grid>
    </Grid>
  );
}
