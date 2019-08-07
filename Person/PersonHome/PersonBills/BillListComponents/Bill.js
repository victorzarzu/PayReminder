import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, Modal} from 'react-native'

import {deleteBill, paidBill} from '../../../../databases/billSchemas.js'
import currencyRealm, {queryCurrency} from '../../../../databases/currencySchemas'
import Barcode from 'react-native-barcode-builder';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import EditDialog from './EditDialog'

export default class Bill extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing: true,
            currency: '€',
            barcodeVisible: false
        }
    }



    reloadData() {
        queryCurrency().then(currency => { //atribuirea componentului valuta din baza de date
            if(this.state.currency !== currency.currency){
                this.setState({currency: currency.currency})
            }
        }).catch(error => alert(`Can not change your currency preference: ${error}`))
    }

    componentWillMount(){
        this.reloadData()
        currencyRealm.addListener('change', () => this.reloadData())
    }

    componentWillUnmount(){
        currencyRealm.removeAllListeners()
    }
    render(){
        const leftDays = (this.props.bill.payDate - new Date())/86400000
        const price = this.state.currency === 'Fr' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency === 'Lei' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency + '\xa0' + this.props.bill.price
        const color = leftDays <= 0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'
        const formatDB = this.props.bill.barcode.format
        const format = formatDB.replace(/[^a-zA-Z0-9]/g, '')
        return(
            <View style = {styles.billView}>
                <View style = {{height: 20, backgroundColor: color}}></View>
                <View>
                    <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 4}}>
                            <Text style = {styles.infoText}>Name:</Text>
                            <Text style = {styles.infoText}>Price:</Text>
                            <Text style = {styles.infoText}>Deadline:</Text>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 4}}>
                            <Text style = {styles.infoText}> {this.props.bill.name} </Text>
                            <Text style = {styles.infoText}> {price} </Text>
                            <Text style = {styles.infoText}> {`${this.props.bill.payDate.getDate()}/${this.props.bill.payDate.getMonth() + 1}/${this.props.bill.payDate.getFullYear()}  ${this.props.bill.payDate.getHours()}:${this.props.bill.payDate.getMinutes() <= 9 ? String('0' + this.props.bill.payDate.getMinutes()) : this.props.bill.payDate.getMinutes()}`} </Text>
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <Modal
                            visible = {this.state.barcodeVisible}
                            onRequestClose = {() => this.setState({barcodeVisible: false})}
                        >
                            <View style = {{flex: 1}}>
                                    <TouchableOpacity
                                        onPress = {() => this.setState({barcodeVisible: false})}
                                        style = {{margin: 10}}
                                    >
                                        <AntDesign 
                                            name = 'close'
                                            size = {25}
                                            color = 'black'
                                        />
                                    </TouchableOpacity>
                                    <View style = {{justifyContent: 'center', alignItems: 'center', flex: 9}}>
                                        <Barcode 
                                            value = {this.props.bill.barcode.value}
                                            format = {format}
                                            width = {format.includes('CODE') ? 1.9 : 2.5}
                                            flat
                                            text = {this.props.bill.barcode.value}
                                        />
                                    </View>
                            </View>
                        </Modal>
                        <TouchableOpacity
                            onPress = {() => this.setState({barcodeVisible: true})}
                        >
                            <FontAwesome 
                                color = {color}
                                size = {33}
                                name = 'barcode'
                            />
                        </TouchableOpacity>
                        <EditDialog 
                            bill = {this.props.bill} 
                            color = {leftDays<=0 ? '#D34354' : color}
                        />
                        <TouchableOpacity
                            onPress = {() => {
                                Alert.alert( //alerta pentru a confirma stergerea
                                    `Delete ${this.props.bill.name} bill`,
                                    `Are you sure you want to delete ${this.props.bill.name} bill?`,
                                    [
                                        {
                                            text: 'No',
                                            onPress: () => {}
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => {deleteBill(this.props.bill).then().catch(error => alert(`The bill wasn't deleted: ${error}`))}
                                        }
                                    ],
                                    { cancelable: true }
                                )
                            }}
                        >
                            <Image 
                                source = {require('../images/delete-icon.png')}
                                style = {[styles.button, {tintColor: color}]} 
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => {
                                    Alert.alert( //alerta pentru a confirma plata
                                        `Pay ${this.props.bill.name} bill`,
                                        `Are you sure you want to pay ${this.props.bill.name} bill? It will reduce your funds with ${this.state.currency + '\xa0' + this.props.bill.price}!`,
                                        [
                                            {
                                                text: 'No',
                                                onPress: () => {}
                                            },
                                            {
                                                text: 'Yes',
                                                onPress: () => {paidBill(this.props.bill).then().catch(error => alert(`The bill wasn't paid: ${error}`))}
                                            }
                                        ],
                                        { cancelable: true }
                                    )
                            }}
                        >
                            <Image 
                                source = {require('../images/paid-icon.png')}
                                style = {[styles.button, {tintColor: color}]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swipeoutStyle1: {
        borderRadius: 25, 
        marginVertical: 5,
    },
    billView: {
        height: 127,
        marginBottom: 10
    },
    contentBillView: {
        backgroundColor: '#EFEBEB'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 3,
    },
    button: {
        height: 33,
        width: 33,
        marginRight: 5
    },
    infoText: {
        color: '#707070',
        fontSize: 15
    }
})

