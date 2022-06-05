import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export const useTheme = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: `calc(100% - 64px)`,
  },
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 7px 30px -10px rgba(150,170,180,.7)",
  },
  title: {
    position: "relative",
  },
  btn: {
    position: "absolute",
    right: 0,
    top: 0,
    textTransform: "capitalize",
    width: theme.spacing(25),
  },
  areaTable: {
    width: "100%",
    height: "90%",
  },
  rootTable: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(5),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  container: {
    height: "90%",
    maxHeight: "90%",
    borderRadius: theme.shape.borderRadius,
  },
  table: {
    borderCollapse: "collapse",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
  },
  action: {
    textTransform: "capitalize",
    width: theme.spacing(25),
  },
  /**
   * MODAL
   */
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: theme.spacing(160),
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7, 7, 7, 7),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: theme.spacing(10),
  },
  inputArea: {
    position: "relative",
  },
  input: {
    display: "inline-block",
    width: "100%",
    height: "100%",
  },
  error: {
    position: "absolute",
    bottom: theme.spacing(-5),
    left: "0",
    color: red[500],
  },
  list: {
    maxHeight: theme.spacing(75),
  },
  label: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));
