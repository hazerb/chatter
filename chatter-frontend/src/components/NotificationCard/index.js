import { Segment, Item, Button } from "semantic-ui-react";
import { deleteNotification } from "../../redux/popularity/api";
import { useDispatch } from "react-redux";

const NotificationCard = ({ notification }) => {
  const dispatch = useDispatch();
  const content = () => {
    switch (notification.action) {
      case 1:
        return <span> liked your idea titled </span>;
      case 2:
        return <span> disliked your idea titled </span>;
      case 3:
        return <span> commented on your idea titled </span>;
    }
  };

  const handleClose = () => {
    dispatch(deleteNotification(notification.id));
  };

  return (
    <Segment style={{ width: 640 }}>
      <Item>
        <Item.Content verticalAlign="middle">
          <Item.Header style={{ fontSize: 20 }} as="a">
            <span style={{ color: "gray" }}>
              {notification.user.name} {notification.user.surname}
            </span>{" "}
            {content()}
            <span style={{ color: "gray" }}>{notification.idea.title}</span>
          </Item.Header>
          <Button
            style={{
              position: "absolute",
              left: "580px",
              bottom: "6px",
              color: "red",
            }}
            circular
            icon="close"
            onClick={handleClose}
          />
        </Item.Content>
      </Item>
    </Segment>
  );
};

export default NotificationCard;
