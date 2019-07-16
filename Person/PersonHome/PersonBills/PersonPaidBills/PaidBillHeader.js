import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import NavigateToHome from './HeaderComponents/NavigateToHome';
import DeleteAllPaidBills from './HeaderComponents/DeleteAllPaidBills'

export default class BillHeader extends Component{
    render(){
        return(
            <View style = {styles.billHeaderView}>
                <View style = {{flexDirection: 'row-reverse',alignItems: 'center'}}>
                    <DeleteAllPaidBills />
                </View>
                <NavigateToHome onPress = {this.props.navigateToHome} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    billHeaderView: {
        flexDirection: 'row-reverse',
        backgroundColor: '#DDE8F2',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})