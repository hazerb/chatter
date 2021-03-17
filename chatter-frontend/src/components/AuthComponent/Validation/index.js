import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { validateCode } from "../../../redux/auth/api";

import { Form, Button, Message } from "semantic-ui-react";

const Validation = ({ handleLoginVisibility, handleValidVisibility }) => {
  const [input, setInput] = useState({
    code: "",
  });
  const [errorVisible, seterrorVisible] = useState(false);
  const [successVisible, setsuccessVisible] = useState(false);
  const [formVisible, setformVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector;
  const history = useHistory();

  const validationSuccessful = selector(
    (state) => state.auth.validationSuccessful
  );

  useEffect(() => {
    if (validationSuccessful == false) {
      seterrorVisible((prev) => true);
    } else if (validationSuccessful == true) {
      setformVisible((prev) => false);
      seterrorVisible((prev) => false);
      setsuccessVisible((prev) => true);
    }
    setLoading(false);
  }, [validationSuccessful]);

  const handleValidation = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(validateCode({ ...input, action: "validation" }));
  };

  const backToLogin = (e) => {
    e.preventDefault();
    handleValidVisibility(false);
    handleLoginVisibility(true);
  };

  return (
    <>
      {formVisible && (
        <Form
          onSubmit={handleValidation}
          style={{
            paddingTop: "230px",
            paddingLeft: "180px",
            fontSize: "20px",
          }}
        >
          <p style={{ marginRight: "10px", color: "orange" }}>
            We've sent verification code to your e-mail. <br></br>Please enter
            the code. Also check spams{" "}
          </p>
          <Form.Field>
            <label
              style={{
                color: "orange",
              }}
            >
              Code
            </label>
            <input
              onChange={(e) => setInput({ ...input, code: e.target.value })}
              required={true}
              placeholder="code"
              style={{ width: "250px", height: "40px" }}
            />
          </Form.Field>
          <Button
            basic
            color="blue"
            loading={loading}
            style={{ fontSize: "17px", marginLeft: "3px" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
      {errorVisible && (
        <Message negative style={{ width: "400px", marginLeft: "180px" }}>
          <Message.Header>Verification code is wrong</Message.Header>
          <p>Please check the code again</p>
        </Message>
      )}
      {successVisible && (
        <>
          <Message
            positive
            style={{ marginTop: "300px", width: "400px", marginLeft: "180px" }}
          >
            <Message.Header>Verification is complete</Message.Header>
            <p>You can now login</p>
          </Message>
          <Button
            basic
            color="orange"
            style={{ fontSize: "17px", marginLeft: "180px" }}
            type="submit"
            onClick={(e) => {
              backToLogin(e);
            }}
          >
            Go to Login
          </Button>
        </>
      )}
    </>
  );
};

export default Validation;
