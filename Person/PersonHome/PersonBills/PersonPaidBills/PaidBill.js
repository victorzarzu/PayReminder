import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native'

import {deletePaidBill} from '../../../../databases/paidbillSchema'
import profileRealm ,{ queryProfile} from '../../../../databases/profileSchemas'

export default class Bill extends Component{
    constructor(props){
        super(props)
        this.state = {
            currency: '€',
            language: ''
        }
        this.reloadData = this.reloadData.bind(this)
    }

    componentWillMount(){
        this.reloadData()
        profileRealm.addListener('change', this.reloadData) // se adauag un listener pentru a actualiza in timp real valuta
    }

    reloadData() {
        //se incarca valuta din baza de date in state
        queryProfile().then(profile => {
            this.setState({currency: profile.currency, language: profile.language})
        }).catch(error => alert(`Can not change your currency preference: ${error}`))
    }

    componentWillUnmount(){
        profileRealm.removeListener('change', this.reloadData)
    }
    render(){
        const price = this.state.currency === 'Fr' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency === 'Lei' ? this.props.bill.price + '\xa0' + this.state.currency : this.state.currency + '\xa0' + this.props.bill.price
        return(
            <View style = {styles.billView}>
                <View style = {{height: 20, backgroundColor: '#28B463'}}></View>
                <View>
                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text>{this.state.language == 'EN' ? 'Name:' : 'Nume:'}</Text>
                            <Text>{this.state.language == 'EN' ? 'Price:' : 'Pret'}</Text>
                            <Text>{this.state.language == 'EN' ? 'Pay date:' : 'Data platii:'}</Text>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text> {this.props.bill.name} </Text>
                            <Text> {price} </Text>
                                <Text> {`${this.props.bill.paidDate.getDate() > '9' ? this.props.bill.paidDate.getDate() : '0' + this.props.bill.paidDate.getDate() }/${this.props.bill.paidDate.getMonth() + 1 > 9 ? this.props.bill.paidDate.getMonth() + 1 : '0' + (this.props.bill.paidDate.getMonth() + 1)}/${this.props.bill.paidDate.getFullYear()}  ${this.props.bill.paidDate.getHours()}:${this.props.bill.paidDate.getMinutes() <= 9 ? String('0' + this.props.bill.paidDate.getMinutes()) : this.props.bill.paidDate.getMinutes()}`} </Text>
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <TouchableOpacity
                            onPress = {() => {
                                Alert.alert(
                                    `Delete ${this.props.bill.name} bill`,
                                    `Are you sure you want to delete ${this.props.bill.name} bill?`,
                                    [
                                        {
                                            text: 'No',
                                            onPress: () => {}
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => {deletePaidBill(this.props.bill).then().catch(error => alert(`The bill wasn't deleted: ${error}`)) /* se sterge factura platita */}
                                        }
                                    ],
                                    { cancelable: true }
                                )
                            }}
                            style = {{marginRight: '3%'}}
                        >
                            <Image 
                                source = {require('../images/delete-icon.png')}
                                style = {[styles.button, {tintColor: '#28B463'}]} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    billView1: {
        borderRadius: 25,
        marginTop: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipeoutStyle1: {
        borderRadius: 25, 
        marginVertical: 5,
    },
    billView: {
        height: 110,
        marginTop: 10
    },
    contentBillView: {
        backgroundColor: '#28B463'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        height: 33,
        width: 33,
        marginRight: 5
    }
})

