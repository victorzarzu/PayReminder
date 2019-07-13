import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DiagramLegend extends Component{
    render(){
        return(
            <View style = {styles.legendView}>
                <View style = {styles.itemView}>
                    <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}>
                    </View>
                    <Text style = {styles.legendText}>Time expired</Text>
                </View>
                <View style = {styles.itemView}>
                    <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}>
                    </View>
                    <Text style = {styles.legendText}>Less then 3 days left</Text>
                </View>
                <View style = {styles.itemView}>
                    <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}>
                    </View>
                    <Text style = {styles.legendText}>More then 3 days left</Text>
                </View>
                <View style = {styles.itemView}>
                    <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}>
                    </View>
                    <Text style = {styles.legendText}>More then 7 days left</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    legendView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 15,
        alignSelf: 'flex-end'
    },
    itemView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    circleView: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    legendText: {
        fontSize: 8
    }
})