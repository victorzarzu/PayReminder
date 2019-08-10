import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import profileRealm, {queryProfile} from '../../../databases/profileSchemas'

import BillList from './BillList'
import BillHeader from './BillHeader'

export default class PersonBills extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currency: '€',
            language: 'EN'
        }
        this.reload = this.reload.bind(this)
    }

    reload(){
        queryProfile().then(profile => {
            this.setState({currency: profile.currency, language: profile.language})
        })
    }

    componentDidMount(){
        this.reload()
        profileRealm.addListener('change', this.reload)
    }

    componentWillUnmount(){
        profileRealm.removeListener('change', this.reload)
    }

    render() {
        return(
            <View style={styles.billsView}>
                <BillHeader 
                    navigateToHome = {() => this.props.navigation.navigate('Home')} /* navigarea din bills in home */ 
                    language = {this.state.language}
                    currency = {this.state.currency}
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