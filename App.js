import React, {Component} from 'react'
import {AppState} from 'react-native'


import {addIncome, saveProfile, queryProfile} from './databases/profileSchemas'
import LoadingScreen from './Person/LoadingScreen'
import Person from './Person/Person'

import BackgroundTask from 'react-native-background-task'
 
BackgroundTask.define(() => {
  // un background task pentru a adauga salariul
  addIncome().then().catch(error => {})
})

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      appState: AppState.currentState
    }
  }

  componentWillMount(){
    //daca nu este salvata nicio valuta, in baza de date este implicit euro. Se salveaza
    queryProfile().then(profile => {
      if(profile == null){
        saveProfile({currency: '€', lastMonthIncomeGiven: new Date().getMonth()}).then().catch(error => alert(`Can not load your currency: ${error}`))
      }
    })
  }

  componentDidMount() {
    // sa treaca o secunda pentru a se afisa aplicatia. La inceput, pentru un minut, se afiseaza loading screen-ul
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 1000)
    addIncome().then().catch(error => {})
    BackgroundTask.schedule({
      period: 900
    })
  }

  render() {
    return (
      //ce  se afiseaza (LoadingScreen sau Person)
      this.state.isLoading === true ? <LoadingScreen /> : <Person />
    );
  }
}
