import * as actions from "../actionTypes";

export const ideaShareSuccessfulAction = () => {
  return {
    type: actions.IDEA_SHARE_SUCCESSFUL,
  };
};

export const ideaShareNeutralAction = () => {
  return {
    type: actions.IDEA_SHARE_NEUTRAL,
  };
};

export const ideaGetOwnAction = (response) => {
  return {
    type: actions.IDEA_OWN,
    payload: response,
  };
};

export const ideaGetNewAction = (response) => {
  return {
    type: actions.IDEA_NEW,
    payload: response,
  };
};

export const ideaGetTheAction = (response) => {
  return {
    type: actions.IDEA_GET_THE,
    payload: response,
  };
};

export const ideaGetActionsAction = (response) => {
  return {
    type: actions.IDEA_GET_ACTIONS,
    payload: response,
  };
};

export const ideaLikeAction = () => {
  return {
    type: actions.IDEA_LIKE,
  };
};

export const ideaDislikeAction = () => {
  return {
    type: actions.IDEA_DISLIKE,
  };
};

export const ideaSaveAction = () => {
  return {
    type: actions.IDEA_SAVE,
  };
};

export const ideaNotLikeAction = () => {
  return {
    type: actions.IDEA_NOT_LIKE,
  };
};

export const ideaNotDislikeAction = () => {
  return {
    type: actions.IDEA_NOT_DISLIKE,
  };
};

export const ideaAddCommentAction = () => {
  return {
    type: actions.IDEA_COMMENT_ADD,
  };
};

export const ideaGetCommentAction = (response) => {
  return {
    type: actions.IDEA_COMMENT_GET,
    payload: response,
  };
};

export const ideaGetSavedAction = (response) => {
  return {
    type: actions.IDEA_GET_SAVED,
    payload: response,
  };
};

export const ideaGetLikedAction = (response) => {
  return {
    type: actions.IDEA_GET_LIKED,
    payload: response,
  };
};
