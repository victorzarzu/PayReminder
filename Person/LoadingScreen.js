import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default class LoadingScreen extends Component{
    render(){
        return(
            <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image 
                    source = {require('./images/logo-image.png')}
                    style = {styles.loadingImage} 
                />
                <ActivityIndicator size="large" color="#0489B1" />
                <View style = {{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Text style = {{color: '#76ADD2', fontSize: 12, marginRight: 5}}>Do not forget to pay the bills before the deadline</Text>
                    <Fontisto name = 'wink' color = '#76ADD2' size = {14}  />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingImage: {
        borderRadius: 15,
        height: 200,
        width: 200
    }
})