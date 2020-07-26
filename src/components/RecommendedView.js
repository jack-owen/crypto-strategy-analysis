import React, { useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart";
import Summary from "./Summary";
import TableOutput from "./Breakdown";
import Control from "./Control";
import Hidden from "@material-ui/core/Hidden";
import { API, graphqlOperation } from "aws-amplify";
import { listStrategyRecommendeds } from "../graphql/queries";

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

export default function RecommendedView({ setLoadedStrategy }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);
  const [recommendedStrategies, setRecommendedStrategies] = React.useState([]);

  useEffect(() => {
    fetchRecommendedStrategies(setRecommendedStrategies);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaperSmall}>
          <p>recommended strategies listed with summarised report analysis</p>
          <p>btn select</p>
          <RecommendedStrategies data={recommendedStrategies} />
        </Paper>
      </Grid>
    </Grid>
  );
}

function RecommendedStrategies({ data }) {
  console.log(data);
  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.dateStart}</p>
          <p>{item.dateEnd}</p>
          <p>{item.investmentAmount}</p>
          <p>{item.investmentFrequency}</p>
          <button>Select</button>
        </div>
      ))}
    </>
  );
}

// a function to get recommended strategies from the AppSync API.
async function fetchRecommendedStrategies(setRecommendedStrategies) {
  try {
    const data = await API.graphql(graphqlOperation(listStrategyRecommendeds));
    setRecommendedStrategies(data.data.listStrategyRecommendeds.items);
    //   setLoadedStrategy({
    //     loaded: true,
    //     dateStart: item.dateStart,
    //     dateEnd: item.dateEnd,
    //     investmentAmount: item.investmentAmount,
    //     investmentFrequency: item.investmentFrequency,
    //   });
  } catch (err) {
    console.log(
      "error fetching recommended strategies from AppSync & DynamoDB"
    );
  }
}
