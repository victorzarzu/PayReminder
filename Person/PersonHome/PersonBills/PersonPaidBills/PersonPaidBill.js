import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'

export default class PersonBills extends React.Component {
    render() {
        return(
            <View style={styles.billsView}>
                <Text>Paid bills</Text>
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