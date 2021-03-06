import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {DrawerNavigator, createDrawerNavigator} from 'react-navigation-drawer';

import Seller_Home_Screen from '../screens/seller/Home_screen/index';
import Buyer_Home_Screen from '../screens/buyer/homescreen/index';
import Login_Screen from '../screens/commonscreen/login_screen/index';
import SignUp_Screen from '../screens/commonscreen/signup_screen/index';
import SideBar from '../screens/seller/sidebar/sidebar';
import BuyerCategory from '../screens/buyer/category/index';
import Item_Detail_Screen from '../screens/buyer/category/itemDetail';
import Order_Screen from '../screens/buyer/orders/index';
import Profile from '../screens/commonscreen/profile/index';
import Splash_Screen from '../screens/splashsreen/index';
import AddProduct from '../screens/seller/Home_screen/add_product';
import AddImages from '../screens/seller/Home_screen/selectImages';
import SellerOrderList from '../screens/seller/Home_screen/orderlist';
import SellerOrderDetail from '../screens/seller/Home_screen/orderDetail';
import OtherUserProfile from '../screens/buyer/otheruserprofile/index';
import UserAdds from '../screens/buyer/userAdds/index';
import Chat_Screen from '../screens/buyer/chat/index';

const HomeScreenRouter = createStackNavigator(
  {
    Login: {screen: Login_Screen},
    SignUp: {screen: SignUp_Screen},
    SellerHomeScreen: {screen: Seller_Home_Screen},
    BuyerHomeScreen: {screen: Buyer_Home_Screen},
    BuyerCategory: {screen: BuyerCategory},
    BuyerItemDetail: {screen: Item_Detail_Screen},
    OrderScreen: {screen: Order_Screen},
    Profile: {screen: Profile},
    SplashScreen: {screen: Splash_Screen},
    AddProduct: {screen: AddProduct},
    AddImages: {screen: AddImages},
    SellerOrderList: {screen: SellerOrderList},
    SellerOrderDetail: {screen: SellerOrderDetail},
    OtherUserProfile: {screen: OtherUserProfile},
    UserAdds: {screen: UserAdds},
    chatScreen: {screen: Chat_Screen},
  },
  {
    initialRouteName: 'BuyerHomeScreen',
    defaultNavigationOptions: {
      header: null,
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);
export default createAppContainer(HomeScreenRouter);
