import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../redux/auth/api";
import { Form, Button, Message } from "semantic-ui-react";

const LoginComponent = ({ handleLoginVisibility, handleRegistVisibility }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const selector = useSelector;
  const history = useHistory();

  const loginSuccessful = selector((state) => state.auth.loginSuccessful);
  const loginFailed = selector((state) => state.auth.loginFailed);
  const loading = selector((state) => state.auth.loginLoading);

  useEffect(() => {
    if (loginSuccessful) history.push("/home");
  }, [loginSuccessful]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  return (
    <Form
      onSubmit={handleLogin}
      style={{
        paddingTop: "200px",
        paddingLeft: "300px",
        fontSize: "17px",
      }}
    >
      <Form.Field>
        <label
          style={{
            color: "orange",
          }}
        >
          E-mail Address
        </label>
        <input
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          required={true}
          placeholder="e-mail address"
          style={{ width: "250px", height: "40px" }}
        />
      </Form.Field>
      <Form.Field>
        <label
          style={{
            color: "orange",
          }}
        >
          Password
        </label>
        <input
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          required={true}
          type="password"
          placeholder="password"
          style={{ width: "250px", height: "40px" }}
        />
      </Form.Field>
      <Button
        basic
        loading={loading}
        color="yellow"
        style={{ fontSize: "17px", marginLeft: "4px" }}
        type="submit"
      >
        Login
      </Button>
      <a
        style={{ paddingLeft: "15px", cursor: "pointer", fontSize: "18px" }}
        onClick={(e) => {
          handleLoginVisibility(false);
          handleRegistVisibility(true);
        }}
      >
        Register
      </a>
      {loginFailed && (
        <Message
          negative
          style={{ fontSize: "13px", width: "255px", marginRight: "10px" }}
        >
          <Message.Header>E-mail or password is wrong</Message.Header>
          <p>Please try again</p>
        </Message>
      )}
    </Form>
  );
};

export default LoginComponent;
