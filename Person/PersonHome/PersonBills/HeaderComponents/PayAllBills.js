import React, {Component} from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
var PushNotification = require('react-native-push-notification');

import {paidAllBills} from '../../../../databases/billSchemas'

export default class PayAllBills extends Component{
    render(){
        return(
            <TouchableOpacity
                style = {{marginRight: '5%'}}    
                onPress = {() => {
                    paidAllBills().then().catch(error => alert(`Can not pay all your bills: ${error}`))
                    PushNotification.cancelAllLocalNotifications()
                }} //platirea tuturor facturilor
            >
                <Image 
                    source = {require('../images/pay-all-icon.png')}
                    style = {styles.payImage }
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    payImage: {
        height: 40,
        width: 40,
        tintColor: '#0489B1'
    }
})