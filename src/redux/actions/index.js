import { RESULT
} from "../types";

export const changeResult = value => ({
    type: RESULT,
    payload: value
});
