import React from 'react'
import {View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'

import Funds from '../PersonHome/PersonHomeComponents/Funds'
import AddFunds from '../PersonHome/PersonHomeComponents/AddFunds'
import Diagram from './PersonHomeComponents/Diagram';
import profileRealm, {queryProfile} from '../../databases/profileSchemas'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

export default class PersonHome extends React.Component {
    static navigationOptions = {
        headerTitle: "Home"
    }
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            currency: '€',
            funds: 0,
            size: 54,
            language: 'EN'
        }
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    onLayoutChange(event) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({width,height})
    }

    loadData(){
        queryProfile().then(profile => {
            this.setState({
                currency: profile.currency,
                funds: profile.funds,
                size: 46 - String(profile.funds).length,
                language: profile.language,
                isViewed: true
            })
        }).catch(error => {
            alert(`Could not load your funds data: ${error}`)
        })
    }

    componentDidMount(){
        this.loadData()
        this.setState({isViewed: true})
        profileRealm.addListener('change', () => this.loadData())
    }

    componentWillUnmount(){
        this.setState({isViewed: false})
        profileRealm.removeAllListeners()
    }

    render() {
        return(
            <ScrollView onLayout={this.onLayoutChange} style = {{backgroundColor: '#DFDFDF'}}>
                <KeyboardAvoidingView style = {styles.homeView}>
                    <View style = {{flexDirection: 'row', width: this.state.width, justifyContent: 'space-around', height: '50%', marginBottom: 10}}>
                            <View style = {[styles.navigationPart, {backgroundColor: '#5F81B7'}]}>
                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Bills') /* navigarea din Home in pagina de facturi neplatite */} style = {{alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source = {require('./PersonHomeComponents/images/bills-icon.png')} style = {styles.image} />
                                    <Text style = {styles.navigationText}>{this.state.language == 'EN' ? 'Unpaid bills' : 'Facturi neplatite'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {[styles.navigationPart, {backgroundColor: '#5F93D5'}]}>
                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('PaidBills') /* navigarea din Home in pagina de facturi platite */} style = {{alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source = {require('./PersonHomeComponents/images/paid-bills-icon.png')} style = {styles.image} />
                                    <Text style = {styles.navigationText}>{this.state.language == 'EN' ? 'Paid bills' : 'Facturi platite'}</Text>
                                </TouchableOpacity>                               
                            </View>
                    </View>
                    <Funds 
                        currency = {this.state.currency}
                        funds = {this.state.funds}
                        size = {this.state.size}
                    />
                    <AddFunds
                        language = {this.state.language}
                    />
                </KeyboardAvoidingView>
                <Diagram
                    currency = {this.state.currency} 
                    language = {this.state.language}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    homeView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DFDFDF',
    },
    navigationPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 60,
        width: 60,
        tintColor: '#CFCFCF'
    },
    navigationText: {
        fontWeight: 'bold',
        color: '#CFCFCF',
        fontSize: 18
    }
})