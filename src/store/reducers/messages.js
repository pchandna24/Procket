/* eslint-disable prettier/prettier */
export const updateMessages = (root) => {
    return { type: 'UPDATE_MESSAGES', payload: root };
};

export default function messageReducer(
    state = {
        root: '',
    },
    action
) {
    switch (action.type) {
        case 'UPDATE_MESSAGES':
            return {
                ...state,
                root: action.payload,
            };
        default:
            return state;
    }
}
