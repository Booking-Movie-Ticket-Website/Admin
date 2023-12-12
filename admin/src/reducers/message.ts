import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

interface MessageState {
    message: string | null;
}

interface Action {
    type: string;
    payload: string | null;
}

const initialState: MessageState = {
    message: null
};

export default function (state = initialState, action: Action): MessageState {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}
