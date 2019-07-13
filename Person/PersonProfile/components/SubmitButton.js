import React, {Component} from 'react'
import {Button, StyleSheet, TouchableOpacity, Text} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class SubmitButton extends Component {
    render() {
        return(
            <TouchableOpacity
                {...this.props}
                style = {styles.submitButton}
            >
                <Text style={styles.submitButtonText}> Save </Text>
                <FontAwesome 
                    color = '#3E7C98'
                    size = {25}
                    name = "save"
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    submitButton : {
        width: 175,
        height: 35,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },
    submitButtonText: {
        alignSelf: 'center',
        fontFamily: 'Courier New',
        fontSize: 30,
        color: '#3E7C98',
        fontWeight: 'bold',
    }
})