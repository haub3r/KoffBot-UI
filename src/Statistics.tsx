import { Box, Button, CircularProgress, Container, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import logo from "./koff.png";
import QueryGetStats, { StatsQueryResults } from "./Queries";

interface Props {
  isOnDarkMode: boolean;
}

const useStyles = makeStyles<Theme, Props>(() => ({
  mainContainer: {
    minHeight: "20em",
    padding: "1em",
    paddingBottom: "25em",
    backgroundColor: (props) => (props.isOnDarkMode ? "black" : "white"),
    color: (props) => (props.isOnDarkMode ? "white" : "black"),
    textAlign: "center",
    borderRadius: "5px",
    transition: "0.8s",
  },
  rowButton: {
    margin: "0.2em",
    marginTop: "8em",
  },
  mainHeader: {
    fontFamily: "Rockwell",
    fontSize: "3.3em",
    textAlign: "center",
    marginBottom: "0.6em",
  },
  subHeader: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginTop: "1.5em",
  },
  number: {
    fontSize: "1.5em",
    fontWeight: "bold",
    // marginTop: "0.5em",
  },
}));

const Statistics = (props: Props) => {
  const classes = useStyles(props);

  const query = QueryGetStats() as StatsQueryResults;
  const data = query.data;
  const refetch = query.refetch;

  const refresh = () => {
    refetch();
  };

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.mainHeader}>KoffBot Portal 🍻</div>
      <img src={logo} alt="Koff!" title="Koff!" width="100px" />
      {/* <div style={{ fontSize: "1.5em", marginBottom: "1em" }}>🍺</div> */}
      <h2>Statistics:</h2>
      <div className={classes.subHeader}>Times toasted:</div>
      <div className={classes.number}>
        {!data ? <CircularProgress /> : data.ToastCount}
      </div>
      <div className={classes.subHeader}>Fridays hailed:</div>
      <div className={classes.number}>
        {!data ? <CircularProgress /> : data.FridayCount}
      </div>
      <div className={classes.subHeader}>Moments drunk:</div>
      <div className={classes.number}>
        {!data ? <CircularProgress /> : data.DrunkCount}
      </div>
      <Box>
        <Button
          className={classes.rowButton}
          style={{ marginTop: "8em" }}
          variant="contained"
          color="primary"
          onClick={refresh}
        >
          Refresh
        </Button>
      </Box>
    </Container>
  );
};

export default Statistics;
