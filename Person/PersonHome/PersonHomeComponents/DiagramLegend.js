import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DiagramLegend extends Component{
    render(){
        const language = this.props.language == 'EN'
        return(
            <View style = {{marginTop: '4%', justifyContent: 'center', alignContent: 'center', width: '100%', height: '10%', marginBottom: '5%', flexDirection: 'row'}}>
                    <View style = {styles.itemView}>
                        <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}></View>
                        <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}></View>
                        <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}></View>
                        <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}></View>
                        <View style = {[styles.circleView, {backgroundColor: '#28B463'}]}></View>

                    </View>
                    <View style = {[styles.itemView, {marginLeft: 10, alignItems: 'flex-start'}]}>
                        <Text style = {styles.legendText}>{
                            this.props.option == 'number' ?
                                language ? `Bills exceeding deadline: ${this.props.data[0]}` : `Facturi trecute de data scadenta: ${this.props.data[0]}` 
                            :
                                language ? `Bills exceeding deadline: ${this.props.currency === 'Fr' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[0]}`
                                : `Facturi trecute de data scadenta: ${this.props.currency === 'Fr' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[0] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[0]}`
                        }</Text>
                        <Text style = {styles.legendText}>{
                            this.props.option == 'number' ?
                                language ? `Bills with deadline under 3 days: ${this.props.data[1]}` : `Facturi scadente in mai putin de 3 zile: ${this.props.data[1]}` 
                            :
                                language ? 
                                    `Bills with deadline under 3 days: ${this.props.currency === 'Fr' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[1]}`
                                    : `Facturi scadente in mai putin de 3 zile: ${this.props.currency === 'Fr' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[1] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[1]}`
                        }</Text>
                        <Text style = {styles.legendText}>{
                            this.props.option == 'number' ?
                                language ? `Bills with deadline over 3 days: ${this.props.data[2]}` : `Facturi scadente in mai mult de 3 zile: ${this.props.data[2]}` 
                            :
                                language ? 
                                    `Bills with deadline over 3 days: ${this.props.currency === 'Fr' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[2]}`
                                    : `Facturi scadente in mai mult de 3 zile: ${this.props.currency === 'Fr' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[2] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[2]}`
                        }</Text>
                        <Text style = {styles.legendText}>{
                            this.props.option == 'number' ?
                                language ? `Bills with deadline over 7 days: ${this.props.data[3]}` : `Facturi scadente in mai mult de 7 zile: ${this.props.data[3]}` 
                            :
                                language ? 
                                    `Bills with deadline over 7 days: ${this.props.currency === 'Fr' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[3]}`
                                    : `Facturi scadente in mai mult de 7 zile: ${this.props.currency === 'Fr' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.data[3] + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.data[3]}`
                        }</Text>
                        <Text style = {styles.legendText}>{
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
        alignSelf: 'center',
        marginTop: '10%'
    },
    circleView: {
        width: 27,
        height: 15, 
        borderRadius: 50,
        marginBottom: '8%'
    },
    legendText: {
        fontSize: 11,
        marginBottom: '1.7%'
    }
})