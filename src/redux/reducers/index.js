/* eslint-disable import/no-anonymous-default-export */
import { RESULT
} from "../types";
const initialState = {
    result: null,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case RESULT:
            return {
                ...state,
                result: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
