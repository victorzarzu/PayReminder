import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DiagramLegend extends Component{
    render(){
        const language = this.props.language == 'EN'
        return(
            <View style = {{marginTop: '3%', justifyContent: 'center', alignContent: 'center'}}>
                <View style = {[styles.legendView, {justifyContent: 'space-around', alignItems: 'center'}]}>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{language ? 'Time expired' : 'Timp expirat'}</Text>
                    </View>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{language ? 'Less then 3 days left' : 'Mai putin de 3 zile ramase'}</Text>
                    </View>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{language ? 'More then 3 days left' : 'Mai mult de 3 zile ramase'}</Text>
                    </View>
                </View>
                <View style = {[styles.legendView, {justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}]}>
                    <View style = {styles.itemView}>
                            <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}></View>
                            <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{language ? 'More then 7 days left' : 'Mai mult de 7 zile ramase'}</Text>
                    </View>
                    <View style = {styles.itemView}>
                            <View style = {[styles.circleView, {backgroundColor: '#28B463'}]}></View>
                            <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{language ? 'Paid bill' : 'Facturi platite'}</Text>
                    </View>
                 </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    legendView: {
        flexDirection: 'row',
        height: 12,
        alignSelf: 'flex-start',
        marginBottom: '5%',
    },
    itemView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    circleView: {
        width: 12,
        height: 12, 
        borderRadius: 50,
    },
    legendTextEng: {
        fontSize: 10,
        marginLeft: '3%'
    },
    legendTextRo: {
        fontSize: 9,
        marginLeft: '2%'
    }
})