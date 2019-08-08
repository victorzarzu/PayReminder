import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import profileRealm, {queryProfile} from '../../../databases/profileSchemas'

import BillList from './BillList'
import BillHeader from './BillHeader'
import BillLegend from './BillLegend'

export default class PersonBills extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currency: '€',
            language: 'EN'
        }
        this.reloadData = this.reloadData.bind(this)
    }

    reloadData(){
        queryProfile().then(profile => {
            this.setState({currency: profile.currency, language: profile.language})
        }).catch(error => {})
    }

    componentWillMount(){
        this.reloadData()
        profileRealm.addListener('change', this.reloadData)
    }

    componentWillUnmount(){
        profileRealm.removeListener('change', this.reloadData)
    }

    render() {
        return(
            <View style={styles.billsView}>
                <BillHeader 
                    navigateToHome = {() => this.props.navigation.navigate('Home')} /* navigarea din bills in home */ 
                    language = {this.state.language}
                />
                <BillLegend 
                    language = {this.state.language}
                />
                <BillList
                    language = {this.state.language} 
                    currency = {this.state.currency}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    billsView: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: '#DFDFDF'
    }
})