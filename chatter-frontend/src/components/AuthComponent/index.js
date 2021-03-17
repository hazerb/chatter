import { useState, useEffect } from "react";
import LoginComponent from "../../components/AuthComponent/LoginComponent";
import RegistComponent from "../../components/AuthComponent/RegistComponent";
import Validation from "../../components/AuthComponent/Validation";

const AuthComponent = () => {
  const [loginVisible, setLoginVisible] = useState(true);
  const [registVisible, setRegistVisible] = useState(false);
  const [validationVisible, setValidVisible] = useState(false);

  const handleLoginVisibility = (x) => {
    setLoginVisible((prev) => x);
  };

  const handleRegistVisibility = (x) => {
    setRegistVisible((prev) => x);
  };

  const handleValidVisibility = (x) => {
    setValidVisible((prev) => x);
  };

  return (
    <div>
      {loginVisible && (
        <LoginComponent
          handleLoginVisibility={handleLoginVisibility}
          handleRegistVisibility={handleRegistVisibility}
        />
      )}
      {registVisible && (
        <RegistComponent
          handleLoginVisibility={handleLoginVisibility}
          handleRegistVisibility={handleRegistVisibility}
          handleValidVisibility={handleValidVisibility}
        />
      )}
      {validationVisible && (
        <Validation
          handleLoginVisibility={handleLoginVisibility}
          handleValidVisibility={handleValidVisibility}
        />
      )}
    </div>
  );
};

export default AuthComponent;
