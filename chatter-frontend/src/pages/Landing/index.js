import React, { useEffect } from "react";
import { Content } from "./style";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import AuthComponent from "../../components/AuthComponent";
import LandingFont from "../../components/LandingFont";
import { authLogoutFalseAction } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authLogoutFalseAction());
  }, []);

  return (
    <Content>
      <Grid columns={2}>
        <LandingFont />
        <Grid.Column>
          <AuthComponent />
        </Grid.Column>
      </Grid>
    </Content>
  );
};

export default Landing;
