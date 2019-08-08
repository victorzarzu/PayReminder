import React from 'react'
import {Platform} from 'react-native'
import { createAppContainer} from 'react-navigation'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'

import PersonProfile from './PersonProfile/PersonProfile'
import PersonHomeStack from './PersonHome/PersonHomeStack'

// crearea unui bottom tab navigator pentru a naviga intre Profile si Home switch navigator

import {queryProfile} from '../databases/profileSchemas'

const PersonTab = createMaterialBottomTabNavigator({
    Home: {
        screen: PersonHomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name={'home'} size = {28} color = {tintColor} />
        }
    },
    Profile: {
        screen: PersonProfile,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicon name = {Platform.OS == 'android' ? 'md-person' : 'ios-person'} size = {28} color = {tintColor} />
        }
    },
},
{
    initialRouteName: 'Home',
    activeColor: '#143C6D',
    inactiveColor: '#7DA0CC',
    barStyle: { 
        backgroundColor: '#DDE8F2',
    },
    labeled: false
})

export default createAppContainer(PersonTab)