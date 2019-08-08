import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'

import billRealm, {queryAllBills, querySortedBills} from '../../../databases/billSchemas.js'
import Bill from './BillListComponents/Bill'


export default class BillList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bills: [],
        }
        this.reloadData = this.reloadData.bind(this)
    }

    reloadData = () => {
        //se atribuie variabilei bills din state-ul componentului toate facturile neplatite
        queryAllBills().then(bills => {
            this.setState({ bills });
        }).catch(error => {
            this.setState({ bills: [] });
        });
    }

    componentWillMount(){
        this.reloadData()
        billRealm.addListener('change', this.reloadData) // se adauga un listener pentru a actualiza in timp real list facturilor neplatite
    }

    componentWillUnmount(){
        billRealm.removeListener('change', this.reloadData) //eliminarea listenerului
    }

    render() {
        return(
                    <ScrollView scrollEnabled contentContainerStyle = {{marginBottom: 'auto', marginTop: 4}}>
                        { //maparea variabilei bills din state sub forma de facturi
                            this.state.bills.map(bill => {
                            return(
                                <Bill 
                                    bill = {bill} 
                                    key = {bill.id} 
                                    language = {this.props.language} 
                                    currency = {this.props.currency}   
                                />
                            )
                        })}
                    </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    billsView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})