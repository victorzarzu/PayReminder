import React, {Component} from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'

export default class IncomeAmountInput extends Component{
    render(){
        return(
                <TextInput
                    {...this.props}
                    maxLength = {12}
                    keyboardType = "numeric"
                    style = {styles.textInput}
                    textAlign = 'center'
                    textAlignVertical = 'center'
                    placeholder = {this.props.language ? "Salary amount" : 'Salariu'}
                />
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '30%',
        alignContent: 'center',
        justifyContent: 'center',
        color: 'black',
        marginVertical: 3
    }
})