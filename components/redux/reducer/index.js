import InitialState from './InitialState';

const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'spareparts_search':
      return {...state, spareparts_search: action.payload};
    case 'selectedItemId':
      return {...state, selectedItemId: action.payload};
    case 'sparepartslist':
      return {...state, sparepartslist: action.payload};
    case 'loginModal':
      return {...state, loginModal: action.payload};
    case 'loginData':
      return {...state, loginData: action.payload};
    default:
      return {...state};
  }
};

export default Reducer;
