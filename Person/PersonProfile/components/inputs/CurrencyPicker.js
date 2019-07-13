import React, {Component} from 'react'
import {View, Text, Picker} from 'react-native'

export default class CurrencyPicker extends Component {
    render(){
        return(
            <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                <Text style = {{marginRight: 10, color: '#0489B1', fontSize: 20, fontWeight: 'bold'}}>Currency: </Text>
                <Picker {...this.props} style = {{width: 100}} mode = 'dropdown'>
                    <Picker.Item label = 'EUR' value = '€' key = '€' />
                    <Picker.Item label = 'USD' value = '$' key = '$' />
                    <Picker.Item label = 'RON' value = 'Lei' key = 'Lei' />
                    <Picker.Item label = 'GBP' value = '£' key = '£' />
                    <Picker.Item label = 'CHF' value = 'Fr' key = 'Fr' />
                    <Picker.Item label = 'TRY' value = '₺' key = '₺' />
                </Picker>
            </View>
        )
    }
}