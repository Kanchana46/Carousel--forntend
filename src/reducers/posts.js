import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_BY_SEARCH,
    START_LOADING,
    STOP_LOADING,
    FETCH_POST,
    COMMENT
} from '../constants/actionType'

export default (state = { isLoading: false, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case STOP_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE:
            return { ...state, posts: [action.payload, ...state.posts] }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case COMMENT:
            console.log(state)
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) return action.payload;
                    return post;
                })
            }
        default:
            return state;
    }
}

