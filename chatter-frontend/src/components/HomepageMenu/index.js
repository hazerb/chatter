import { Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const HomepageMenu = ({ notification }) => {
  const history = useHistory();

  return (
    <Grid style={{ paddingTop: "100px", position: "fixed", marginLeft: 155 }}>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            fontFamily: "sans-serif",
            paddingTop: "50px",
            cursor: "pointer",
            color: "orange",
          }}
          onClick={(e) => {
            history.push("/share");
          }}
        >
          <img style={{ height: 40, width: 40 }} src="/x.png" alt="image" />
          Share
        </a>
      </Grid.Row>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            fontFamily: "sans-serif",
            paddingTop: "30px",
            cursor: "pointer",
            color: "blue",
          }}
          onClick={(e) => {
            history.push("/new_ideas");
          }}
        >
          <img style={{ height: 40, width: 40 }} src="/z.png" alt="image" />
          New Ideas
        </a>
      </Grid.Row>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            fontFamily: "sans-serif",
            paddingTop: "30px",
            cursor: "pointer",
            color: "#1C172B",
          }}
          onClick={(e) => {
            history.push("/notifications");
          }}
        >
          <div
            className="ui icon button"
            //data-tooltip="6"
            data-position="top left"
            style={{ fontSize: 0.1, backgroundColor: "white" }}
          >
            {notification ? (
              <img
                style={{ height: 40, width: 40 }}
                src="/notificationcame.png"
                alt="image"
              />
            ) : (
              <img
                style={{ height: 40, width: 40 }}
                src="/notifications.png"
                alt="image"
              />
            )}
          </div>
          Notifications
        </a>
      </Grid.Row>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            fontFamily: "sans-serif",
            paddingTop: "30px",
            cursor: "pointer",
            color: "#1C172B",
          }}
          onClick={(e) => {
            history.push("/my_ideas");
          }}
        >
          <img style={{ height: 40, width: 40 }} src="/k.png" alt="image" />
          Your Ideas
        </a>
      </Grid.Row>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            paddingTop: "30px",
            cursor: "pointer",
            color: "#1C172B",
          }}
          onClick={(e) => {
            history.push("/liked_ideas");
          }}
        >
          <img style={{ height: 40, width: 40 }} src="/heart.png" alt="image" />
          Liked Ideas
        </a>
      </Grid.Row>
      <Grid.Row>
        <a
          style={{
            fontSize: "22px",
            paddingTop: "30px",
            cursor: "pointer",
            color: "#1C172B",
          }}
          onClick={(e) => {
            history.push("/saved_ideas");
          }}
        >
          <img
            style={{ height: 40, width: 40 }}
            src="/archive.png"
            alt="image"
          />
          Archive
        </a>
      </Grid.Row>
    </Grid>
  );
};

export default HomepageMenu;
