import { Box } from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Title from "../../../components/Title";
import Layout from "../../../layouts/Layout";
import Filter from "./Filter";
import ListRequest from "./List";
import History from "./History";
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkStatusRequest, reformatDate } from "../../../helper";
import {
  getHistoryRequest,
  getRequest,
  getRequestByFilter,
  setListCommentSuccess,
} from "../../../redux/actions/request";
import { getListCategory } from "../../../redux/actions/category";
import { getListUser, getListAssignee } from "../../../redux/actions/user";
import Button from "../../../components/Button";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { TITLE_LIST_REQUEST } from "../../../constants/listTitle";
import { ADMIN } from "../../../constants/listRole";
import { getListDepartment } from "../../../redux/actions/department";
const List = (props) => {
  const {
    fetchRequest,
    fetchRequestByFilter,
    fetchCategory,
    fetchAssignee,
    fetchUser,
    fetchHistoryRequest,
    request,
    category,
    assignee,
    user,
    historyRequest,
    setListCommentDispatch,
    currentUser,
    department,
    fetchDepartment,
  } = props;
  const classes = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [listHistoryRequest, setListHistoryRequest] = useState([]);
  const [listAuthor, setListAuthor] = useState(user);
  const [listAssignee, setListAssignee] = useState(assignee);
  const [listDepartment, setListDepartment] = useState(department);

  const handleChangePage = (event, numberOfPage) => {
    setIsLoading(true);
    fetchRequestByFilter({
      params: { ...filter, page: numberOfPage },
      onSuccess: () => {
        setIsLoading(false);
      },
    });
  };
  useEffect(() => {
    document.title = TITLE_LIST_REQUEST;
    setIsLoading(true);
    fetchRequest({
      onSuccess: () => {
        setIsLoading(false);
      },
    });
    fetchHistoryRequest();
    fetchCategory();
    fetchAssignee();
    fetchUser();
    fetchDepartment();
  }, [
    fetchRequest,
    fetchCategory,
    fetchAssignee,
    fetchUser,
    fetchHistoryRequest,
    fetchDepartment,
  ]);

  useEffect(() => {
    Object.keys(request).length > 0 &&
      setRows(
        request?.data?.map((row) => ({
          id: row?.id,
          name: row?.name,
          content: row?.content,
          category: row?.category?.name,
          assignee: row?.assignee_to?.name,
          status: checkStatusRequest(parseInt(row?.status_request)),
          author: row?.user?.name,
          date: reformatDate(row?.due_date),
        }))
      );
  }, [request]);
  /**
   * WHO_AM_I
   */
  useEffect(() => {
    const listAuthorNotMe = user?.filter(
      (item) => item?.id !== currentUser?.id
    );
    setListAuthor([
      { id: currentUser?.id, name: "» My Request" },
      ...listAuthorNotMe,
    ]);
  }, [currentUser, user]);

  useEffect(() => {
    if (currentUser?.role_id === ADMIN) {
      const listAssigneeNotMe = assignee?.filter(
        (item) => item?.id !== currentUser?.id
      );
      setListAssignee([
        {
          id: currentUser?.id,
          name: "» Assignee to myself",
        },
        ...listAssigneeNotMe,
      ]);
    } else {
      setListAssignee(assignee);
    }
  }, [assignee, currentUser]);

  useEffect(() => {
    const listDepartmentNotMe = department?.filter(
      (item) => item?.id !== currentUser?.deparment_id
    );
    setListDepartment([
      { id: currentUser?.deparment_id, name: "» My Department" },
      ...listDepartmentNotMe,
    ]);
  }, [currentUser, department]);
  /**
   * SET_LIST_HISTORY
   */
  useEffect(() => {
    Object.keys(historyRequest).length > 0 &&
      setListHistoryRequest(
        historyRequest.data.map((request) => ({
          id: request?.request_id,
          content: request?.content_change,
          date: `${reformatDate(
            request?.created_at?.substring(0, 10)
          )} ${request?.created_at?.substring(10)}`,
          user: request?.user?.name,
          name: request?.request?.name,
          type: request?.type,
          contentChange: request?.request_change_detail,
        }))
      );
  }, [historyRequest]);

  const onHandleFilterModal = (data) => {
    setFilter(data);
    setIsLoading(true);
    fetchRequestByFilter({
      params: { ...data },
      onSuccess: () => {
        setIsLoading(false);
      },
    });
  };
  const onHandleClearModal = (data) => {
    setIsLoading(true);
    setFilter({});
    fetchRequest({
      onSuccess: () => {
        setIsLoading(false);
      },
    });
  };

  const handleChangeExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangePageAddRequest = () => {
    history.push({ pathname: "/create-request" });
  };
  /**
   * HISTORY
   */
  const handleChangePageHistory = (event, numberOfPage) => {
    fetchHistoryRequest({ params: { page: numberOfPage } });
  };
  /**
   * CHOOSE_ROW
   */
  const handleWatchDetail = (id) => {
    setListCommentDispatch([]);
    history.push({ pathname: `/requestDetail/${id}` });
  };
  return (
    <Layout>
      <Box p={10} className={classes.box__main}>
        <Box p={5} bgcolor="white" className={classes.box__filter}>
          <Box className={classes.header}>
            <Title
              title="List requests"
              variant="h6"
              paragraph={true}
              align="center"
            />
            <Button
              title="add"
              startIcon={<Add />}
              className={classes.btn}
              onClick={handleChangePageAddRequest}
            />
          </Box>
          <Filter
            handleChangeExpand={handleChangeExpand}
            expanded={expanded}
            onHandleFilterModal={onHandleFilterModal}
            onHandleClearModal={onHandleClearModal}
            category={category}
            assignee={listAssignee}
            user={listAuthor}
            isLoading={isLoading}
            department={listDepartment}
          />
          <Box
            className={clsx({
              [classes.box__table]: !expanded,
              [classes.box__table__open]: expanded,
            })}
          >
            <ListRequest
              rows={rows}
              page={request.current_page}
              count={request.last_page}
              handleChangePage={handleChangePage}
              isLoading={isLoading}
              handleWatchDetail={handleWatchDetail}
            />
          </Box>
        </Box>
        <Box p={5} bgcolor="white" className={classes.box__history}>
          <History
            list={listHistoryRequest}
            count={historyRequest?.last_page}
            page={historyRequest?.current_page}
            handleChangePageHistory={handleChangePageHistory}
            chooseHistoryRequest={handleWatchDetail}
          />
        </Box>
      </Box>
    </Layout>
  );
};
List.defaultProps = {
  request: {},
  assignee: [],
  category: [],
  user: [],
  historyRequest: {},
  currentUser: {},
  department: [],
};
List.propTypes = {
  fetchRequest: PropTypes.func,
  fetchCategory: PropTypes.func,
  fetchAssignee: PropTypes.func,
  fetchUser: PropTypes.func,
  fetchHistoryRequest: PropTypes.func,
  request: PropTypes.object,
  assignee: PropTypes.array,
  category: PropTypes.array,
  user: PropTypes.array,
  historyRequest: PropTypes.object,
  setListCommentDispatch: PropTypes.func,
  currentUser: PropTypes.object,
  fetchDepartment: PropTypes.func,
  department: PropTypes.array,
};

const mapStateToProps = (store) => {
  return {
    request: store.request.listRequest,
    category: store.category.listCategory,
    assignee: store.user.listAssignee,
    user: store.user.listUser,
    historyRequest: store.request.historyRequest,
    currentUser: store.user.currentUser,
    department: store.department.listDepartments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequest: (params) => {
      dispatch(getRequest(params));
    },
    fetchRequestByFilter: (params) => {
      dispatch(getRequestByFilter(params));
    },
    fetchCategory: () => {
      dispatch(getListCategory());
    },
    fetchAssignee: () => {
      dispatch(getListAssignee());
    },
    fetchUser: () => {
      dispatch(getListUser());
    },
    fetchHistoryRequest: (params) => {
      dispatch(getHistoryRequest(params));
    },
    setListCommentDispatch: (data) => {
      dispatch(setListCommentSuccess(data));
    },
    fetchDepartment: () => {
      dispatch(getListDepartment());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
