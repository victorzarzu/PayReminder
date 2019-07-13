import React, {Component} from 'react'
import {Text, View} from 'react-native'

import NameTextInput from './NameTextInput'

export default class Inputs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: ""
        }
    }
    render() {
        return(
            <View>
                <NameTextInput
                    value = {this.state.firstName}
                    onChangeText = {text => this.setState({firstName: text})}
                    placeholder = "First Name"
                />
                <NameTextInput
                    value = {this.state.lastName}
                    onChangeText = {text => this.setState({lastName: text})}
                    placeholder = "Last Name"
                />
            </View>
        )
    }
}