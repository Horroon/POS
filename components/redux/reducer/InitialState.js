const InitialState = {
  spareparts_search: {
    vehicleMake: '',
    vehicleModel: '',
    vehicleModelYear: '',
    category: '',
    location: '',
  },
  selectedItemId: 0,
  sparepartslist: [],
  loginModal: false,
  loginData: {token: null, lg_Id: null, lgn_email: null},
};

export default InitialState;
