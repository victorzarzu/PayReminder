import React, {Component} from 'react'
import {View, Text, Button,TouchableOpacity,Image} from 'react-native'

export default class NavigateToHome extends Component{
    render(){
        return(
            <TouchableOpacity {...this.props}>
                <Image source = {require('../images/back-icon.png')} style ={{tintColor: '#0489B1', height: 30, width: 30}} />
            </TouchableOpacity>
        )
    }
}