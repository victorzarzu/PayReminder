import React, {Component} from 'react'
import {TextInput, StyleSheet} from 'react-native'

export default class NameTextInput extends Component {
    render() {
        return(
            <TextInput
                {...this.props}
                maxLength = {35}
                style = {styles.textInput}
                textAlign = 'center'
                textAlignVertical = 'center'
            />
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 11,
        height: 40,
        width: 200,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#C8C8C8',
        color: 'black',
        marginTop: 20,
    }
})