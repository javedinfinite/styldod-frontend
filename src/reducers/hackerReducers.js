import Actions from  '../actionConstants/hackerActionConstants'

const initialState = {
  userList: [],
  isLoading: false,
  selecteduser: {},
  totalUsersCount: '',
  someUsers: [],
  userDetails: [],
  topUsers: [],
  error: '',
};

export default (state = initialState, action) => {
switch (action.type) {

  case Actions.USERS_COUNT_REQUESTED:
    return {
      ...state,
      error: action.error || '',
      totalUsersCount:   '',
      isLoading: true,
    };
    case Actions.USERS_COUNT_RECEIVED:
    return {
      ...state,
      error:  '',
      totalUsersCount: action.payload.count || '',
      isLoading: false,
    };
    case Actions.USERS_COUNT_ERROR:
    return {
      ...state,
      error: action.error || 'Something went wrong while fetching users counts',
      isLoading: false,
    };

    case Actions.SOME_USERS_REQUESTED:
      return {
        ...state,
        error: action.error || '',
        someUsers:   {},
        isLoading: false,
      };
      case Actions.SOME_USERS_RECEIVED:
      return {
        ...state,
        error:  '',
        someUsers: action.payload.someUsers || {},
        isLoading: false,
      };
      case Actions.SOME_USERS_ERROR:
      return {
        ...state,
        error: action.error || 'Something went wrong while fetching some users ',
        isLoading: false,
      };


      case Actions.USER_DETAILS_REQUESTED:
        return {
          ...state,
          error: action.error || '',
          userDetails:   {},
          isLoading: false,
        };
        case Actions.USER_DETAILS_RECEIVED:
        return {
          ...state,
          error:  '',
          userDetails: action.payload.userDetails || {},
          isLoading: false,
        };
        case Actions.USER_DETAILS_ERROR:
        return {
          ...state,
          error: action.error || 'Something went wrong while fetching user details ',
          isLoading: false,
        };


        case Actions.TOP_USERS_REQUESTED:
          return {
            ...state,
            error: action.error || '',
            topUsers:   {},
            isLoading: false,
          };
          case Actions.TOP_USERS_RECEIVED:
          return {
            ...state,
            error:  '',
            topUsers: action.payload.topUsers || {},
            isLoading: false,
          };
          case Actions.TOP_USERS_ERROR:
          return {
            ...state,
            error: action.error || 'Something went wrong while fetching top users ',
            isLoading: false,
          };

default:
  return state;
}
};