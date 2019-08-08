import React from 'react'
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native'

import NameTextInput from './components/inputs/NameTextInput'
import GenderForm from './components/inputs/GenderForm'
import SubmitButton from './components/SubmitButton'
import IncomeDayPicker from './components/inputs/IncomeDayPicker'
import IncomeAmountInput from './components/inputs/IncomeAmountInput'
import {saveProfile, queryProfile, addIncome} from '../../databases/profileSchemas'
import CurrencyPicker from './components/inputs/CurrencyPicker'
import LanguagePicker from './components/inputs/LanguagePicker'

class PersonProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            firstName: '',
            lastName: '',
            gender: '',
            incomeDay: '1',
            incomeAmount: 0,
            currency: '€',
            language: 'EN',
            languageLoaded: 'EN',
        }
        this.handleGenderForm = this.handleGenderForm.bind(this)
    }

    handleGenderForm(value) {
        this.setState({gender: value})
    }

    reloadData(){
        //salvarea in state a profilului din baza de date
        queryProfile().then(profile => {
            this.setState({
                id: profile.id,
                firstName: profile.firstName,
                lastName: profile.lastName,
                gender: profile.gender,
                incomeDay: profile.incomeDay,
                incomeAmount: profile.incomeAmount,
                currency: profile.currency,
                language: profile.language,
                languageLoaded: profile.language
            })
        }).catch(error => {
            this.setState({
                id: 1,
                firstName: '',
                lastName: '',
                gender: 'Male',
                incomeDay: '1',
                incomeAmount: 0,
                currency: '€',
                language: 'EN'
            })
        })
    }

    componentWillMount(){
        this.reloadData()
    }

    saveProfile(){
        //salvarea in baza de date a profilului
        const newProfile = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            incomeDay: this.state.incomeDay,
            incomeAmount: parseFloat(this.state.incomeAmount),
            currency: this.state.currency,
            lastMonthIncomeGiven: new Date().getMonth(),
            language: this.state.language
        }
        this.setState({languageLoaded: this.state.language})
        if(this.state.incomeAmount < 0){
            {this.state.languageLoaded == "EN" ? alert('Please enter an income amount higher than 0') : alert('Introdu un salariu pozitiv')}
        }else if(isNaN(this.state.incomeAmount)){
            {this.state.languageLoaded == 'EN' ? alert('Please enter a valid number for the income amount') : alert('Introdu o valoare valida pentru salariu')}
        }else{
            saveProfile(newProfile).then().catch(error => alert(`Can not save the profile: ${error}`))
        }
    }

    render() {
        return(
            <ScrollView style = {{backgroundColor: '#DFDFDF', flex: 1}}>
                <KeyboardAvoidingView style = {styles.personView} enabled>
                        <Image style={styles.profileImage} source={this.state.gender === 'Female' ? require('./components/femaleAvatar.png')  : require('./components/maleAvatar.png')} />
                        <NameTextInput
                            value = {this.state.firstName}
                            onChangeText = {firstName => this.setState({firstName}) /* schimbare in state a datelor introduse (prenume) */}
                            placeholder = {this.state.languageLoaded == 'EN' ? "First name" : 'Prenume'}
                        />
                        <NameTextInput
                            value = {this.state.lastName}
                            onChangeText = {lastName => this.setState({lastName}) /* schimbare in state a datelor introduse (nume de familie) */}
                            placeholder = {this.state.languageLoaded == 'EN' ? "Last name" : 'Nume'}
                        />
                        <GenderForm 
                            onValueChange = {gender => this.setState({gender}) /* schimbare in state a datelor introduse (gen) */}
                            selectedValue = {this.state.gender}
                            language = {this.state.languageLoaded} 
                        />
                        <LanguagePicker 
                            onValueChange = {language => this.setState({language})}
                            selectedValue = {this.state.language}
                            language = {this.state.languageLoaded}
                        />
                        <IncomeDayPicker 
                            selectedValue = {this.state.incomeDay}
                            onValueChange = {incomeDay => this.setState({incomeDay}) /* schimbare in state a datelor introduse (ziua de salariu) */ }
                            language = {this.state.languageLoaded}
                        />
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Text style = {{marginRight: 10, color: '#0489B1', fontSize: 20, fontWeight: 'bold'}}>{this.state.languageLoaded == 'EN' ? 'Income amount: ' : 'Salariu: ' }</Text>
                            <IncomeAmountInput
                                value = {String(this.state.incomeAmount)}
                                onChangeText = {incomeAmount => this.setState({incomeAmount}) /* schimbare in state a datelor introduse (suma salariului) */}
                                language = {this.state.languageLoaded}
                            />
                            <Text style = {{color: '#113961',fontSize: 16, marginLeft: 4}}>{this.state.currency}</Text>
                        </View>
                        <CurrencyPicker 
                            selectedValue = {this.state.currency}
                            onValueChange = {currency => this.setState({currency}) /* schimbare in state a datelor introduse (valuta) */}
                            language = {this.state.languageLoaded}
                        />
                        <SubmitButton
                            language = {this.state.languageLoaded}
                            onPress = {() => {
                                this.saveProfile()
                                addIncome().then().catch(error => {})
                            }}
                        />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default PersonProfile

const styles = StyleSheet.create({
    personView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#DFDFDF'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 15
    },
})