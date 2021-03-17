import * as actions from "../actionTypes";

const initialState = {
  shareSuccessful: false,
  ownIdeas: [],
  newIdeas: [],
  savedIdeas: [],
  likedIdeas: [],
  theIdea: {},
  isLiked: null,
  isDisliked: "hhh",
  isSaved: null,
  comments: [],
  isCommented: false,
  ownLoading: true,
  likedLoading: true,
  shouldGetOwn: true,
  shouldGetLiked: true,
  shouldGetSaved: true,
  savedLoading: true,
  ideaLoading: true,
};

const ideaShareSuccessfulReducer = (state, action) => {
  return {
    ...state,
    shareSuccessful: true,
    shouldGetOwn: true,
  };
};

const ideaShareNeutralReducer = (state, action) => {
  return {
    ...state,
    shareSuccessful: false,
  };
};

const ideaGetOwnReducer = (state, action) => {
  return {
    ...state,
    ownIdeas: action.payload,
    ownLoading: false,
    shouldGetOwn: false,
  };
};

const ideaGetNewReducer = (state, action) => {
  return {
    ...state,
    newIdeas: action.payload,
  };
};

const ideaGetTheReducer = (state, action) => {
  return {
    ...state,
    theIdea: action.payload,
    ideaLoading: false,
  };
};

const ideaLoadingReducer = (state, action) => {
  return {
    ...state,
    ideaLoading: true,
  };
};

const ideaGetActionsReducer = (state, action) => {
  return {
    ...state,
    isLiked: action.payload.isLiked,
    isDisliked: action.payload.isDisliked,
    isSaved: action.payload.isSaved,
  };
};

const ideaLikeReducer = (state, action) => {
  return {
    ...state,
    isLiked: true,
    shouldGetLiked: true,
  };
};

const ideaDislikeReducer = (state, action) => {
  return {
    ...state,
    isDisliked: true,
  };
};

const ideaSaveReducer = (state, action) => {
  return {
    ...state,
    isSaved: true,
    shouldGetSaved: true,
  };
};

const ideaNotLikeReducer = (state, action) => {
  return {
    ...state,
    isLiked: false,
  };
};

const ideaNotDislikeReducer = (state, action) => {
  return {
    ...state,
    isDisliked: false,
  };
};

const ideaAddCommentReducer = (state, action) => {
  return {
    ...state,
    isCommented: !state.isCommented,
  };
};

const ideaGetCommentReducer = (state, action) => {
  return {
    ...state,
    comments: action.payload,
  };
};

const ideaGetSavedReducer = (state, action) => {
  return {
    ...state,
    savedIdeas: action.payload,
    savedLoading: false,
    shouldGetSaved: false,
  };
};

const ideaGetLikedReducer = (state, action) => {
  return {
    ...state,
    likedIdeas: action.payload,
    likedLoading: false,
    shouldGetLiked: false,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.IDEA_SHARE_SUCCESSFUL:
      return ideaShareSuccessfulReducer(state, action);
    case actions.IDEA_SHARE_NEUTRAL:
      return ideaShareNeutralReducer(state, action);
    case actions.IDEA_OWN:
      return ideaGetOwnReducer(state, action);
    case actions.IDEA_NEW:
      return ideaGetNewReducer(state, action);
    case actions.IDEA_GET_THE:
      return ideaGetTheReducer(state, action);
    case actions.IDEA_GET_ACTIONS:
      return ideaGetActionsReducer(state, action);
    case actions.IDEA_LIKE:
      return ideaLikeReducer(state, action);
    case actions.IDEA_DISLIKE:
      return ideaDislikeReducer(state, action);
    case actions.IDEA_SAVE:
      return ideaSaveReducer(state, action);
    case actions.IDEA_NOT_LIKE:
      return ideaNotLikeReducer(state, action);
    case actions.IDEA_NOT_DISLIKE:
      return ideaNotDislikeReducer(state, action);
    case actions.IDEA_COMMENT_ADD:
      return ideaAddCommentReducer(state, action);
    case actions.IDEA_COMMENT_GET:
      return ideaGetCommentReducer(state, action);
    case actions.IDEA_GET_SAVED:
      return ideaGetSavedReducer(state, action);
    case actions.IDEA_GET_LIKED:
      return ideaGetLikedReducer(state, action);
    case actions.IDEA_LOADING:
      return ideaLoadingReducer(state, action);
    default:
      return state;
  }
}
