import { makeStyles, Tooltip, withStyles } from "@material-ui/core";

export const TooltipDetail = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "transparent",
    fontSize: 16,
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}))(Tooltip);

export const useTheme = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(5),
  },
  container: {
    height: "90%",
    maxHeight: "90%",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
  },
  table: {
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    maxWidth: "300px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  cell: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    overflow: "hidden",
  },
  header: {
    position: "sticky",
    top: 0,
  },
}
), { index: 1 });
