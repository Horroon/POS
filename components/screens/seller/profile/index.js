import React, { Component } from "react";
import Profile from "./code.js";
import {createStackNavigator} from "react-navigation-stack";
export default (DrawNav = createStackNavigator({
  Profile: { screen: Profile }
}));
