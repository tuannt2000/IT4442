import {
    AccountCircle,
    Home,
    MeetingRoomRounded,
    Add,
    CategoryRounded,
    Assistant
  } from "@material-ui/icons";
  import { ADMIN, MANAGER, USER } from "./listRole";
  
  export const listMenuItem = (id) => {
    switch (id) {
      case ADMIN:
        return {
          icon: [
            <Home />,
            <Add />,
            <AccountCircle />,
            <MeetingRoomRounded />,
            <CategoryRounded />,
            <Assistant />
          ],
          title: ["Home", "Add task", "User", "Department", "Category", "Statistical"],
          pathName: ["/", "/create-request", "/user", "/department", "/category", "/statistical"],
        };
  
      case USER:
        return {
          icon: [<Home />, <Add />],
          title: ["Home", "Add task"],
          pathName: ["/", "/create-request"],
        };
  
      case MANAGER:
        return {
          icon: [<Home />],
          title: ["Home"],
          pathName: ["/"],
        };
  
      default:
        return {};
    }
  };