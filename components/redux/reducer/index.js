import InitialState from './InitialState';

export const BuyerReducer = (state = InitialState, action) => {
  action.type === 'loginData' && console.log('action called ', action.payload);
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
