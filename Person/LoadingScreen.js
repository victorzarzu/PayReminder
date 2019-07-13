import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native'

export default class LoadingScreen extends Component{
    render(){
        return(
            <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image 
                    source = {require('./images/logo-image.png')}
                    style = {styles.loadingImage} 
                />
                <ActivityIndicator size="large" color="#0489B1" />
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