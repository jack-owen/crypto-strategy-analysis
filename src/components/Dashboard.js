import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Chart from "./Chart";
import Summary from "./Summary";
import TableOutput from "./Breakdown";
import { SavedStrategiesList } from "./savedStrategies";
import Control from "./Control";
import CoindeskAPI from "./../client/coindesk";
import { mainListItems } from "./SideBarItems";
import Copyright from "./Copyright";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);
  const [drawOpen, setDrawOpen] = useState(true);
  const handleDrawerOpen = () => {
    setDrawOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawOpen(false);
  };
  const [historicBPI, setHistoricalBPI] = useState({
    isLoaded: false,
    bpi_usd: [],
  });
  const [strategyReport, setStrategyReport] = useState([]);

  // fetch new historic BPI data when the users strategy date start, end or investment frequency changes
  useEffect(() => {
    if (!props.strategy.loaded) {
      return;
    } // if strategy is not loaded, quit
    CoindeskAPI(
      props.strategy.dateStart,
      props.strategy.dateEnd,
      props.strategy.investmentFrequency,
      setHistoricalBPI
    );
  }, [
    props.strategy.loaded,
    props.strategy.dateStart,
    props.strategy.dateEnd,
    props.strategy.investmentFrequency,
  ]);

  // calculate strategy report analysis for changed historic BPI data or investment amount
  useEffect(() => {
    let report = [];
    let investmentTotal_btc = 0;
    let investmentTotal_usd = 0; // usd
    const investmentAmount = parseFloat(props.strategy.investmentAmount);
    historicBPI.bpi_usd.forEach(function (item) {
      const bpi = item.bpi;
      investmentTotal_btc += (1 / bpi) * investmentAmount;
      investmentTotal_usd += investmentAmount;
      const portfolioValue_usd = investmentTotal_btc * bpi;
      report.push({
        portfolioValue_btc: investmentTotal_btc,
        portfolioValue_usd: portfolioValue_usd,
        bpi_usd: bpi, //eg. $9052.5763 unformatted
        depositTotal_usd: investmentTotal_usd,
        date: item.date, //eg. "2018-02-01"
      });
    });
    setStrategyReport(report);
  }, [historicBPI, props.strategy.investmentAmount]);

  // create chart graph data
  let data = [];
  for (let i = 0; i < strategyReport.length; i++) {
    const item = strategyReport[i];
    data.push({
      name: item.date,
      invested: item.depositTotal_usd,
      worth: item.portfolioValue_usd,
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              drawOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Crypto Strategy Analysis
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawOpen && classes.drawerPaperClose
          ),
        }}
        open={drawOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>
          <SavedStrategiesList
            savedStrategies={props.savedStrategies}
            setLoadedStrategy={props.setLoadedStrategy}
            setSavedStrategies={props.setSavedStrategies}
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Control */}
            <Grid item xs={12} md={10} lg={9}>
              {/* <Paper className={fixedHeightPaper}> */}
              <Paper className={fixedHeightPaperSmall}>
                <Control
                  strategy={props.strategy}
                  handleChange={props.setLoadedStrategy}
                  // savedStrategies={props.savedStrategies}
                  setSavedStrategies={props.setSavedStrategies}
                />
              </Paper>
            </Grid>
            {/* Hint */}

            <Grid item lg={3}>
              <Hidden mdDown>
                <Paper className={fixedHeightPaperSmall} elevation={0}>
                  {/* <Hint /> */}
                  <p>
                    Enter your strategy conditions in the control section to
                    test the performance of a particular purchase method and
                    save the strategy in AWS DynamoDB by selecting 'Save'
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
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
