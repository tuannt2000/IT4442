export const STATUS = "status";
export const ACTION = "action";
export const ORDER = "order";

export const columns = [
  { id: ORDER, label: "NO", width: "7%", align: "center" },
  { id: "name", label: "Name", width: "25%" },
  { id: "description", label: "Description" },
  { id: STATUS, label: "Status", width: "10%", align: "center" },
  { id: ACTION, label: "Actions", width: "10%", align: "center" },
];

export const ACTIVE = 1;
export const INACTIVE = 0;

export const statusOfDepartment = (id) => {
  switch (parseInt(id)) {
    case ACTIVE:
      return "Active";

    case INACTIVE:
      return "In Active";

    default:
      return "";
  }
};

export const listStatusOfDepartment = [
  { id: ACTIVE.toString(), name: "Active" },
  { id: INACTIVE.toString(), name: "In Active" },
];