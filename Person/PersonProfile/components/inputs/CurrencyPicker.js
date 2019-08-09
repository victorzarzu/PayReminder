import React, {Component} from 'react'
import {View, Text, Picker} from 'react-native'

export default class CurrencyPicker extends Component {
    render(){
        return(
            <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
                <Text style = {{marginRight: 10, color: '#0489B1', fontSize: 20, fontWeight: 'bold'}}> {this.props.language == 'EN' ? 'Currency: ' : 'Valuta: '} </Text>
                <Picker {...this.props} style = {{width: '30%'}} mode = 'dropdown'>
                    <Picker.Item label = 'CHF' value = 'Fr' key = 'Fr' />
                    <Picker.Item label = 'EUR' value = '€' key = '€' />
                    <Picker.Item label = 'GBP' value = '£' key = '£' />
                    <Picker.Item label = 'RON' value = 'Lei' key = 'Lei' />
                    <Picker.Item label = 'USD' value = '$' key = '$' />
                </Picker>
            </View>
        )
    }
}