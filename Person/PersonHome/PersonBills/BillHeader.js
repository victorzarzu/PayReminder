import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'

import AddBill from './HeaderComponents/AddBill'
import DeleteAllBills from './HeaderComponents/DeleteAllBills'
import NavigateToHome from './HeaderComponents/NavigateToHome';
import PayAllBills from './HeaderComponents/PayAllBills'
import AddBillIOS from './HeaderComponents/AddBillIOS'


export default class BillHeader extends Component{
    render(){
        return(
            <View style = {styles.billHeaderView}>
                <View style = {{flexDirection: 'row-reverse',alignItems: 'center'}}>
                    {Platform.OS === 'android' ? <AddBill /> : <AddBillIOS /> /* verificarea sistemului de operare si afisarea componentului corespunzator */}
                    <DeleteAllBills />
                    <PayAllBills />
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