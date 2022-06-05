import React from "react";
import Title from "./Title";
import { Box, Avatar, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useThemes = makeStyles((theme) => ({
  user: {
    display: "flex",
    alignItems: "center",
  },

  inforUser: {
    paddingLeft: theme.spacing(5),
  },
  name: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightMedium,
  },
  date: {
    fontStyle: "italic",
    color: theme.palette.primary.main,
    fontSize: 12,
  },
}));

const BoxAvatar = (props) => {
  const { src, size, nameAuthor, date, typeDate, typeName, check } = props;
  const classes = useThemes();
  return (
    <Box className={classes.user}>
      <Avatar className={size} src={src} />
      <Box className={classes.inforUser}>
        <Title className={classes.name} variant={typeName} title={nameAuthor} />
        {check && (
          <Title className={classes.date} variant={typeDate} title={date} />
        )}
      </Box>
    </Box>
  );
};

BoxAvatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.node,
  nameAuthor: PropTypes.node,
  date: PropTypes.node,
  typeDate: PropTypes.string,
  typeName: PropTypes.string,
  check: PropTypes.bool,
};

export default BoxAvatar;
