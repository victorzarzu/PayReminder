import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {queryProfile} from '../databases/profileSchemas'

export default class LoadingScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            language: 'EN'
        }
    }

    componentWillMount(){
        queryProfile().then(profile => {
            this.setState({language: profile.language})
        }).catch(error => {})
    }
    render(){
        return(
            <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image 
                    source = {require('./images/logo-image.png')}
                    style = {styles.loadingImage} 
                />
                <ActivityIndicator size = 'small' color="#0489B1" />
                <View style = {{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginTop: '7%'}}>
                    <Text style = {{color: '#76ADD2', fontSize: 10, marginRight: 5}}>{this.state.language == 'EN' ? 'Do not forget to pay the bills before the deadline' : 'Nu uita sa iti platest facturile inainte de data scadenta'}</Text>
                    <Fontisto name = 'wink' color = '#76ADD2' size = {12}  />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    loadingImage: {
        borderRadius: 15,
        height: 200,
        width: 200
    }
})