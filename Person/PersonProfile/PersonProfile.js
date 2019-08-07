import React from 'react'
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, AppState, ScrollView } from 'react-native'

import NameTextInput from './components/inputs/NameTextInput';
import GenderForm from './components/GenderForm';
import SubmitButton from './components/SubmitButton'
import IncomeDayPicker from './components/inputs/IncomeDayPicker';
import IncomeAmountInput from './components/inputs/IncomeAmountInput'
import {saveProfile, queryProfile, addIncome} from '../../databases/profileSchemas'
import {saveCurrency} from '../../databases/currencySchemas'
import CurrencyPicker from './components/inputs/CurrencyPicker';

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
            appState: AppState.currentState,
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
                currency: profile.currency
            })
        }).catch(error => {
            this.setState({
                id: 1,
                firstName: '',
                lastName: '',
                gender: 'Male',
                incomeDay: '1',
                incomeAmount: 0,
                currency: '€'
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
            saved: true
        }
        saveProfile(newProfile).then().catch(error => alert(`Can not save the profile: ${error}`))
    }

    render() {
        return(
            <ScrollView>
                <KeyboardAvoidingView style = {styles.personView} enabled>
                        <Image style={styles.profileImage} source={this.state.gender === 'Female' ? require('./components/femaleAvatar.png')  : require('./components/maleAvatar.png')} />
                        <NameTextInput
                            value = {this.state.firstName}
                            onChangeText = {firstName => this.setState({firstName}) /* schimbare in state a datelor introduse (prenume) */}
                            placeholder = "First name"
                        />
                        <NameTextInput
                            value = {this.state.lastName}
                            onChangeText = {lastName => this.setState({lastName}) /* schimbare in state a datelor introduse (nume de familie) */}
                            placeholder = "Last name"
                        />
                        <GenderForm 
                            onValueChange = {gender => this.setState({gender}) /* schimbare in state a datelor introduse (gen) */}
                            selectedValue = {this.state.gender} 
                        />
                        <IncomeDayPicker 
                            selectedValue = {this.state.incomeDay}
                            onValueChange = {incomeDay => this.setState({incomeDay}) /* schimbare in state a datelor introduse (ziua de salariu) */ }
                        />
                        <CurrencyPicker 
                            selectedValue = {this.state.currency}
                            onValueChange = {currency => this.setState({currency}) /* schimbare in state a datelor introduse (valuta) */}
                            />
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Text style = {{marginRight: 10, color: '#0489B1', fontSize: 20, fontWeight: 'bold'}}>Income amount:</Text>
                            <IncomeAmountInput
                                value = {String(this.state.incomeAmount)}
                                onChangeText = {incomeAmount => this.setState({incomeAmount}) /* schimbare in state a datelor introduse (suma salariului) */}
                            />
                            <Text style = {{color: '#113961',fontSize: 16, marginLeft: 4}}>{this.state.currency}</Text>
                        </View>
                        <SubmitButton
                            onPress = {() => {
                                this.saveProfile()
                                saveCurrency({id: 1, currency: this.state.currency}).then().catch(error => alert('Can not save your currency'))
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
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 15
    },
})