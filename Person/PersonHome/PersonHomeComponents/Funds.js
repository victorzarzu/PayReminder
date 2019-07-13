import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'

export default class Funds extends Component{
    render(){
        const funds = this.props.currency === 'Fr' ? this.props.funds + '\xa0' + this.props.currency : this.props.currency === 'Lei' ? this.props.funds + '\xa0' + this.props.currency : this.props.currency + '\xa0' + this.props.funds
        return(
            <Text style = {[styles.funds, {fontSize: this.props.size}]}>{funds}</Text>
        )
    }
}

const styles = StyleSheet.create({
    funds: {
        color: '#72B472',
    }
})