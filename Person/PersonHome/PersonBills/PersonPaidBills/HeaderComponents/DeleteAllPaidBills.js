import React, {Component} from 'react'
import {TouchableOpacity,Image, StyleSheet, Alert} from 'react-native'
import {deleteAllPaidBills} from '../../../../../databases/paidbillSchema'

export default class DeleteAllPaidBills extends Component{
    render(){
        return(
                <TouchableOpacity
                    onPress = {() => {
                        deleteAllPaidBills().then().catch(error => alert(`Deleting all paid bills failed: ${error}`))}} // se sterg toate facturile platite
                    style = {{paddingRight: 10}}
                >
                    <Image source = {require('../../images/delete-all-icon.png')} style = {styles.deleteImage } />
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deleteImage: {
        height: 40,
        width: 40,
        tintColor: '#0489B1'
    }
})