import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Container, Content} from 'native-base';
import Header from '../Header/index';
import Upload_Image from '../../../../assests/upload_image.png';
import Logo from '../../../../assests/logo.png';
import ImagePicker from 'react-native-image-picker';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {showMessage} from 'react-native-flash-message';
import client, {mylink} from '../../apollo_config/config';
import gql from 'graphql-tag';
import {ReactNativeFile} from 'apollo-upload-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddSpareparts_list from '../../../redux/actions/addSpareparts_list';

const options = {
  title: 'Select Sparepart Picture',
  noData: true,
};

class SelectImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      picture1: {url: '', base64: ''},
      picture2: {url: '', base64: ''},
      picture3: {url: '', base64: ''},
      picture4: {url: '', base64: ''},
      picture5: {url: '', base64: ''},
      serverbase64: '',
      modalVisible: false,
    };
  }

  //open image picker model
  OpenImagePicker = async id => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        showMessage({message: response.error, type: 'danger'});
      } /* else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }  */ else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        /*   this.setState({
          profile: 'data:image/jpeg;base64,' + response.data,
        }); */
        //this.SendImageOnServer(`data:image/jpeg;base64,${response.data}`, id);
        const SendImageOnServer = async () => {
          const file = new ReactNativeFile({
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
          try {
            this.setState({modalVisible: true});
            const {data, loading} = await client.mutate({
              mutation: gql`
                mutation MakeImage($sparepartId: ID!, $file: Upload) {
                  makeImage(file: $file, sparepartId: $sparepartId)
                }
              `,
              variables: {
                sparepartId: this.props.navigation.getParam('itemId'),
                file: file,
              },
            });

            if (data) {
              this.setState({
                modalVisible: false,
              });
              if (id == 1) {
                const {picture1} = this.state;
                picture1.url = `${mylink}${data.makeImage}`;
                this.setState({picture1});
              }

              if (id == 2) {
                const {picture2} = this.state;
                picture2.url = `${mylink}${data.makeImage}`;
                this.setState({picture2});
              }

              if (id == 3) {
                const {picture3} = this.state;
                picture3.url = `${mylink}${data.makeImage}`;
                this.setState({picture3});
              }

              if (id == 4) {
                const {picture4} = this.state;
                picture4.url = `${mylink}${data.makeImage}`;
                this.setState({picture4});
              }

              if (id == 5) {
                const {picture5} = this.state;
                picture5.url = `${mylink}${data.makeImage}`;
                this.setState({picture5});
              }
            }
            console.log('data in send image on server method', data);
          } catch (e) {
            console.log('eer ', e);
            if (e.graphQLErrors[0]) {
              this.setState({modalVisible: false});
              showMessage({
                message: e.graphQLErrors[0].message,
                type: 'danger',
              });
            }
            if (e.networkError) {
              this.setState({modalVisible: false});
              //console.log('error ', e.networkError);
              showMessage({
                message: 'Network Problem!',
                type: 'danger',
              });
            }
          }
        };
        SendImageOnServer();
      }
    });
  };
  //close OpenImagePicker

  //send Image on Server method start
  /*  SendImageOnServer = async (base64, id) => {
    try {
      this.setState({modalVisible: true})
      const {data, loading} = await client.query({
        query: gql`
          query MakeImage($url: String!, $sparepartId: ID!) {
            makeImage(url: $url, sparepartId: $sparepartId)
          }
        `,
        variables: {
          sparepartId: this.props.navigation.getParam('itemId'),
          url: base64,
        },
      });

      this.setState({
        modalVisible: loading,
      });
      if (id == 1) {
        const {picture1} = this.state;
        picture1.url = `${mylink}${data.makeImage}`;
        this.setState({picture1});
      }

      if (id == 2) {
        const {picture2} = this.state;
        picture2.url = `${mylink}${data.makeImage}`;
        this.setState({picture2});
      }

      if (id == 3) {
        const {picture3} = this.state;
        picture3.url = `${mylink}${data.makeImage}`;
        this.setState({picture3});
      }

      if (id == 4) {
        const {picture4} = this.state;
        picture4.url = `${mylink}${data.makeImage}`;
        this.setState({picture4});
      }

      if (id == 5) {
        const {picture5} = this.state;
        picture5.url = `${mylink}${data.makeImage}`;
        this.setState({picture5});
      }
      console.log('data in send image on server method', data);
    } catch (e) {
      console.log('eer ', e);
      if (e.graphQLErrors[0]) {
        this.setState({modalVisible: false});
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        this.setState({modalVisible: false});
        //console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  }; */
  //send Image on Server method end

  getCurrentItemFromServer = async () => {
    try {
      this.setState({modalVisible: true});
      const {data, loading, errors} = await client.query({
        query: gql`
          query findSparepartById($id: ID!) {
            findSparepartById(id: $id) {
              id
              name
              address
              location {
                city
                country
              }
              price
              pictures {
                id
                url
              }
            }
          }
        `,
        variables: {
          id: this.props.navigation.getParam('itemId'),
        },
      });

      if (data) {
        this.setState({
          modalVisible: false,
        });
        let array = this.props.store.sparepartslist;
        array.push(data.findSparepartById);
        this.props.addSpareparts_list(array);

        this.props.navigation.navigate('SellerOrderList');
      }
    } catch (e) {
      console.log('eer ', e);
      if (e.graphQLErrors[0]) {
        this.setState({modalVisible: false});
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        this.setState({modalVisible: false});
        //console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  render() {
    console.log(
      'this.props.navigation.getParam("itemId")',
      this.props.navigation.getParam('itemId'),
    );
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="ios-arrow-round-back"
          headerMethod={() => this.props.navigation.goBack()}
          iconStyle={{}}
          navigation={this.props.navigation}>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }}>
            PARTS
          </Text>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'red',
              fontWeight: 'bold',
            }}>
            WHEEL
          </Text>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }}>
            .COM
          </Text>
        </Header>
        <Content>
          <View
            style={{
              width: '100%',
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                height: 150,
                justifyContent: 'center',
              }}>
              <Image source={Logo} style={{height: 150, width: 150}} />
            </View>
          </View>
          <View
            style={{
              height: 700,
              justifyContent: 'space-around',
              flexDirection: 'column',
              paddingTop: 40,
            }}>
            {/* first row start*/}
            <View
              style={{
                height: 200,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <TouchableOpacity onPress={() => this.OpenImagePicker(1)}>
                  <Image
                    source={
                      this.state.picture1.url
                        ? {uri: this.state.picture1.url}
                        : Upload_Image
                    }
                    style={styles.con1Img1}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity onPress={() => this.OpenImagePicker(2)}>
                  <Image
                    source={
                      this.state.picture2.url
                        ? {uri: this.state.picture2.url}
                        : Upload_Image
                    }
                    style={styles.con1Img1}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* first row end*/}

            {/* second row start*/}
            <View
              style={{
                height: 200,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View>
                <TouchableOpacity onPress={() => this.OpenImagePicker(3)}>
                  <Image
                    source={
                      this.state.picture3.url
                        ? {uri: this.state.picture3.url}
                        : Upload_Image
                    }
                    style={styles.con1Img1}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* second row end*/}

            {/* third row start*/}
            <View
              style={{
                height: 200,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <TouchableOpacity onPress={() => this.OpenImagePicker(4)}>
                  <Image
                    source={
                      this.state.picture4.url
                        ? {uri: this.state.picture4.url}
                        : Upload_Image
                    }
                    style={styles.con1Img1}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity onPress={() => this.OpenImagePicker(5)}>
                  <Image
                    source={
                      this.state.picture5.url
                        ? {uri: this.state.picture5.url}
                        : Upload_Image
                    }
                    style={styles.con1Img1}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* third row end*/}

            {/* Button view start*/}
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 10,
                borderRadius: 5,
              }}>
              <Button
                loading={this.state.loader}
                title="Next"
                full
                buttonStyle={{backgroundColor: 'red'}}
                onPress={() => {
                  this.getCurrentItemFromServer();
                }}
              />
            </View>
            {/* Button view end */}
          </View>
          <LoaderModal
            state={this.state}
            setState={obj => {
              this.setState(obj);
            }}
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {store: state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSpareparts_list: AddSpareparts_list,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectImages);

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  con1: {height: 200, justifyContent: 'flex-end', alignItems: 'center'},
  con1Img1: {height: 150, width: 150},
  con2: {height: 590, justifyContent: 'center'},
  con2Con1: {height: 580, alignSelf: 'center', width: '100%'},
  con3: {height: 200},
});

export {styles};
