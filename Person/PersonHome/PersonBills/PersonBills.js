import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'

import BillList from './BillList'
import BillHeader from './BillHeader'
import BillLegend from './BillLegend'

export default class PersonBills extends React.Component {
    render() {
        return(
            <View style={styles.billsView}>
                <BillHeader navigateToHome = {() => this.props.navigation.navigate('Home')} /* navigarea din bills in home */ />
                <BillLegend />
                <BillList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    billsView: {
        justifyContent: 'center',
        alignContent: 'center',
    }
})