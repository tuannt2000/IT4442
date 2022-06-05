import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import Layout from "../../../layouts/Layout";
import { useTheme } from "./style";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import StarRateIcon from "@material-ui/icons/StarRate";
import {
  statusRequest,
  OPEN,
  IN_PROGRESS,
  CLOSE,
  CREATE,
  COMMENT,
  UPDATE,
} from "../../../constants/request";
import BoxAvatar from "../../../components/BoxAvatar";
import { reformatDate, returnFieldHistory } from "../../../helper";
import CategoryIcon from "@material-ui/icons/Category";
import PropTypes from "prop-types";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { Skeleton } from "@material-ui/lab";
import EventBusyIcon from "@material-ui/icons/EventBusy";

const DetailUI = (props) => {
  const {
    infoRequest,
    listComment,
    handleReturn,
    handleDelete,
    handleUpdate,
    handleApproveAndReject,
    hasHandleDelete,
    hasHandleUpdate,
    hasHandleRejectAndApproved,
    isLoading,
    commentText,
    handleComment,
    handleChange,
    countComment,
    handleScroll,
  } = props;
  const classes = useTheme();

  const setColorChip = (id) => {
    return id === OPEN
      ? "primary"
      : id === IN_PROGRESS
      ? "secondary"
      : "default";
  };
  /**
   * DATA
   */
  const {
    name,
    status_request,
    userName,
    due_date,
    content,
    categoryName,
    assigneeName,
    created_at,
  } = infoRequest;

  const listFieldUpdate = (contentChangeDetail) => {
    return contentChangeDetail?.map((item) =>
      returnFieldHistory(item?.field, item?.old_value, item?.new_value)
    );
  };

  const setContentHistory = (type, contentChange, contentChangeDetail) => {
    switch (type) {
      case CREATE:
        return "Created!";

      case COMMENT:
        return contentChange;

      case UPDATE:
        return listFieldUpdate(contentChangeDetail)?.map((item, index) => (
          <div key={index}>
            <Typography key={index} component={"span"} variant={"body2"}>
              {item}
            </Typography>
            <br />
          </div>
        ));

      default:
        return "";
    }
  };

  return (
    <Layout>
      <Box p={5} className={classes.root}>
        <Box
          p={5}
          className={classes.container}
          height="100%"
          display="flex"
          flexDirection="column"
          gridGap={16}
          justifyContent="space-between"
        >
          <Grid container direction="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" gridGap="20px">
              {name ? (
                <Title title={name} variant="h6" />
              ) : (
                <Skeleton animation="wave" width={200} />
              )}
              {status_request ? (
                <Chip
                  icon={<StarRateIcon />}
                  label={
                    statusRequest.find((item) => item.id === status_request)
                      ?.name
                  }
                  color={setColorChip(status_request)}
                />
              ) : (
                <Skeleton animation="wave" width={200} />
              )}
            </Box>
            <Box display="flex" flexDirection="row" gridGap="20px">
              <Button
                className={classes.btn}
                title="Return"
                color="default"
                startIcon={<KeyboardReturnIcon />}
                onClick={handleReturn}
              />
              {hasHandleDelete && (
                <Button
                  className={classes.btn}
                  title={
                    isLoading.delete ? (
                      <CircularProgress size={27} color="inherit" />
                    ) : (
                      "Delete"
                    )
                  }
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                />
              )}
              {hasHandleUpdate && (
                <Button
                  className={classes.btn}
                  title="Update"
                  startIcon={<EditIcon />}
                  onClick={handleUpdate}
                />
              )}
              {hasHandleRejectAndApproved && status_request !== CLOSE && (
                <>
                  {status_request !== IN_PROGRESS && (
                    <Button
                      className={classes.btn}
                      title={
                        isLoading.approve ? (
                          <CircularProgress size={27} color="inherit" />
                        ) : (
                          "Approve"
                        )
                      }
                      startIcon={<ThumbUpIcon />}
                      onClick={() => handleApproveAndReject(IN_PROGRESS)}
                    />
                  )}
                  <Button
                    className={classes.btn}
                    color="secondary"
                    title={
                      isLoading.reject ? (
                        <CircularProgress size={27} color="inherit" />
                      ) : (
                        "Reject"
                      )
                    }
                    startIcon={<ThumbDownAltIcon />}
                    onClick={() => handleApproveAndReject(CLOSE)}
                  />
                </>
              )}
            </Box>
          </Grid>
          <BoxAvatar
            check={true}
            nameAuthor={
              userName ? userName : <Skeleton animation="wave" width={200} />
            }
            date={
              created_at ? (
                ` Created ${reformatDate(
                  created_at.substring(0, 10)
                )} ${created_at.substring(10)}`
              ) : (
                <Skeleton animation="wave" width={200} />
              )
            }
            typeDate="body1"
            typeName="h6"
          />
          <Box className={classes.content}>
            <Title
              title={
                content ? content : <Skeleton animation="wave" width={200} />
              }
            />
          </Box>
          <Grid container justifyContent="space-between" direction="row" spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Title
                title="Category:"
                variant="body1"
                className={classes.title}
              />
              {categoryName ? (
                <Chip
                  className={classes.chip}
                  icon={<CategoryIcon />}
                  label={categoryName}
                  color="primary"
                />
              ) : (
                <Skeleton
                  className={classes.skeleton}
                  animation="wave"
                  width={200}
                  height={40}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Title
                title="Assign:"
                variant="body1"
                className={classes.title}
              />
              {assigneeName ? (
                <Chip
                  className={classes.chip}
                  avatar={
                    <Avatar>
                      {assigneeName?.charAt(0)?.toLocaleUpperCase()}
                    </Avatar>
                  }
                  label={assigneeName}
                  color="primary"
                />
              ) : (
                <Skeleton
                  className={classes.skeleton}
                  animation="wave"
                  width={200}
                  height={40}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Title
                title="Due date:"
                variant="body1"
                className={classes.title}
              />
              {due_date ? (
                <Chip
                  className={classes.chip}
                  icon={<EventBusyIcon />}
                  label={reformatDate(due_date)}
                  color="primary"
                />
              ) : (
                <Skeleton
                  className={classes.skeleton}
                  animation="wave"
                  width={200}
                  height={40}
                />
              )}
            </Grid>
          </Grid>
          <Title
            title={`Comment (${listComment.length}/${countComment}):`}
            variant="body1"
          />
          {/* LIST_COMMENT */}
          <Box className={classes.boxComment} p={3} onScroll={handleScroll}>
            {listComment.length !== 0 && listComment.length < countComment && (
              <Title
                title="Scroll up to see more..."
                className={classes.seeMore}
              />
            )}
            {listComment.length === 0 ? (
              <Title title="No comment!" />
            ) : (
              listComment.map((item, index) => (
                <Box m={3} p={2} key={index} display="flex" direction="row">
                  <Box>
                    <Avatar className={classes.avatarComment} />
                  </Box>
                  <Box className={classes.commentInfo}>
                    <Title
                      className={classes.name}
                      title={item?.user?.name}
                      variant="subtitle2"
                    />
                    <Title
                      paragraph
                      className={classes.date}
                      title={
                        item?.created_at
                          ? `${reformatDate(
                              item?.created_at.substring(0, 10)
                            )} ${item?.created_at.substring(10)}`
                          : ""
                      }
                    />
                    <Box>
                      {setContentHistory(
                        item?.type,
                        item?.content_change,
                        item?.request_change_detail
                      )}
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
          {/* INPUT_COMMENT */}
          <TextField
            className={classes.inputComment}
            id="inputComment"
            variant="outlined"
            placeholder="Write a comment..."
            fullWidth
            autoFocus={true}
            value={commentText}
            onChange={handleChange}
            onKeyDown={handleComment}
            multiline
            label="Ctrl + Enter to comment..."
            maxRows={3}
          />
        </Box>
      </Box>
    </Layout>
  );
};
DetailUI.defaultProps = {
  infoRequest: {},
  listComment: [],
  countComment: 0,
};
DetailUI.propTypes = {
  infoRequest: PropTypes.object,
  listComment: PropTypes.array,
  handleReturn: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleApproveAndReject: PropTypes.func,
  hasHandleDelete: PropTypes.bool,
  hasHandleUpdate: PropTypes.bool,
  hasHandleRejectAndApproved: PropTypes.bool,
  isLoading: PropTypes.object,
  commentText: PropTypes.string,
  handleComment: PropTypes.func,
  handleChange: PropTypes.func,
  countComment: PropTypes.number,
  handleScroll: PropTypes.func,
};
export default DetailUI;
