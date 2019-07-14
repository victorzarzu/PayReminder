import React, {Component} from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'

export default class PayAllBills extends Component{
    render(){
        return(
            <TouchableOpacity
                style = {{paddingRight: 10}}    
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