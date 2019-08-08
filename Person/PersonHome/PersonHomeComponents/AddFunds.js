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
                    placeholder = {this.props.language == 'EN' ? 'Enter amount' : 'Introdu suma'}
                />
                <TouchableOpacity
                    onPress = {() => {
                        addFunds(parseFloat(this.state.funds)).then().catch(error => alert(`Can not add your funds: ${error}`)) //se adauga fonduri in baza de date
                        this.setState({funds: ''})
                    }}
                    style = {{marginLeft: '5%'}}
                >
                    <Icon 
                        name = "add-box" 
                        size = {36} 
                        color = '#5A94DA' 
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addfunds: {
        width: '50%',
        height: 40
    },
    button: {
        width: 50
    }
})