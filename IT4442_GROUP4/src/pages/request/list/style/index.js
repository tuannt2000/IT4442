import { makeStyles } from "@material-ui/core";

export const useTheme = makeStyles((theme) => ({
  box__main: {
    width: "100%",
    height: `calc(100% - 64px)`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box__filter: {
    width: "75%",
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 7px 30px -10px rgba(150,170,180,.7)",
  },
  box__table: {
    width: "100%",
    height: "85%",
    position: "relative",
  },
  box__table__open: {
    width: "100%",
    height: "38%",
    position: "relative",
  },
  box__history: {
    width: "20%",
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 7px 30px -10px rgba(150,170,180,.7)",
  },
  header: {
    position: "relative",
  },
  btn: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate(0, -50%)",
    textTransform: "capitalize",
    width: theme.spacing(25),
  },
}));
