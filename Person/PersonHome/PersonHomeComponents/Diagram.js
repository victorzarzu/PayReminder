import React, {Component} from 'react'
import {View, Picker, Text} from 'react-native'
import { PieChart } from 'react-native-svg-charts'

import {queryAllPaidBills} from '../../../databases/paidbillSchema'
import {queryAllBills} from '../../../databases/billSchemas'
import DiagramLegend from './DiagramLegend'

export default class Diagram extends Component{
    constructor(){
        super()
        this.state = {
            paidBillsNumber: 0,
            paidBillsPrice: 0,
            expiredBillsNumber: 0,
            expiredBillsPrice: 0,
            mt7BillsNumber: 0,
            mt7BillsPrice: 0,
            mt3BillsNumber: 0,
            mt3BillsPrice: 0,
            lt3BillsNumber: 0,
            lt3BillsPrice: 0,
            option: 'number',
        }
    }

    componentWillMount(){
        this.loadBillsData()
    }

    componentWillUnmount(){
        shouldReturn = false
    }

    loadBillsData(){
        //se adauga in state numarul si pretul facturilor de fiecare fel
        queryAllBills().then(bills => {
            bills.forEach(bill => {
                const leftDays = (bill.payDate.getDate() - new Date().getDate())
                if(leftDays >= 7){
                    this.setState(prevState => ({
                        mt7BillsNumber: prevState.mt7BillsNumber + 1,
                        mt7BillsPrice: prevState.mt7BillsPrice + bill.price
                    }))
                }
                if(leftDays >= 3 && leftDays < 7){
                    this.setState(prevState => ({
                        mt3BillsNumber: prevState.mt3BillsNumber + 1,
                        mt3BillsPrice: prevState.mt3BillsPrice + bill.price
                    }))
                }
                if(leftDays < 3 && leftDays >= 0){
                    this.setState(prevState => ({
                        lt3BillsNumber: prevState.lt3BillsNumber + 1,
                        lt3BillsPrice: prevState.lt3BillsPrice + bill.price
                    }))
                }
                if(leftDays < 0){
                    this.setState(prevState => ({
                        expiredBillsNumber: prevState.expiredBillsNumber + 1,
                        expiredBillsPrice: prevState.expiredBillsPrice + bill.price
                    }))
                }
            })
        }).catch(error => alert('Can not load your bills'))
        queryAllPaidBills().then(paidBills => {
            paidBills.forEach(paidBill => {
                this.setState(prevState => ({
                    paidBillsNumber: prevState.paidBillsNumber + 1,
                    paidBillsPrice: prevState.paidBillsPrice + paidBill.price
                }))
            })
        })
    }

    render(){
        let shouldReturn = (this.state.expiredBillsNumber + this.state.lt3BillsNumber + this.state.mt3BillsNumber + this.state.mt7BillsNumber + this.state.paidBillsNumber) > 0
        const dataNumber = [ this.state.expiredBillsNumber, this.state.lt3BillsNumber, this.state.mt3BillsNumber, this.state.mt7BillsNumber, this.state.paidBillsNumber ]
        const dataPrice = [ this.state.expiredBillsPrice, this.state.lt3BillsPrice, this.state.mt3BillsPrice, this.state.mt7BillsPrice, this.state.paidBillsPrice ]
        
        const pieDataNumber = dataNumber
            .map((value, index) => ({
                value,
                svg: { fill: index == 0 ? '#D34354' : index == 1 ? '#D67FA3' : index == 2 ? '#6A62C6' : index == 3 ? '#98C2E9' : '#28B463' },
                key: `pie-${index}`,
            }))
            const pieDataPrice = dataPrice
            .map((value, index) => ({
                value,
                svg: { fill: index == 0 ? '#D34354' : index == 1 ? '#D67FA3' : index == 2 ? '#6A62C6' : index == 3 ? '#98C2E9' : '#28B463' },
                key: `pie-${index}`,
            }))
        return(
            shouldReturn ?
                <View style = {{flex: 1, justifyContent: 'center', marginTop: '5%'}}>
                    <PieChart
                        style = { { height: 200 } }
                        data = { this.state.option == 'number' ? pieDataNumber : pieDataPrice }
                        innerRadius = { '30%' }
                        outerRadius = { '100%' }
                        labelRadius = { '100%' }
                    >
                    </PieChart>
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <Picker
                            selectedValue = {this.state.option}
                            onValueChange = {option => this.setState({option}) /* se selecteaza modul de analizare a diagramei */}
                            style = {{width: '40%'}}
                        >
                            <Picker.Item label = {this.props.language == 'EN' ? 'Number' : 'Numar'} value = 'number'/>
                            <Picker.Item label = {this.props.language == 'EN' ? 'Price' : 'Pret'} value = 'price'/>
                        </Picker>
                        <DiagramLegend 
                            language = {this.props.language}
                            data = {this.state.option == 'number' ? dataNumber : dataPrice}
                            option = {this.state.option}
                            currency = {this.props.currency}
                        />
                    </View>
            </View>
            :
            <View style = {{alignItems: 'center', flex: 1, marginTop: '30%'}}>
                <Text style = {{color: '#BABABA', fontSize: 24}}> {this.props.language == 'EN' ? 'No information given' : 'Nicio informatie'} </Text>
                <Text style = {{color: '#BABABA', fontSize: 10}}> {this.props.language == 'EN' ? 'You need to have at least one bill to see the pie chart' : 'Trebuie sa existe cel putin o factura pentru a vedea diagrama'} </Text>
            </View> 
        )
    }
}