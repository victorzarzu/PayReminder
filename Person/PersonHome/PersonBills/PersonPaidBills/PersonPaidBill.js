import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'

import PaidBillHeader from './PaidBillHeader'
import PaidBillList from './PaidBillList'

export default class PersonBills extends React.Component {
    render() {
        return(
            <View style={styles.billsView}>
                <PaidBillHeader navigateToHome = {() => this.props.navigation.navigate('Home')} /* se navigheaza din pagina facturilor platite inapoi la pagina Home */ />
                <PaidBillList />
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