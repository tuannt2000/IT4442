import DetailUI from "./DetailUI";
import { useEffect, useState } from "react";
import Message from "../../../components/Message";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { IN_PROGRESS, OPEN } from "../../../constants/request";
import { MANAGER } from "../../../constants/listRole";
import ModalUpdate from "./ModalUpdate";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createComment,
  deleteRequest,
  getListComment,
  getRequestById,
  setListCommentSuccess,
  setRequestByIdSuccess,
  updateRequest,
} from "../../../redux/actions/request";
import { getListAssignee } from "../../../redux/actions/user";
import { getListCategory } from "../../../redux/actions/category";
import { connect } from "react-redux";
import ModalDelete from "./ModalDelete";

const ENTER = 13;
const Detail = (props) => {
  const {
    detailRequest,
    currentUser,
    assignee,
    category,
    comment,
    deleteRequestDispatch,
    updateRequestDispatch,
    setRequestById,
    createCommentDispatch,
    getListCommentDispatch,
    setListCommentDispatch,
    fetchRequestById,
    fetchCategory,
    fetchAssignee,
  } = props;
  const { id } = useParams();
  const history = useHistory();
  const [listAssignee, setListAssignee] = useState(assignee);
  const [isLoading, setIsLoading] = useState({
    approve: false,
    reject: false,
    update: false,
    delete: false,
  });
  const [commentText, setCommentText] = useState("");
  const [hasHandleDelete, setHasHandleDelete] = useState(false);
  const [hasHandleUpdate, setHasHandleUpdate] = useState(false);

  const [hasHandleRejectAndApproved, setHasHandleRejectAndApproved] =
    useState(false);
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [infoRequest, setInfoRequest] = useState({
    id: "",
    name: "",
    status_request: "",
    due_date: "",
    categoryName: "",
    userName: "",
    assigneeName: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  /**
   * CALL_API
   */
  useEffect(() => {
    fetchRequestById(id);
    fetchAssignee();
    fetchCategory();
    getListCommentDispatch({ id: id });
  }, [
    fetchRequestById,
    id,
    fetchAssignee,
    fetchCategory,
    getListCommentDispatch,
  ]);

  useEffect(() => {
    document.title = `Request: ${infoRequest?.name}`;
  }, [infoRequest]);
  /**
   * FORMIK
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      level: detailRequest?.level || "",
      status_request: detailRequest?.status_request || "",
      category_id: detailRequest?.category_id || "",
      assignee: detailRequest?.assignee || "",
    },
    onSubmit: (values) => {
      setIsLoading({ ...isLoading, update: true });
      updateRequestDispatch({
        id: id,
        params: { ...values },
        onSuccess: (message) =>
          onSuccessUpdate(message, {
            ...detailRequest,
            ...values,
            assignee_to: setUserAssignee(),
          }),
        onError: () => onErrorUpdate(),
      });
    },
    validationSchema: Yup.object({
      status_request: Yup.string().required("Status request cannot be blank!"),
      level: Yup.string().required("Level cannot be blank!"),
      assignee: Yup.string().required("Assignee cannot be blank!"),
    }),
  });
  /**
   * FUNCTION
   */
  // DELETE
  const onSuccessDelete = () => {
    setInfoMessage({
      isOpen: true,
      message: "Xóa request thành công!",
      status: "success",
    });
    setIsLoading({ ...isLoading, delete: false });
    setTimeout(() => history.goBack(), 1000);
  };
  const onErrorDelete = () => {
    setInfoMessage({
      message: "Xóa request thất bại!",
      isOpen: true,
      status: "error",
    });
    setIsLoading({ ...isLoading, delete: false });
  };
  // UPDATE
  const onSuccessUpdate = (message, newRequest) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: "success",
    });
    setIsLoading({
      ...isLoading,
      update: false,
      approve: false,
      reject: false,
    });
    setRequestById(newRequest);
    setListComment([]);
    getListCommentDispatch({ id: id, params: { page: 1 } });
    setIsOpen(false);
  };
  const onErrorUpdate = () => {
    setInfoMessage({
      message: "Update request thất bại!",
      isOpen: true,
      status: "error",
    });
    setIsLoading({
      ...isLoading,
      update: false,
      approve: false,
      reject: false,
    });
  };
  /**
   * SET_INFO_REQUEST
   */
  useEffect(() => {
    Object.keys(detailRequest).length > 0 &&
      setInfoRequest({
        ...detailRequest,
        categoryName: detailRequest?.category?.name,
        userName: detailRequest?.user?.name,
        assigneeName: detailRequest?.assignee_to?.name,
      });
  }, [detailRequest]);
  /**
   * CONDITION
   */
  const creatorAndOpenRequest =
    detailRequest?.user?.id === currentUser?.id &&
    detailRequest?.status_request === OPEN;

  const managerAndOpenRequestAndSameDepartmentRequest =
    detailRequest?.user?.deparment_id === currentUser?.deparment_id &&
    currentUser?.role_id === MANAGER &&
    detailRequest?.status_request === OPEN;

  const adminAndRequestOfAdmin =
    detailRequest?.user?.id === detailRequest?.assignee &&
    detailRequest?.assignee === currentUser?.id;

  const adminAndInProgressRequest =
    detailRequest?.status_request === IN_PROGRESS &&
    detailRequest?.assignee === currentUser?.id;

  const adminAndOpenRequest =
    detailRequest?.assignee === currentUser?.id &&
    detailRequest?.status_request === OPEN;

  const adminAndOtherUserRequest =
    currentUser?.id === detailRequest?.assignee &&
    currentUser?.id !== detailRequest?.user?.id;

  const creatorAndSameUserRequest = detailRequest?.user?.id === currentUser?.id;
  /**
   * SHOW_OR_HIDDEN_BUTTON
   */
  useEffect(() => {
    if (creatorAndOpenRequest) {
      setHasHandleDelete(true);
    } else {
      setHasHandleDelete(false);
    }
  }, [creatorAndOpenRequest]);

  useEffect(() => {
    if (
      managerAndOpenRequestAndSameDepartmentRequest ||
      adminAndRequestOfAdmin ||
      adminAndInProgressRequest
    ) {
      setHasHandleRejectAndApproved(true);
    } else {
      setHasHandleRejectAndApproved(false);
    }
  }, [
    managerAndOpenRequestAndSameDepartmentRequest,
    adminAndRequestOfAdmin,
    adminAndInProgressRequest,
  ]);

  useEffect(() => {
    if (creatorAndOpenRequest || adminAndOpenRequest) {
      setHasHandleUpdate(true);
    } else {
      setHasHandleUpdate(false);
    }
  }, [creatorAndOpenRequest, adminAndOpenRequest]);
  /**
   * HANDLE_BUTTON
   */
  const handleClose = () => {
    setInfoMessage({ ...infoMessage, isOpen: false });
  };

  const handleReturn = () => {
    history.goBack();
  };

  const handleDelete = () => {
    setIsOpenDelete(true);
  };

  const handleUpdate = () => {
    if (adminAndOtherUserRequest) {
      formik.resetForm();
      setIsOpen(true);
    } else if (creatorAndSameUserRequest) {
      history.push({
        pathname: `../updateRequest/${id}`,
        state: { ...detailRequest },
      });
    }
  };

  const handleApproveAndReject = (key) => {
    key === IN_PROGRESS
      ? setIsLoading({ ...isLoading, approve: true })
      : setIsLoading({ ...isLoading, reject: true });
    updateRequestDispatch({
      id: id,
      params: { status_request: key },
      onSuccess: (message) =>
        onSuccessUpdate(message, {
          ...detailRequest,
          status_request: key,
        }),
      onError: () => onErrorUpdate(),
    });
  };
  /**
   * HANDLE_COMMENT
   */
  const onSuccessComment = (data) => {
    listComment.length < comment?.total &&
      setListComment((pre) => {
        pre.shift();
        return [...pre];
      });
    setListCommentDispatch({
      ...comment,
      total: comment.total + 1,
      data: listComment?.concat(data)?.reverse(),
    });
    setListComment([]);
    setCommentText("");
  };
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleComment = (event) => {
    if (event.ctrlKey && event.keyCode === ENTER) {
      createCommentDispatch({
        id: id,
        params: { content_change: event.target.value },
        onSuccess: (data) => onSuccessComment(data),
      });
      setCommentText("");
    }
  };
  /**
   * MODAL
   */
  const getCategoryById = (category, id) => {
    return category?.find((categoryItem) => categoryItem.id === id);
  };
  const checkAssigneeById = (users, id) => {
    return users?.some((userItem) => userItem.user_id === id);
  };
  const setUserAssignee = () => {
    return listAssignee?.find((item) => item?.id === formik.values.assignee);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    formik.values.category_id === ""
      ? setListAssignee(assignee)
      : setListAssignee(
        assignee.filter((item) =>
          checkAssigneeById(
            getCategoryById(category, formik.values.category_id)?.users,
            item.id
          )
        )
      );
  }, [formik.values.category_id, assignee, category]);
  /**
   * LIST_COMMENT
   */
  useEffect(() => {
    comment.data &&
      setListComment((pre) => comment?.data?.reverse()?.concat(pre));
  }, [comment]);

  const handleScroll = (event) => {
    const scroll = event.target;
    if (scroll.scrollTop === 0 && listComment.length < comment?.total) {
      getListCommentDispatch({
        id: id,
        params: { page: parseInt(comment?.current_page) + 1 },
        onSuccess: () => {
          scroll.scrollTop = 24;
        },
      });
    }
  };
  /**
   * MODAL_DELETE
   */
  const handleDisagreeDelete = () => {
    setIsOpenDelete(false);
  };
  const handleAgreeDelete = () => {
    setIsLoading({ ...isLoading, delete: true });
    deleteRequestDispatch({
      id: id,
      onSuccess: () => onSuccessDelete(),
      onError: () => onErrorDelete(),
    });
    setIsOpenDelete(false);
  };
  return (
    <>
      <DetailUI
        infoRequest={infoRequest}
        listComment={listComment}
        handleReturn={handleReturn}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleApproveAndReject={handleApproveAndReject}
        hasHandleDelete={hasHandleDelete}
        hasHandleUpdate={hasHandleUpdate}
        hasHandleRejectAndApproved={hasHandleRejectAndApproved}
        isLoading={isLoading}
        commentText={commentText}
        handleComment={handleComment}
        handleChange={handleChange}
        countComment={comment?.total}
        handleScroll={handleScroll}
      />
      <ModalUpdate
        listAssignee={listAssignee}
        listCategory={category}
        isOpen={isOpen}
        isLoading={isLoading.update}
        handleCloseModal={handleCloseModal}
        handleChange={formik.handleChange}
        status="status_request"
        statusValue={formik.values.status_request}
        statusError={formik.errors.status_request}
        level="level"
        levelValue={formik.values.level}
        levelError={formik.errors.level}
        category="category_id"
        categoryValue={formik.values.category_id}
        assignee="assignee"
        assigneeValue={formik.values.assignee}
        assigneeError={formik.errors.assignee}
        handleSubmitModal={formik.handleSubmit}
      />
      <Message
        open={infoMessage.isOpen}
        handleClose={handleClose}
        title={infoMessage.message}
        status={infoMessage.status}
      />
      <ModalDelete
        open={isOpenDelete}
        handleDisagreeDelete={handleDisagreeDelete}
        handleAgreeDelete={handleAgreeDelete}
      />
    </>
  );
};

Detail.defaultProps = {
  detailRequest: {},
  currentUser: {},
  assignee: [],
  category: [],
  comment: {},
};

Detail.propTypes = {
  detailRequest: PropTypes.object,
  currentUser: PropTypes.object,
  category: PropTypes.array,
  assignee: PropTypes.array,
  fetchRequestById: PropTypes.func,
  fetchAssignee: PropTypes.func,
  fetchCategory: PropTypes.func,
  deleteRequestDispatch: PropTypes.func,
  updateRequestDispatch: PropTypes.func,
  setRequestById: PropTypes.func,
  comment: PropTypes.object,
  createCommentDispatch: PropTypes.func,
  getListCommentDispatch: PropTypes.func,
  setListCommentDispatch: PropTypes.func,
};

const mapStateToProps = (store) => {
  return {
    detailRequest: store.request.detailRequest,
    currentUser: store.user.currentUser,
    assignee: store.user.listAssignee,
    category: store.category.listCategory,
    comment: store.request.listComment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequestById: (id) => {
      dispatch(getRequestById(id));
    },
    fetchCategory: () => {
      dispatch(getListCategory());
    },
    fetchAssignee: () => {
      dispatch(getListAssignee());
    },
    deleteRequestDispatch: (data) => {
      dispatch(deleteRequest(data));
    },
    updateRequestDispatch: (data) => {
      dispatch(updateRequest(data));
    },
    setRequestById: (newRequest) => {
      dispatch(setRequestByIdSuccess(newRequest));
    },
    createCommentDispatch: (data) => {
      dispatch(createComment(data));
    },
    getListCommentDispatch: (data) => {
      dispatch(getListComment(data));
    },
    setListCommentDispatch: (data) => {
      dispatch(setListCommentSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
