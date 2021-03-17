import HomeHeader from "../../components/HomeHeader";
import HomepageMenu from "../../components/HomepageMenu";
import { Grid } from "semantic-ui-react";

const Frame = ({ isTrue, mid_style, middlePart, rightPart }) => {
  return (
    <>
      <HomeHeader />
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column style={{ width: "370px" }}>
            <HomepageMenu notification={isTrue} />
          </Grid.Column>
          <Grid.Column
            style={{
              paddingTop: 100,
            }}
            width={8}
          >
            <Grid.Row style={mid_style}>{middlePart}</Grid.Row>
          </Grid.Column>
          <Grid.Column style={{ paddingTop: 100 }} width={4}>
            {rightPart}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Frame;
