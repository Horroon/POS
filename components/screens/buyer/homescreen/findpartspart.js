import React, {useReducer, useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Text,
  Icon,
  View,
  Input,
} from 'native-base';
import {showMessage} from 'react-native-flash-message';
import {Button} from 'react-native-elements';
import gql from 'graphql-tag';
import client from '../../apollo_config/config';
import {useDispatch, useSelector} from 'react-redux';
import Redux_Reducer from '../../../redux/reducer/index';

const reducer = (state, action) => {
  switch (action.type) {
    case 'MakeModelYearCategoryLocation':
      return {...state, MakeModelYearCategoryLocation: action.payload};
    case 'selectedVehicleModelYear':
      return {...state, selectedVehicleModelYear: action.payload};
    case 'selectedVehicleCategory':
      return {...state, selectedVehicleCategory: action.payload};
    case 'selectedvehicleModel':
      return {...state, selectedvehicleModel: action.payload};
    case 'selectedVehicleMake':
      return {...state, selectedVehicleMake: action.payload};
    case 'loader':
      return {...state, loader: action.payload};
    case 'spareParts':
      return {...state, spareParts: action.payload};
    case 'selectedLocation':
      return {...state, selectedLocation: action.payload};
    default:
      return {...state};
  }
};
const InitialState = {
  loader: false,
  MakeModelYearCategoryLocation: {
    vehicleMakes: [],
    vehicleModels: [],
    vehicleModelYears: [],
    vehicleCategories:[],
    locations: [],
  },
  selectedVehicleModelYear: 0,
  selectedVehicleCategory: 0,
  selectedvehicleModel: 0,
  spareParts: [],
  selectedVehicleMake: 0,
  selectedLocation: 0,
};

//Main Functon
const FindPartsForm = props => {
  const store = useSelector(store => store);
  const dispatch = useDispatch(Redux_Reducer);

  const [state, setState] = useReducer(reducer, InitialState);

  useEffect(() => {
    VehicleMake_Request();
  }, []);

  const updateStore = () => {
    if (
      state.selectedVehicleMake !== 0 &&
      state.selectedVehicleCategory !== 0 &&
      state.selectedVehicleModelYear !== 0 &&
      state.selectedvehicleModel !== 0 &&
      state.selectedLocation !== 0
    ) {
      console.log('component state is ', state);
      dispatch({
        type: 'spareparts_search',
        payload: {
          vehicleMake: state.selectedVehicleMake,
          vehicleModel: state.selectedvehicleModel,
          vehicleModelYear: state.selectedVehicleModelYear,
          category: state.selectedVehicleCategory,
          location: state.selectedLocation,
        },
      });

      props.navigation.navigation.navigate('BuyerCategory');
    } else {
      showMessage({message: 'Please All Fields Are Required', type: 'danger'});
    }
  };
  console.log('store is ', store);
  const VehicleMake_Request = async () => {
    try {
      setState({type: 'loader', payload: true});
      const {data, errors, loading} = await client.query({
        query: gql`
          query {
            findParts {
              vehicleMakes {
                id
                name
              }
              vehicleModels {
                id
                name
              }
              vehicleModelYears {
                id
                name
              }
              vehicleCategories {
                id
                name
              }
              locations {
                id
                city
              }
            }
          }
        `,
        fetchPolicy: 'network-only',
      });

      if (data) {
        console.log('data.vehiclemakes ', data.findParts);
        
        setState({
          type: 'MakeModelYearCategoryLocation',
          payload: data.findParts,
        });
        setState({type: 'loader', payload: false});
      }
    } catch (e) {
      console.log('eer ', e);
      if (e.graphQLErrors[0]) {
        setState({type: 'loader', payload: false});
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        setState({type: 'loader', payload: false});
        //console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  console.log('res...', state.MakeModelYearCategoryLocation)
  return (
    <Form
      style={{
        padding: 2,
        backgroundColor: 'lightgray',
        paddingTop: 20,
        borderRadius: 5,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 20,
          fontFamily: 'fantasy',
        }}>
        FIND PART BY VEHICLE
      </Text>
      <View style={{padding: 5, marginTop: 20}}>
        <Item picker style={{borderBottomColor: 'red'}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
            style={{color: 'gray', fontSize: 14}}
            placeholder="VEHICLE MAKE"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={state.selectedVehicleMake}
            onValueChange={e => {
              setState({type: 'selectedVehicleMake', payload: e});
            }}>
            <Picker.Item label={'Vehicle Make'} value={0} />
            {state.MakeModelYearCategoryLocation.vehicleMakes.map(make => {
              return (
                <Picker.Item label={make.name} value={make.id} key={make.id} />
              );
            })}
          </Picker>
        </Item>
        <Item picker style={{borderBottomColor: 'red'}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
            style={{color: 'gray'}}
            placeholder="VEHICLE MODEL"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={state.selectedvehicleModel}
            onValueChange={e => {
              setState({type: 'selectedvehicleModel', payload: e});
            }}>
            <Picker.Item label="VEHICLE MODEL" value={0} />
            {state.MakeModelYearCategoryLocation.vehicleModels.map(Item => {
              return (
                <Picker.Item
                  key={Item.id}
                  label={Item.name}
                  value={Item.id}
                />
              );
            })}
          </Picker>
        </Item>
        <Item picker style={{borderBottomColor: 'red'}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
            style={{color: 'gray'}}
            placeholder="MODEL YEAR"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={state.selectedVehicleModelYear}
            onValueChange={e =>
              setState({type: 'selectedVehicleModelYear', payload: e})
            }>
            <Picker.Item label="Vehicle Model Year" value={0} />
            {state.MakeModelYearCategoryLocation.vehicleModelYears.map(year => {
                return (
                  <Picker.Item
                    key={year.id}
                    label={year.name}
                    value={year.id}
                  />
                );
            })}
          </Picker>
        </Item>
        <Item picker style={{borderBottomColor: 'red'}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
            style={{color: 'gray'}}
            placeholder="CATEGORY"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={state.selectedVehicleCategory}
            onValueChange={e =>
              setState({type: 'selectedVehicleCategory', payload: e})
            }>
            <Picker.Item label="Category" value={0} />
            {state.MakeModelYearCategoryLocation.vehicleCategories.map(Item => {
              return (
                <Picker.Item
                  key={Item.id}
                  label={Item.name}
                  value={Item.id}
                />
              );
            })}
          </Picker>
        </Item>

        <Item picker style={{borderBottomColor: 'red'}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
            style={{color: 'gray'}}
            placeholder="LOCATION"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={state.selectedLocation}
            onValueChange={e =>
              setState({type: 'selectedLocation', payload: e})
            }>
            <Picker.Item label="Location" value={0} />
            {state.MakeModelYearCategoryLocation.locations.map(location => {
                return (
                  <Picker.Item
                    key={location.id}
                    label={location.city}
                    value={location.id}
                  />
                );
            })}
          </Picker>
        </Item>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 40,
            marginBottom: 10,
            backgroundColor: 'red',
            borderRadius: 5,
          }}>
          <Button
            loading={state.loader}
            title="Search Now"
            full
            buttonStyle={{backgroundColor: 'red'}}
            onPress={() => {
              updateStore();
            }}
          />
        </View>
      </View>
    </Form>
  );
};

//Main Functon End
export default FindPartsForm;
