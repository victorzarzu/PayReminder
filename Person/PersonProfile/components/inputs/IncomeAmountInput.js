import React, {Component} from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'

export default class IncomeAmountInput extends Component{
    render(){
        return(
                <TextInput
                    {...this.props}
                    maxLength = {15}
                    keyboardType = "numeric"
                    style = {styles.textInput}
                    textAlign = 'center'
                    textAlignVertical = 'center'
                    placeholder = "Income amount"
                />
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 11,
        height: 40,
        width: 150,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#C8C8C8',
        color: 'black',
        marginVertical: 5
    }
})