import InitialState from './InitialState';

const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'spareparts_search':
      return {...state, spareparts_search: action.payload};
    case 'selectedItemId':
      return {...state, selectedItemId: action.payload};
    default:
      return {...state};
  }
};

export default Reducer;
