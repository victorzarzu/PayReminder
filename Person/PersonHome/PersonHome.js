import React from 'react'
import {View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'

export default class PersonHome extends React.Component {
    static navigationOptions = {
        headerTitle: "Home"
    }
    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0,
            currency: '€',
            funds: 0,
            size: 54
        }
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    onLayoutChange(event) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({width,height})
    }


    render() {
        return(
            <ScrollView onLayout={this.onLayoutChange}>
                <KeyboardAvoidingView style = {styles.homeView}>
                    <View style = {{flexDirection: 'row', width: 320, justifyContent: 'space-around', height: 100, marginVertical: 10}}>
                            <View style = {[styles.navigationPart, {backgroundColor: '#5F81B7'}]}>
                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Bills') /* navigarea din Home in pagina de facturi neplatite */} style = {{alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source = {require('./PersonHomeComponents/images/bills-icon.png')} style = {styles.image} />
                                    <Text style = {styles.navigationText}>Unpaid bills</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {[styles.navigationPart, {backgroundColor: '#5F93D5'}]}>
                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('PaidBills') /* navigarea din Home in pagina de facturi platite */} style = {{alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source = {require('./PersonHomeComponents/images/paid-bills-icon.png')} style = {styles.image} />
                                    <Text style = {styles.navigationText}>Paid bills</Text>
                                </TouchableOpacity>                               
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    homeView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 75,
        width: 75,
        tintColor: '#CFCFCF'
    },
    navigationText: {
        fontWeight: 'bold',
        color: '#CFCFCF',
        fontSize: 18
    }
})