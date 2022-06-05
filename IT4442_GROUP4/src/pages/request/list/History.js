import {
  Box,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Title from "../../../components/Title";
import { useStyles } from "./style/history";
import PropTypes from "prop-types";
import { COMMENT, CREATE, DELETE, UPDATE } from "../../../constants/request";
import BoxAvatar from "../../../components/BoxAvatar";
import { hiddenString, returnFieldHistory } from "../../../helper";

const History = (props) => {
  const { list, count, page, handleChangePageHistory, chooseHistoryRequest } =
    props;
  const classes = useStyles();

  const listFieldUpdate = (contentChangeDetail) => {
    return contentChangeDetail?.map((item) => returnFieldHistory(item.field));
  };

  const setContentHistory = (type, contentChange, contentChangeDetail) => {
    switch (type) {
      case CREATE:
        return "Created!";

      case COMMENT:
        return `Comment: ${contentChange}.`;

      case UPDATE:
        return `Updated: ${listFieldUpdate(contentChangeDetail)?.join(", ")}.`;

      case DELETE:
        return "Deleted!";

      default:
        return "";
    }
  };

  const listHistoryRequest = list.map((request, index) => (
    <Tooltip
      key={index}
      title={
        DELETE === request.type ? "Can't choose because Request deleted!" : ""
      }
      PopperProps={{
        popperOptions: {
          modifiers: {
            offset: {
              enabled: true,
              offset: "0, -30px",
            },
          },
        },
      }}
    >
      <CardActionArea
        className={classes.root}
        key={index}
        onClick={() =>
          request?.type !== DELETE && chooseHistoryRequest(request.id)
        }
      >
        <CardContent className={classes.cardContent}>
          <BoxAvatar
            src=""
            size={classes.avatar}
            nameAuthor={request.user}
            date={request.date}
            typeDate="subtitle2"
            typeName="body1"
            check={true}
          />
          <Title
            id="name"
            className={classes.name}
            title={hiddenString(
              DELETE === request.type ? request.content : request.name,
              25
            )}
            variant="h6"
          />
          <Title
            id="content"
            title={
              request.type &&
              hiddenString(
                setContentHistory(
                  request.type,
                  request.content,
                  request.contentChange
                ),
                35
              )
            }
            variant="body2"
          />
          <Chip className={classes.type} label={request.type} color="primary" />
        </CardContent>
      </CardActionArea>
    </Tooltip>
  ));
  return (
    <>
      <Title
        title="History request"
        variant="h6"
        paragraph={true}
        align="center"
      />
      <Box component="div" className={classes.list}>
        {listHistoryRequest}
      </Box>
      <Pagination
        className={classes.pagination}
        count={count}
        color="primary"
        siblingCount={0}
        page={+page}
        onChange={handleChangePageHistory}
      />
    </>
  );
};
History.defaultProps = {
  list: [],
};
History.propTypes = {
  list: PropTypes.array.isRequired,
  count: PropTypes.number,
  page: PropTypes.number,
  handleChangePageHistory: PropTypes.func,
  chooseHistoryRequest: PropTypes.func,
};

export default History;
