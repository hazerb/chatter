import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../redux/auth/api";
import { Form, Button, Message } from "semantic-ui-react";

const RegistComponent = ({
  handleLoginVisibility,
  handleRegistVisibility,
  handleValidVisibility,
}) => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    age: 0,
  });

  const dispatch = useDispatch();
  const selector = useSelector;
  const isSameEmail = selector((state) => state.auth.sameEmail);
  const [sameVisible, setSameVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signUp(input, handleRegistVisibility, handleValidVisibility));
  };

  useEffect(() => {
    if (isSameEmail) {
      setSameVisible(true);
      setLoading(false);
    }
  }, [isSameEmail]);

  return (
    <div>
      <Form
        onSubmit={handleRegister}
        style={{
          paddingTop: "140px",
          paddingLeft: "180px",
          fontSize: "16px",
        }}
      >
        <Form.Field>
          <label
            style={{
              color: "orange",
            }}
          >
            Name
          </label>
          <input
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            required={true}
            placeholder="name"
            style={{ width: "250px", height: "40px" }}
          />
        </Form.Field>
        <Form.Field>
          <label
            style={{
              color: "orange",
            }}
          >
            Surname
          </label>
          <input
            onChange={(e) => setInput({ ...input, surname: e.target.value })}
            required={true}
            placeholder="surname"
            style={{ width: "250px", height: "40px" }}
          />
        </Form.Field>
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
            placeholder="email"
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
        <Form.Field>
          <label
            style={{
              color: "orange",
            }}
          >
            How old are you?
          </label>
          <input
            required={true}
            placeholder="ex. 20"
            onChange={(e) =>
              setInput({ ...input, age: Number(e.target.value) })
            }
            style={{ width: "250px", height: "40px" }}
          />
        </Form.Field>
        <Button
          loading={loading}
          basic
          color="blue"
          type="submit"
          style={{ fontSize: "17px" }}
        >
          Register
        </Button>
        <a
          style={{ paddingLeft: "15px", cursor: "pointer", fontSize: "17px" }}
          onClick={(e) => {
            handleRegistVisibility(false);
            handleLoginVisibility(true);
          }}
        >
          Back to login
        </a>
      </Form>
      {sameVisible && (
        <Message negative style={{ width: "400px", marginLeft: "180px" }}>
          <Message.Header>This email address is used</Message.Header>
          <p>Please register with another one</p>
        </Message>
      )}
    </div>
  );
};

export default RegistComponent;
