import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { API, graphqlOperation, Auth, Hub } from "aws-amplify";
import { listStrategys } from "./graphql/queries";
import {
  withAuthenticator,
  AmplifySignInButton,
  AmplifyAuthenticator,
} from "@aws-amplify/ui-react";
import { AmplifySignOut, AmplifySignIn } from "@aws-amplify/ui-react";
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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { SavedStrategiesList } from "./components/SavedStrategies";
import CoindeskAPI from "./client/coindesk";
import SideBarItems from "./components/SideBarItems";
import Copyright from "./components/Copyright";
import SingleStrategyView from "./components/SingleStrategyView";
import RecommendedView from "./components/RecommendedView";

const App = () => {
  const [savedStrategies, setSavedStrategies] = useState([]);
  const [loadedStrategy, setLoadedStrategy] = useState({
    loaded: false,
    id: "",
    dateStart: "",
    dateEnd: "",
    investmentAmount: "",
    investmentFrequency: "",
  });
  const classes = useStyles();
  const [drawOpen, setDrawOpen] = useState(true);
  const [historicBPI, setHistoricalBPI] = useState({
    isLoaded: false,
    bpi_usd: [],
  });
  const [strategyReport, setStrategyReport] = useState([]);
  const [recommendedView, setRecommendedView] = useState(false);
  const [user, setUser] = useState("none");
  const handleDrawerOpen = () => {
    setDrawOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawOpen(false);
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  // fetch new historic BPI data when the users strategy date start, end or investment frequency changes
  useEffect(() => {
    if (!loadedStrategy.loaded) {
      return;
    } // if strategy is not loaded, quit
    CoindeskAPI(
      loadedStrategy.dateStart,
      loadedStrategy.dateEnd,
      loadedStrategy.investmentFrequency,
      setHistoricalBPI
    );
  }, [
    loadedStrategy.loaded,
    loadedStrategy.dateStart,
    loadedStrategy.dateEnd,
    loadedStrategy.investmentFrequency,
  ]);

  async function fetchStrategies() {
    try {
      const data = await API.graphql(graphqlOperation(listStrategys));
      setSavedStrategies(data.data.listStrategys.items);
      const item = data.data.listStrategys.items[0];
      setLoadedStrategy({
        loaded: true,
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        investmentAmount: item.investmentAmount,
        investmentFrequency: item.investmentFrequency,
      });
    } catch (err) {
      console.log("error fetching strategies from AppSync & DynamoDB");
    }
  }

  // calculate strategy report analysis for changed historic BPI data or investment amount
  useEffect(() => {
    let report = [];
    let investmentTotal_btc = 0;
    let investmentTotal_usd = 0; // usd
    const investmentAmount = parseFloat(loadedStrategy.investmentAmount);
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
  }, [historicBPI, loadedStrategy.investmentAmount]);

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

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user.username))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      // console.log("A new auth event has happened: ", data);
      if (payload.event === "signIn") {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            setUser(user.username);
            console.log("a user has signed in!");
          })
          .catch((err) => console.log(err));
      }
      if (payload.event === "signOut") {
        setUser("nobody");
        console.log("a user has signed out!");
      }
    });
  }, []);

  return (
    <div className={"App"}>
      {/* <Dashboard
        savedStrategies={savedStrategies}
        setLoadedStrategy={setLoadedStrategy}
        strategy={loadedStrategy}
        setSavedStrategies={setSavedStrategies}
      /> */}
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
            {/* <AmplifySignIn /> */}
            {/* <button onClick={() => Auth.federatedSignIn()}>Sign In</button> */}
            <AmplifySignOut />
            Hi, {user}
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
          <List>
            <SideBarItems
              setRecommendedView={setRecommendedView}
              setLoadedStrategy={setLoadedStrategy}
            />
          </List>
          <Divider />
          <List>
            <SavedStrategiesList
              savedStrategies={savedStrategies}
              setLoadedStrategy={setLoadedStrategy}
              setSavedStrategies={setSavedStrategies}
            />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {recommendedView ? (
              <RecommendedView
                setLoadedStrategy={setLoadedStrategy}
                setRecommendedView={setRecommendedView}
              />
            ) : (
              <SingleStrategyView
                strategy={loadedStrategy}
                setLoadedStrategy={setLoadedStrategy}
                setSavedStrategies={setSavedStrategies}
                data={data}
                strategyReport={strategyReport}
              />
            )}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </div>
  );
};

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
}));

// export default App;
export default withAuthenticator(App);
