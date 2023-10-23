import { Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import Statistics from "./Statistics";
import Mousetrap from "mousetrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const useStyles = makeStyles((theme) => ({
  topButton: {
    position: "absolute",
    right: "2em",
  },
  koffContainer: {
    marginBottom: "1em",
  },
}));

const App = () => {
  const classes = useStyles();
  const [isOnDarkMode, setIsOnDarkMode] = useState(false);
  const [darkModeText, setDarkModeText] = useState("Dark Mode");
  const [koffString, setKoffString] = useState("");
  const toggleDarkMode = () => {
    setIsOnDarkMode(!isOnDarkMode);
    setDarkModeText(isOnDarkMode ? "Dark Mode" : "Light Mode");
  };
  Mousetrap.bind("d", toggleDarkMode);
  Mousetrap.bind("k", () => {
    setKoffString(koffString + " 🍺 ");
  });

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.koffContainer}>{koffString}</div>
      <Button
        className={classes.topButton}
        variant="contained"
        color="secondary"
        onClick={toggleDarkMode}
      >
        {darkModeText}
      </Button>
      <Statistics isOnDarkMode={isOnDarkMode}></Statistics>
    </QueryClientProvider>
  );
};

export default App;
