import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default class NavigationButton extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress = {this.props.onPress}
            >
                <Text style = {{fontSize: 44, color: '#0489B1'}}>{this.props.text} -></Text>
            </TouchableOpacity>
        )
    }
}