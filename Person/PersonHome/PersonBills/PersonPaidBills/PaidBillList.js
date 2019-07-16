import React from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView, Button} from 'react-native'

import paidBillRealm, {queryAllPaidBills} from '../../../../databases/paidbillSchema'
import PaidBill from './PaidBill'


export default class BillList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bills: [],
            sortState: 'id',
            ascendingState: false
        }
    }

    reloadData = () => {
        //i se atribuie variabilei din state lista facturilor platite
        queryAllPaidBills().then(bills => {
            this.setState({ bills });
        }).catch(error => {
            this.setState({ bills: [] });
        });
    }

    componentWillMount(){
        this.reloadData()
        paidBillRealm.addListener('change', () => this.reloadData()) // se adauga un listener pentru a actualiza in timp real list facturilor platite
    }

    componentWillUnmount(){
        paidBillRealm.removeAllListeners() //se sterge listener-ul
    }

    render() {

        return(
                    <ScrollView scrollEnabled contentContainerStyle = {{marginBottom: 'auto'}}>
                        {   //se mapeaza liste de facturi platite
                            this.state.bills.map(bill => {
                            return(
                                <PaidBill bill = {bill} key = {bill.id} />
                            )
                        })}
                        {this.state.bills.length >= 5 && 
                            <View>
                                <Text style = {{fontSize: 25}}>line</Text>
                            </View>
                        }
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