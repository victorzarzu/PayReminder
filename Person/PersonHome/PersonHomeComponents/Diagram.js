import React, {Component} from 'react'
import {View, StyleSheet, Text, Picker} from 'react-native'
import {PieChart} from 'react-native-chart-kit'

import {queryAllPaidBills} from '../../../databases/paidbillSchema'
import {queryAllBills, paidBill} from '../../../databases/billSchemas'
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
                const leftDays = (bill.payDate - new Date())/86400000
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
                if(leftDays < 3 && leftDays > 0){
                    this.setState(prevState => ({
                        lt3BillsNumber: prevState.lt3BillsNumber + 1,
                        lt3BillsPrice: prevState.lt3BillsPrice + bill.price
                    }))
                }
                if(leftDays <= 0){
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
        const shouldReturn = this.state.expiredBillsNumber + this.state.lt3BillsNumber + this.state.mt7BillsNumber + this.state.mt3BillsNumber + this.state.paidBillsNumber >= 2 //se verifica daca este necesar ca diagrama sa fie vizibila
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2
          }
          const data = [
            { name: 'bills', number: this.state.expiredBillsNumber,price: this.state.expiredBillsPrice, color: '#D34354', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.expiredBillsNumber).length},
            { name: 'bills', number: this.state.lt3BillsNumber,price: this.state.lt3BillsPrice, color: '#D67FA3', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.lt3BillsNumber).length },
            { name: 'bills', number: this.state.mt3BillsNumber,price: this.state.mt3BillsPrice, color: '#6A62C6', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.mt3BillsNumber).length },
            { name: 'bills', number: this.state.mt7BillsNumber,price: this.state.mt7BillsPrice, color: '#98C2E9', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.mt7BillsNumber).length },
            { name: 'bills', number: this.state.paidBillsNumber,price: this.state.paidBillsPrice, color: '#0AA50A', legendFontColor: '#7F7F7F', legendFontSize: 27- String(this.state.paidBillsNumber).length }
          ]
          const data1 = [
            { name: `${this.props.currency}`, number: this.state.expiredBillsNumber,price: this.state.expiredBillsPrice, color: '#D34354', legendFontColor: '#7F7F7F', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.expiredBillsPrice).length },
            { name: `${this.props.currency}`, number: this.state.lt3BillsNumber,price: this.state.lt3BillsPrice, color: '#D67FA3', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.lt3BillsPrice).length },
            { name: `${this.props.currency}`, number: this.state.mt3BillsNumber,price: this.state.mt3BillsPrice, color: '#6A62C6', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.mt3BillsPrice).length },
            { name: `${this.props.currency}`, number: this.state.mt7BillsNumber,price: this.state.mt7BillsPrice, color: '#98C2E9', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.mt7BillsPrice).length },
            { name: `${this.props.currency}`, number: this.state.paidBillsNumber,price: this.state.paidBillsPrice, color: '#0AA50A', legendFontColor: '#7F7F7F', legendFontSize: 27 - String(this.state.paidBillsPrice).length }
          ]
        return(
             shouldReturn ?
             <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end'}}>
                <PieChart
                    data = {this.state.option === 'number' ? data : data1 /* se selecteaza modul diagramei in functie de modul selectat */}
                    width={this.props.width}
                    height={220}
                    chartConfig={chartConfig}
                    accessor= {this.state.option}
                    backgroundColor="transparent"
                    absolute
                />
                <Picker
                    selectedValue = {this.state.option}
                    onValueChange = {option => this.setState({option}) /* se selecteaza modul de analizare a diagramei */}
                    style = {{width: 150}}
                >
                    <Picker.Item label = 'Number' value = 'number'/>
                    <Picker.Item label = 'Price' value = 'price'/>
                </Picker>
                <DiagramLegend />
            </View>
                 : 
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{color: '#BABABA', fontSize: 20}}> No information given </Text>
                <Text style = {{color: '#BABABA', fontSize: 17}}> You need to have more than 2 submitted bills </Text>
            </View> 
        )
    }
}