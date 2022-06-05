import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const useTheme = makeStyles((theme) => ({
  root: {
    height: `calc(100% - 64px)`,
    backgroundColor: "transparent",
  },
  container: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    height: "100%",
    boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
  },
  content: {
    maxHeight: "7%",
  },
  btn: {
    textTransform: "capitalize",
    width: theme.spacing(25),
  },
  title: {
    display: "inline-block",
    width: "25%",
  },
  chip: {
    backgroundColor: green[300],
    height: "100%",
    fontSize: theme.typography.fontSize,
  },

  boxComment: {
    width: "100%",
    maxHeight: "100%",
    height: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    overflowY: "scroll",
    boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
    position: "relative",
  },
  avatarComment: {
    marginTop: theme.spacing(3),
  },
  commentInfo: {
    flex: 1,
    padding: theme.spacing(3, 5, 5, 5),
    marginLeft: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0,0,0,.07)",
  },
  name: {
    fontSize: 20,
  },
  date: {
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
  inputComment: {
    boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
  },
  skeleton: {
    display: "inline-block",
  },
  seeMore: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(4),
    color: theme.palette.primary.light,
    fontStyle: "italic",
  },
  /**
   * MODAL_UPDATE
   */
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "40%",
    height: theme.spacing(150),
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7, 15, 7, 15),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
