import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useTheme = makeStyles((theme) => ({
  input: {
    width: "80%",
    height: 30,
  },

  button: {
    flex: 1,
    textTransform: "unset",
    marginTop: theme.spacing(2),
  },

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

  wapperTable: {
    height: "75%",
    position: "relative",
    paddingTop: theme.spacing(4),
  },

  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    height: "5%",
  },

  rootTable: {
    width: "100%",
    height: "100%",
  },

  container: {
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
  },

  table: {
    borderCollapse: "collapse",
  },

  tableHead: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: "#fff",
  },

  cell: {
    textAlign: "center",
  },

  icon: {
    marginLeft: 10,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    width: theme.spacing(200),
    height: theme.spacing(150),
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(15, 20, 15, 20),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  buttonModal: {
    paddingTop: theme.spacing(8),
  },

  boxInput: {
    paddingTop: theme.spacing(8),
    position: "relative",
  },

  boxPass: {
    paddingTop: theme.spacing(12),
  },

  error: {
    position: "absolute",
    bottom: theme.spacing(-6),
    left: theme.spacing(67),
    color: red[500],
  },

  boxSelect: {
    position: "relative",
  },

  Autocomplete: {
    paddingTop: theme.spacing(8),
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
  },

  title: {
    display: "inline-block",
    width: "40%",
    height: "100%",
  },

  inputAuto: {
    display: "inline-block",
    width: "100%",
    height: "100%",
  },

  inputName: {
    position: "relative",
  },

  boxInputAra: {
    paddingTop: theme.spacing(8),
    position: "relative",
    display: "flex",
  },

  textAra: {
    width: "60%",
    flex: "right",
    marginLeft: "21.7%",
  },
}));
