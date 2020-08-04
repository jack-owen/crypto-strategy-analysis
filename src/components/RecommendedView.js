import React, { useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart";
// import Summary from "./Summary";
import TableOutput from "./Breakdown";
import Control from "./Control";
import Hidden from "@material-ui/core/Hidden";
import { API, graphqlOperation } from "aws-amplify";
import { listStrategyRecommendeds } from "../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Title from "./Title";
import Button from "@material-ui/core/Button";

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
  singleStrategy: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function RecommendedView({
  setLoadedStrategy,
  setRecommendedView,
}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);
  const [recommendedStrategies, setRecommendedStrategies] = React.useState([]);

  useEffect(() => {
    fetchRecommendedStrategies(setRecommendedStrategies);
  }, []);

  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  function handleClickItem(item) {
    setLoadedStrategy({
      loaded: true,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      investmentAmount: item.investmentAmount,
      investmentFrequency: item.investmentFrequency,
    });
    setRecommendedView(false);
  }

  let counter = 0;
  return (
    <>
      <p>recommended strategies listed with summarised report analysis</p>
      {recommendedStrategies.map((item) => (
        <div key={item.id}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={clsx(fixedHeightPaperSmall)}>
                <Title>Recommended Strategy #{++counter}</Title>
                <div className={classes.singleStrategy}>
                  <Grid item xs={3}>
                    <React.Fragment>
                      <Typography component="p" variant="h4">
                        {longToUSD(item.returnAmount)}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        className={classes.depositContext}
                      >
                        return over {item.duration} days
                      </Typography>
                    </React.Fragment>
                  </Grid>
                  <Grid item xs={5}>
                    <React.Fragment>
                      <Typography component="p" variant="h5">
                        by purchasing {longToUSD(item.investmentAmount)}{" "}
                        {item.investmentFrequency} between the dates of{" "}
                        {item.dateStart} and {item.dateEnd}
                      </Typography>
                    </React.Fragment>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickItem(item)}
                    >
                      Select
                    </Button>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
}

// a function to get recommended strategies from the AppSync API.
async function fetchRecommendedStrategies(setRecommendedStrategies) {
  try {
    const data = await API.graphql(graphqlOperation(listStrategyRecommendeds));
    let strategies = [];
    //   setLoadedStrategy({
    //     loaded: true,
    //     dateStart: item.dateStart,
    //     dateEnd: item.dateEnd,
    //     investmentAmount: item.investmentAmount,
    //     investmentFrequency: item.investmentFrequency,
    //   });
    data.data.listStrategyRecommendeds.items.forEach((item) => {
      strategies.push({
        // createdAt: "2020-08-04T11:52:40.341Z",
        dateEnd: item.dateEnd,
        dateStart: item.dateStart,
        id: item.id,
        investmentAmount: item.investmentAmount,
        investmentFrequency: item.investmentFrequency,
        returnAmount: item.returnAmount,
        duration: item.duration,
        // updatedAt: "2020-08-04T11:52:40.341Z",
      });
    });
    // setRecommendedStrategies(data.data.listStrategyRecommendeds.items);
    setRecommendedStrategies(strategies);
  } catch (err) {
    console.log(
      "error fetching recommended strategies from AppSync & DynamoDB"
    );
  }
}
