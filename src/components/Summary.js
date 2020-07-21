import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Summary(props) {
  const classes = useStyles();
  let last = "";
  let first = "";
  let depositTotal_usd = "";
  // let portfolioValue_btc = "";
  let portfolioValue_usd = "";
  let totalReturn_value = "";
  let totalReturn_pct = "";
  let period_days = "";
  if (props.report.length > 0) {
    last = props.report[props.report.length - 1];
    first = props.report[0];
    depositTotal_usd = last.depositTotal_usd;
    // portfolioValue_btc = last.portfolioValue_btc;
    portfolioValue_usd = last.portfolioValue_usd;
    totalReturn_value = portfolioValue_usd - depositTotal_usd;
    totalReturn_pct = Number.parseFloat(
      (portfolioValue_usd / depositTotal_usd - 1) * 100
    ).toFixed(1);
    period_days =
      (Date.parse(last.date) - Date.parse(first.date)) / (1000 * 60 * 60 * 24) +
      " days";
  }

  const [expand, setExpand] = useState(false);

  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  //+ add total number of investments

  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Typography component="p" variant="h4">
        {/* <div data-testid="summary-total-return"> */}
        {longToUSD(totalReturn_value)}
        {/* </div> */}
      </Typography>
      <Typography component="p" variant="h5">
        {totalReturn_pct}%
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        return over {period_days}
      </Typography>

      {expand === true ? (
        <>
          <Typography component="p" variant="h5">
            {longToUSD(depositTotal_usd)}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            deposit total
          </Typography>
          <Typography component="p" variant="h5">
            {longToUSD(portfolioValue_usd)}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            portfolio value
          </Typography>
        </>
      ) : (
        <div>
          <Link
            color="primary"
            href="#"
            onClick={function (event) {
              event.preventDefault();
              setExpand(true);
            }}
          >
            View more
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}
