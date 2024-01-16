export const changeTab = (tabName) => {
  return { type: 'TAB_NAME_CHANGE', payload: tabName };
};

export default function navigationReducer(
  state = {
    tab: 'Sidebars',
  },
  action
) {
  switch (action.type) {
    case 'TAB_NAME_CHANGE':
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return state;
  }
}
