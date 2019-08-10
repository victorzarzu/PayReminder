import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DiagramLegend extends Component{
    render(){
        const language = this.props.language == 'EN'
        return(
            <View style = {{marginTop: '4%', justifyContent: 'center', alignContent: 'center', width: '100%', height: '10%', marginBottom: '5%'}}>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{
                            this.props.option == 'number' ?
                                language ? `Bills exceeding deadline: ${this.props.data[0]}` : `Facturi trecute de data scadenta: ${this.props.data[0]}` 
                            :
                                language ? `Bills exceeding deadline: ${this.props.currency === 'Fr' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[0]}`
                                : `Facturi care au trecut de data scadenta: ${this.props.currency === 'Fr' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[0]}`
                            }</Text>
                    </View>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{
                            this.props.option == 'number' ?
                                language ? `Bills that have less than 3 days left: ${this.props.data[1]}` : `Facturi care au mai putin de 3 zile ramase: ${this.props.data[1]}` 
                            :
                                language ? 
                                    `Bills that have less than 3 days left: ${this.props.currency === 'Fr' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[1]}`
                                    : `Facturi care au mai putin de 3 zile ramase: ${this.props.currency === 'Fr' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[1]}`
                                }</Text>
                    </View>
                    <View style = {styles.itemView}>
                            <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}></View>
                            <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{
                            this.props.option == 'number' ?
                                language ? `Bills that have more than 3 days left: ${this.props.data[2]}` : `Facturi care au mai mult de 3 zile ramase: ${this.props.data[2]}` 
                            :
                                language ? 
                                    `Bills that have more than 3 days left: ${this.props.currency === 'Fr' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[2]}`
                                    : `Facturi care au mai mult de 3 zile ramase: ${this.props.currency === 'Fr' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[2]}`
                                }</Text>
                    </View>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}></View>
                        <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{
                            this.props.option == 'number' ?
                                language ? `Bills that have more than 7 days left: ${this.props.data[3]}` : `Facturi care au mai mult de 7 zile ramase: ${this.props.data[3]}` 
                            :
                                language ? 
                                    `Bills that have more than 7 days left: ${this.props.currency === 'Fr' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[3]}`
                                    : `Facturi care au mai mult de 7 zile ramase: ${this.props.currency === 'Fr' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[3]}`
                                }</Text>
                    </View>
                    <View style = {styles.itemView}>
                            <View style = {[styles.circleView, {backgroundColor: '#28B463'}]}></View>
                            <Text style = {language == 'EN' ? styles.legendTextEng : styles.legendTextRo}>{
                            this.props.option == 'number' ?
                                language ? `Paid bills: ${this.props.data[4]}` : `Facturi platite: ${this.props.data[4]}` 
                            :
                                language ? 
                                    `Paid bills: ${this.props.currency === 'Fr' ? this.props.data[4] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[4] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[4]}`
                                    : `Facturi platite: ${this.props.currency === 'Fr' ? this.props.data[4] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[4] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[4]}`
                                }</Text>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: '10%',
        alignSelf: 'center'
    },
    circleView: {
        width: 30,
        height: '75%', 
        borderRadius: 50,
    },
    legendTextEng: {
        fontSize: 11,
        marginLeft: '3%'
    },
    legendTextRo: {
        fontSize: 11,
        marginLeft: '2%'
    }
})