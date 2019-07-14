import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, Platform} from 'react-native'

import profileRealm ,{ queryProfile} from '../../../../databases/profileSchemas'


export default class Bill extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing: true,
            currency: '€',
            imageModal: false,
            funds: 0,
        }
    }

    componentWillMount(){
        this.reloadData()
        profileRealm.addListener('change', () => this.reloadData()) //adaugarea listener-ului pentru a vedea daca se schimba valuta
    }

    componentWillUnmount(){
        profileRealm.removeAllListeners() //stergerea listener-ului
    }

    reloadData() {
        queryProfile().then(profile => { //atribuirea componentului valuta din baza de date
            if(this.state.currency !== profile.currency){
                this.setState({currency: profile.currency, funds: profile.funds})
            }
        }).catch(error => alert(`Can not change your currency preference: ${error}`))
    }
    render(){
        const leftDays = (this.props.bill.payDate - new Date())/86400000
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
                        <TouchableOpacity>
                            <Image 
                                source = {require('../images/delete-icon.png')}
                                style = {[styles.button, {tintColor: leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}]} 
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image 
                                source = {require('../images/paid-icon.png')}
                                style = {[styles.button, {tintColor: leftDays<=0 ? '#D34354' : leftDays>=7 ? '#98C2E9' : leftDays>=3 ?  '#6A62C6' : '#D67FA3'}]}
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

