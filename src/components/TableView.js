import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(
//     0,
//     "16 Mar, 2019",
//     "Elvis Presley",
//     "Tupelo, MS",
//     "VISA ⠀•••• 3719",
//     312.44
//   ),
//   createData(
//     1,
//     "16 Mar, 2019",
//     "Paul McCartney",
//     "London, UK",
//     "VISA ⠀•••• 2574",
//     866.99
//   ),
//   createData(
//     2,
//     "16 Mar, 2019",
//     "Tom Scholz",
//     "Boston, MA",
//     "MC ⠀•••• 1253",
//     100.81
//   ),
//   createData(
//     3,
//     "16 Mar, 2019",
//     "Michael Jackson",
//     "Gary, IN",
//     "AMEX ⠀•••• 2000",
//     654.39
//   ),
//   createData(
//     4,
//     "15 Mar, 2019",
//     "Bruce Springsteen",
//     "Long Branch, NJ",
//     "VISA ⠀•••• 5919",
//     212.79
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function TableOutput(props) {
  const classes = useStyles();
  const [maxRows, setMaxRows] = useState(10); // max rows to display
  function longToUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  const handleClick = (e) => {
    e.preventDefault();
    setMaxRows(maxRows + 10);
  };
  const items = [];
  for (let i = 0; i < props.report.length && i < maxRows; i++) {
    items.push(props.report[i]);
  }

  return (
    <React.Fragment>
      <Title>Strategy Breakdown</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Portfolio Value USD</TableCell>
            <TableCell>Portfolio Value BTC</TableCell>
            <TableCell>BPI</TableCell>
            <TableCell>Investment Total</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* change key value to a row id */}
          {items.map((row) => (
            <TableRow key={row}>
              <TableCell>{longToUSD(row.portfolioValue_usd)}</TableCell>
              <TableCell>{row.portfolioValue_btc}</TableCell>
              <TableCell>{longToUSD(row.bpi_usd)}</TableCell>
              <TableCell>{longToUSD(row.depositTotal_usd)}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={handleClick}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}
