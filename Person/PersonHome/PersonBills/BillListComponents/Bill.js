import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, Modal} from 'react-native'

import {deleteBill, paidBill} from '../../../../databases/billSchemas.js'
import profileRealm, {queryProfile} from '../../../../databases/profileSchemas' 
import Barcode from 'react-native-barcode-builder';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import QRCode from 'react-native-qrcode';
var PushNotification = require('react-native-push-notification');

import EditDialog from './EditDialog'

export default class Bill extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing: true,
            barcodeVisible: false,
        }
    }
    
    render(){
        const leftDays = Math.floor((this.props.bill.payDate - new Date())/86400000);
        const price = this.props.currency === 'Fr' ? this.props.bill.price + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.bill.price + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.bill.price
        const color = leftDays < 0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'
        const formatDB = this.props.bill.barcode.format
        const format = formatDB.replace(/[^a-zA-Z0-9]/g, '')
        return(
            <View style = {styles.billView}>
                <View style = {{height: 20, backgroundColor: color}}></View>
                <View>
                    <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 4}}>
                            <Text style = {styles.infoText}>{this.props.language == 'EN' ? 'Name:' : 'Nume:'}</Text>
                            <Text style = {styles.infoText}>{this.props.language == 'EN' ? 'Price:' : 'Pret:'}</Text>
                            <Text style = {styles.infoText}>{this.props.language == 'EN' ? 'Deadline:' : 'Data scadenta:'}</Text>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 4}}>
                            <Text style = {styles.infoText}> {this.props.bill.name} </Text>
                            <Text style = {styles.infoText}> {price} </Text>
                            <Text style = {styles.infoText}> {`${this.props.bill.payDate.getDate() > 9 ? this.props.bill.payDate.getDate() : '0' + this.props.bill.payDate.getDate()}/${this.props.bill.payDate.getMonth() + 1 > 9 ? this.props.bill.payDate.getMonth() + 1 : '0' + (this.props.bill.payDate.getMonth() + 1)}/${this.props.bill.payDate.getFullYear()}  `} </Text>
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                    {this.props.bill.barcode.value == '' ? null :
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
                                    <View style = {{justifyContent: 'center', alignItems: 'center', flex: 8}}>
                                        {format.includes('QR') ?
                                             <QRCode 
                                                value = {this.props.bill.barcode.value}
                                                size = {200}
                                             />
                                             :
                                            <Barcode 
                                                value = {this.props.bill.barcode.value}
                                                format = {format}
                                                width = {format.includes('CODE') ? 1.9 : 3.1}
                                                flat
                                                text = {this.props.bill.barcode.value}
                                            />
                                        }
                                    </View>
                            </View>
                        </Modal>
                        }
                        {this.props.bill.barcode.value == '' ? null :
                            <TouchableOpacity
                                onPress = {() => this.setState({barcodeVisible: true})}
                            >
                                <FontAwesome 
                                    color = {color}
                                    size = {format.includes('QR') ? 35 : 33}
                                    name = {format.includes('QR') ? 'qrcode' : 'barcode'}
                                />
                            </TouchableOpacity>
                        }
                        <EditDialog 
                            bill = {this.props.bill} 
                            color = {leftDays < 0 ? '#D34354' : color}
                            language = {this.props.language}
                            currency = {this.props.currency}
                        />
                        <TouchableOpacity
                            onPress = {() => {
                                Alert.alert( //alerta pentru a confirma plata
                                    this.props.language == 'EN' ? `Delete ${this.props.bill.name} bill` : `Sterge factura ${this.props.bill.name}`,
                                    this.props.language == 'EN' ? `Are you sure you want to delete ${this.props.bill.name} bill?` : `Esti sigur ca vrei sa stergi factura ${this.props.bill.name}?`,
                                    [
                                        {
                                            text: this.props.language == 'EN' ? 'No' : 'Nu',
                                            onPress: () => {}
                                        },
                                        {
                                            text: this.props.language == 'EN' ? 'Yes' : 'Da',
                                            onPress: () => {
                                                deleteBill(this.props.bill).then().catch(error => alert(this.props.language == 'EN' ? `The bill wasn't deleted` : `Factura nu a fost stearsa`))
                                                PushNotification.cancelLocalNotifications({id: String(this.props.bill.id)});
                                            }
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
                                    this.props.language == 'EN' ? `Pay ${this.props.bill.name} bill` : `Plateste factura ${this.props.bill.name}`,
                                    this.props.language == 'EN' ? `Are you sure you want to pay ${this.props.bill.name} bill? It will reduce your funds with ${this.props.currency + '\xa0' + this.props.bill.price}!` : `Esti sigur ca vrei sa platesti factura ${this.props.bill.name}? Fondurile o sa se reduca cu ${this.props.currency + '\xa0' + this.props.bill.price}!`  ,
                                    [
                                        {
                                            text: this.props.language == 'EN' ? 'No' : 'Nu',
                                            onPress: () => {}
                                        },
                                        {
                                            text: this.props.language == 'EN' ? 'Yes' : 'Da',
                                            onPress: () => {
                                                paidBill(this.props.bill).then().catch(error => alert(this.props.language == 'EN' ? `The bill wasn't paid: ${error}` : `Factura nu a putut fi platita: ${error}`))
                                                PushNotification.cancelLocalNotifications({id: String(this.props.bill.id)});
                                            }
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
    billView: {
        height: 127,
        marginBottom: '2%',
        width: '100%'
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

