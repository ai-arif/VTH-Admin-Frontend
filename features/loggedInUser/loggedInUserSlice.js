import { LoggedInUserData } from "./loggedInUserAPI";


const initialState = {
    data: {},
};

const loggedInUserDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoggedInUserData:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default loggedInUserDataReducer;
