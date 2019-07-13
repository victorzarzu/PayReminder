import React, {Component} from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {addFunds} from '../../../databases/profileSchemas'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class IncomeAmountInput extends Component{
    constructor(){
        super()
        this.state = {
            funds: ''
        }
    }
    render(){
        return(
            <View style = {styles.view}>
                <TextInput
                    value = {this.state.funds}
                    onChangeText = {funds => this.setState({funds}) /* se schimba valoarea din state */}
                    maxLength = {25}
                    keyboardType = "numeric"
                    textAlign = 'center'
                    textAlignVertical = 'center'
                    placeholder = "Enter amount of money"
                />
                <TouchableOpacity
                    onPress = {() => {
                        addFunds(parseFloat(this.state.funds)).then().catch(error => alert(`Can not add your funds: ${error}`)) //se adauga fonduri in baza de date
                        this.setState({funds: ''})
                    }}
                >
                    <Icon name = "add-box" size = {36} color = '#A3B9D5' />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addfunds: {
        width: 150,
        height: 40
    },
    button: {
        width: 50
    }
})