import { useFormik } from "formik";
import { useEffect, useState } from "react";
import UpdateUI from "./UpdateUI";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import Message from "../../../components/Message";
import * as infoRequest from "../../../constants/request";
import { connect } from "react-redux";
import {
  getRequestById,
  setListCommentSuccess,
  updateRequest,
} from "../../../redux/actions/request";
import { getListAssignee } from "../../../redux/actions/user";
import { getListCategory } from "../../../redux/actions/category";

const Update = (props) => {
  const {
    assignee,
    category,
    detailRequest,
    updateRequestDispatch,
    fetchCategory,
    fetchAssignee,
    fetchRequestById,
    setListCommentDispatch,
  } = props;
  const { id } = useParams();
  const history = useHistory();
  const [inputAuto, setInputAuto] = useState({ category_id: "", assignee: "" });
  const [listAssignee, setListAssignee] = useState(assignee);
  const [listCategory, setListCategory] = useState(category);
  const [defaultValue, setDefaultValue] = useState({
    category_id: {},
    assignee: {},
  });
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  /**
   * CALL_API
   */
  useEffect(() => {
    fetchCategory();
    fetchAssignee();
    fetchRequestById(id);
  }, [fetchCategory, fetchAssignee, fetchRequestById, id]);

  useEffect(() => {
    document.title = `Update: ${detailRequest?.name}`;
  }, [detailRequest]);

  useEffect(() => {
    if (assignee && detailRequest) {
      setDefaultValue((pre) => {
        const defaultValueAssignee = assignee.find(
          (item) => item?.id === detailRequest?.assignee
        );
        return {
          ...pre,
          assignee: {
            ...defaultValueAssignee,
          },
        };
      });
    }
  }, [assignee, detailRequest]);

  useEffect(() => {
    if (category && detailRequest) {
      setDefaultValue((pre) => {
        const defaultValueCategory = category.find(
          (item) => item.id === detailRequest.category_id
        );
        return {
          ...pre,
          category_id: {
            ...defaultValueCategory,
          },
        };
      });
    }
  }, [category, detailRequest]);
  const handleReturn = () => {
    setListCommentDispatch([]);
    history.goBack();
  };
  const handleClose = () => {
    setInfoMessage({ ...infoMessage, isOpen: false });
  };
  /**
   * ONSUCCESS_ONERROR
   */
  const onSuccessUpdate = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: "success",
    });
    setIsLoading(false);
    setListCommentDispatch([]);
    setTimeout(() => history.goBack(), 1000);
  };
  const onErrorUpdate = () => {
    setInfoMessage({
      message: "Update request thất bại!",
      isOpen: true,
      status: "error",
    });
    setIsLoading(false);
  };
  /**
   * FORMIK
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: detailRequest?.name || "",
      content: detailRequest?.content || "",
      assignee: detailRequest?.assignee || "",
      due_date: detailRequest?.due_date || "",
      category_id: detailRequest?.category_id || "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      updateRequestDispatch({
        id: id,
        params: { ...values },
        onSuccess: (message) => onSuccessUpdate(message),
        onError: () => onErrorUpdate(),
      });
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name request cannot be blank!")
        .max(
          infoRequest.MAX_OF_NAME,
          `Name must not exceed ${infoRequest.MAX_OF_NAME} characters!`
        )
        .min(
          infoRequest.MIN_OF_NAME,
          `Name must be more than ${infoRequest.MIN_OF_NAME} characters!`
        ),
      content: Yup.string()
        .required("Content request cannot be blank!")
        .max(
          infoRequest.MAX_OF_CONTENT,
          `Content must not exceed ${infoRequest.MAX_OF_CONTENT} characters!`
        )
        .min(
          infoRequest.MIN_OF_CONTENT,
          `Content must be more than ${infoRequest.MIN_OF_CONTENT} characters!`
        ),
      assignee: Yup.string().required("Assignee for request cannot be blank!"),
      due_date: Yup.date()
        .required("Please add due date for request!")
        .min(infoRequest.YESTERDAY, "Date cannot be in the past!"),
      category_id: Yup.string().required("Category for request cannot be blank!"),
    }),
  });
  /**
   * AUTOCOMPLETE
   */
  const onChangeAutocomplete = (selected, key) => {
    if (selected !== null) {
      formik.setFieldValue(key, selected.id);
      setDefaultValue({ ...defaultValue, [key]: selected });
    } else {
      formik.setFieldValue(key, "");
      setDefaultValue({
        ...defaultValue,
        [key]: {},
      });
    }
  };
  const onChangeInputSelect = (newValueInput, key) => {
    setInputAuto({ ...inputAuto, [key]: newValueInput });
  };
  const getCategoryById = (category, id) => {
    return category?.find((categoryItem) => categoryItem.id === id);
  };
  const checkAssigneeById = (users, id) => {
    return users?.some((userItem) => userItem.user_id === id);
  };
  /**
   * CHOOSE CATEGORY BEFORE
   */
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
   * CHOOSE ASSIGNEE BEFORE
   */
  useEffect(() => {
    formik.values.assignee === ""
      ? setListCategory(category)
      : setListCategory(
        category.filter((item) =>
          checkAssigneeById(item.users, formik.values.assignee)
        )
      );
  }, [formik.values.assignee, assignee, category]);

  return (
    <>
      <UpdateUI
        handleReturn={handleReturn}
        handleCreateRequest={formik.handleSubmit}
        handleChange={formik.handleChange}
        name="name"
        nameValue={formik.values.name}
        nameError={formik.errors.name}
        content="content"
        contentValue={formik.values.content}
        contentError={formik.errors.content}
        category="category_id"
        categoryValue={formik.values.category_id}
        categoryError={formik.errors.category_id}
        assignee="assignee"
        assigneeValue={formik.values.assignee}
        assigneeError={formik.errors.assignee}
        dueDate="due_date"
        dueDateValue={formik.values.due_date}
        dueDateError={formik.errors.due_date}
        listAssignee={listAssignee}
        listCategory={listCategory}
        onChangeAutocomplete={onChangeAutocomplete}
        onChangeInputSelect={onChangeInputSelect}
        defaultValue={defaultValue}
        input={inputAuto}
        isLoading={isLoading}
        nameTouched={formik.touched.name}
        contentTouched={formik.touched.content}
        categoryTouched={formik.touched.category_id}
        assigneeTouched={formik.touched.assignee}
        dueDateTouched={formik.touched.due_date}
      />
      <Message
        open={infoMessage.isOpen}
        handleClose={handleClose}
        title={infoMessage.message}
        status={infoMessage.status}
      />
    </>
  );
};
Update.defaultProps = {
  assignee: [],
  category: [],
  detailRequest: {},
};
Update.propTypes = {
  assignee: PropTypes.array,
  category: PropTypes.array,
  detailRequest: PropTypes.object,
  fetchCategory: PropTypes.func,
  fetchAssignee: PropTypes.func,
  fetchRequestById: PropTypes.func,
  updateRequestDispatch: PropTypes.func,
  setListCommentDispatch: PropTypes.func,
};

const mapStateToProps = (store) => {
  return {
    assignee: store.user.listAssignee,
    category: store.category.listCategory,
    detailRequest: store.request.detailRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: () => {
      dispatch(getListCategory());
    },
    fetchAssignee: () => {
      dispatch(getListAssignee());
    },
    fetchRequestById: (id) => {
      dispatch(getRequestById(id));
    },
    updateRequestDispatch: (data) => {
      dispatch(updateRequest(data));
    },
    setListCommentDispatch: (data) => {
      dispatch(setListCommentSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
