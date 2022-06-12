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
  chart: {
    width : "50%"
  }
}));
