import React, {Component} from 'react'
import {View, StyleSheet } from 'react-native'

import AddBill from './HeaderComponents/AddBill'
import DeleteAllBills from './HeaderComponents/DeleteAllBills'
import NavigateToHome from './HeaderComponents/NavigateToHome';
import PayAllBills from './HeaderComponents/PayAllBills'
import BillLegend from './HeaderComponents/BillLegend'


export default class BillHeader extends Component{
    render(){
        return(
            <View style = {styles.billHeaderView}>
                <View style = {{flexDirection: 'row-reverse', alignItems: 'center', flex: 3}}>
                    <AddBill 
                        language = {this.props.language}
                    /> 
                    <DeleteAllBills />
                    <PayAllBills />
                </View>
                    <View style = {{flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse'}}>
                        <BillLegend 
                                language = {this.props.language}
                            />
                        <NavigateToHome onPress = {this.props.navigateToHome} />
                    </View>
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