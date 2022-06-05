import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles, withStyles } from "@material-ui/core";

export const Accordion = withStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
}))(MuiAccordion);

export const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: theme.spacing(2, 0),
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}))(MuiAccordionDetails);

export const useTheme = makeStyles((theme) => ({
  modal__form__item: {
    width: `calc(25% - 15px)`,
  },
  btn__options__text: {
    paddingLeft: theme.spacing(2),
  },
  modal: {
    zIndex: 5,
    left: theme.spacing(5),
    right: theme.spacing(5),
    transition: "all .3s ease-in-out",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modal__form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(5),
    justifyContent: "flex-start",
    flexFlow: "wrap",
    alignItems: "center",
  },
  box__btn: {
    width: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing(5),
  },
  box__btn__item: {
    width: theme.spacing(35),
    textTransform: "unset",
  },
}));
