import { Icon, Menu } from "semantic-ui-react";
import SearchComponent from "../../components/HomeHeader/SearchComponent";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authLogoutAction } from "../../redux/auth/actions";

const HomeHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogoutAction());
  };

  const handleProfile = () => {
    const user = localStorage.getItem("user");
    history.push("/profile/" + user);
  };

  return (
    <Menu
      icon="labeled"
      style={{
        position: "fixed",
        backgroundColor: "#1C172B",
        zIndex: 2,
        top: "0",
        width: "100%",
      }}
    >
      <Menu.Item name="gamepad" style={{ marginLeft: "590px" }}>
        <SearchComponent />
      </Menu.Item>
      <Menu.Item
        name="home"
        style={{ marginLeft: "100px", color: "white" }}
        onClick={() => history.push("/home")}
      >
        <Icon name="home" style={{ color: "white" }} />
        Home
      </Menu.Item>
      <Menu.Item
        name="user"
        style={{ marginLeft: "310px", color: "white" }}
        onClick={() => handleProfile()}
      >
        <Icon name="user" style={{ color: "white" }} />
        Profile
      </Menu.Item>
      <Menu.Item
        name="sign out alternate icon"
        style={{ color: "white" }}
        onClick={() => handleLogout()}
      >
        <i className="sign out alternate icon" style={{ color: "white" }} />
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default HomeHeader;
