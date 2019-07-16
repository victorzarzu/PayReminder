import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, Platform} from 'react-native'
import ImageView from 'react-native-image-view'

import {deleteBill, paidBill} from '../../../../databases/billSchemas.js'
import currencyRealm, {queryCurrency} from '../../../../databases/currencySchemas'

import EditModal from './EditModal'
import EditModalIOS from './EditModalIOS'

export default class Bill extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing: true,
            currency: '€',
            imageModal: false,
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
        const edit = Platform.OS == 'android' ?  // verificarea sistemului de operare pe care este rulata aplicatia
        <EditModal 
            bill = {this.props.bill} 
            color = {leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}
        /> : 
            <EditModalIOS 
            bill = {this.props.bill} 
            color = {leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}
        />
        const image = [
            {
                source: {
                    uri: this.props.bill.image.uri,
                },
                height: this.props.bill.image.originalRotation == 90 || this.props.bill.image.originalRotation == 270 ? this.props.bill.image.width : this.props.bill.image.height,
                width: this.props.bill.image.originalRotation == 0 || this.props.bill.image.originalRotation == 180 ? this.props.bill.image.width : this.props.bill.image.height,
            },
        ];
        const price = this.state.currency === 'Fr' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency === 'Lei' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency + '\xa0' + this.props.bill.price
        return(
            <View style = {styles.billView}>
                <View style = {{height: 20, backgroundColor: leftDays <= 0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}}></View>
                <View>
                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style = {styles.infoText}>Name:</Text>
                            <Text style = {styles.infoText}>Price:</Text>
                            <Text style = {styles.infoText}>Deadline date:</Text>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style = {styles.infoText}> {this.props.bill.name} </Text>
                            <Text style = {styles.infoText}> {price} </Text>
                            <Text style = {styles.infoText}> {`${this.props.bill.payDate.getDate()}/${this.props.bill.payDate.getMonth() + 1}/${this.props.bill.payDate.getFullYear()}  ${this.props.bill.payDate.getHours()}:${this.props.bill.payDate.getMinutes() <= 9 ? String('0' + this.props.bill.payDate.getMinutes()) : this.props.bill.payDate.getMinutes()}`} </Text>
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <TouchableOpacity
                            onPress = {() => this.setState({imageModal: true})} //deschiderea modului de vizualizare extins al imaginii
                        >
                            <Image 
                                source = {{uri: this.props.bill.image.uri}}
                                style = {{width: 30, height: 30, borderRadius: 25, borderColor: leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3', borderWidth: 1.25}}
                            />
                        </TouchableOpacity>
                        {edit}
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
                                style = {[styles.button, {tintColor: leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}]} 
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
                                style = {[styles.button, {tintColor: leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ImageView //modul de vizualizare extins al imaginii
                    images={image}
                    imageIndex={0}
                    isVisible={this.state.imageModal}
                    isPinchZoomEnabled={false}
                    isTapZoomEnabled= {false}
                    isSwipeCloseEnabled = {false}
                    onClose = {() => this.setState({imageModal: false})}
                />
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
        height: 115,
        marginBottom: 10
    },
    contentBillView: {
        backgroundColor: '#EFEBEB'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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

