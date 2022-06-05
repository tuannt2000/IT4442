import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  (theme) => ({
    list: {
      height: "85%",
    },
    root: {
      width: "100%",
      height: "calc(25% - 15px)",
      maxHeight: "calc(25% - 15px)",
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
      marginBottom: theme.spacing(5),
      borderRadius: theme.shape.borderRadius,
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    name: {
      fontSize: 16,
      whiteSpace: "nowrap",
    },
    cardContent: {
      position: "relative",
    },
    type: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      fontSize: theme.spacing(3),
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(5),
    },
  }),
  { index: 1 }
);
