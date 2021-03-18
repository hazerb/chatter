import * as actions from "./actions";
import api from "../../axios";

export const share = (body, type, socket) => {
  return (dispatch) => {
    api()
      .post("/idea/add/" + type, body)
      .then((response) => {
        dispatch(actions.ideaShareSuccessfulAction(response.data.token));
        socket.emit("shared");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getOwnIdeas = () => {
  return (dispatch) => {
    api()
      .get("/idea/own")
      .then((response) => {
        dispatch(actions.ideaGetOwnAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getNewIdeas = (topic, count) => {
  return (dispatch) => {
    api()
      .get("/idea/new/" + topic + "/" + count)
      .then((response) => {
        dispatch(actions.ideaGetNewAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getTheIdea = (id) => {
  return (dispatch) => {
    api()
      .get("/idea/the/" + id)
      .then((response) => {
        dispatch(actions.ideaGetTheAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getActions = (id) => {
  return (dispatch) => {
    api()
      .get("/actions/" + id)
      .then((response) => {
        dispatch(actions.ideaGetActionsAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const like = (id, ownerId, socket) => {
  return (dispatch) => {
    dispatch(actions.ideaLikeAction());
    api()
      .post("/actions/like", { id, ownerId })
      .then((response) => {
        socket.emit("like", ownerId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const dislike = (id, ownerId, socket) => {
  return (dispatch) => {
    dispatch(actions.ideaDislikeAction());
    api()
      .post("/actions/dislike", { id, ownerId })
      .then((response) => {
        socket.emit("dislike", ownerId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const save = (id, ownerId) => {
  return (dispatch) => {
    dispatch(actions.ideaSaveAction());
    api()
      .post("/actions/save", { id, ownerId })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const notLike = (id, ownerId, socket) => {
  return (dispatch) => {
    api()
      .delete("/actions/notLike/" + id + "/" + ownerId)
      .then((response) => {
        dispatch(actions.ideaNotLikeAction());
        socket.emit("notLike");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const notDislike = (id, ownerId, socket) => {
  return (dispatch) => {
    api()
      .delete("/actions/notDislike/" + id + "/" + ownerId)
      .then((response) => {
        dispatch(actions.ideaNotDislikeAction());
        socket.emit("notDislike");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const addComment = (body, ownerId, socket) => {
  return (dispatch) => {
    api()
      .post("/comment/add/", body)
      .then((response) => {
        dispatch(actions.ideaAddCommentAction());
        socket.emit("comment", ownerId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getComment = (ideaId) => {
  return (dispatch) => {
    api()
      .get("/comment/" + ideaId)
      .then((response) => {
        dispatch(actions.ideaGetCommentAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getSaved = () => {
  return (dispatch) => {
    api()
      .get("/idea/saved")
      .then((response) => {
        dispatch(actions.ideaGetSavedAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getLiked = () => {
  return (dispatch) => {
    api()
      .get("/idea/liked")
      .then((response) => {
        dispatch(actions.ideaGetLikedAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};
