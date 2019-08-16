import React, {Component} from 'react'
import {AppState} from 'react-native'

import {addIncome, saveProfile, queryProfile} from './databases/profileSchemas'
import LoadingScreen from './Person/LoadingScreen'
import Person from './Person/Person'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      appState: AppState.currentState,
    }
  }

  componentWillMount(){
    //daca nu este salvata nicio valuta, in baza de date este implicit euro. Se salveaza
    queryProfile().then(profile => {
      if(profile == null){
        saveProfile({id: 1,currency: '€', funds: 0, lastMonthIncomeGiven: new Date().getMonth(), language: 'EN'})
      }
    })
  }

  componentDidMount() {
    // sa treaca o secunda pentru a se afisa aplicatia. La inceput, pentru un minut, se afiseaza loading screen-ul
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 1000)
    addIncome().then().catch(error => {})
  }

  render() {
    return (
      //ce  se afiseaza (LoadingScreen sau Person)
      this.state.isLoading === true ? <LoadingScreen /> : <Person />
    );
  }
}