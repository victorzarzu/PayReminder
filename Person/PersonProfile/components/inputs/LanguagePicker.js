import React, {Component} from 'react'
import {StyleSheet, Picker, View, Text} from 'react-native'

export default class GenderForm extends Component {
    render() {
        var gender_props = [
            {label: 'English', value: "EN" },
            {label: 'Romana', value: "RO" }
          ];
        return(
           <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
                <Text style = {{marginRight: 10, color: '#0489B1', fontSize: 20, fontWeight: 'bold'}}>{this.props.language == 'EN' ? 'Language: ' : 'Limba: '} </Text>
                <Picker
                    {...this.props}
                    style = {styles.languageForm}
                    //un picker pentru a selecta genul utilizatorului
                >
                    {gender_props.map(option => {
                        return(
                            <Picker.Item 
                                label = {option.label}
                                value = {option.value}
                                key = {option.value}
                            />
                        )
                    })}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    languageForm: {
        marginTop: 3,
        width: 140
    }
})