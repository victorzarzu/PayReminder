import React from 'react'
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'

import PersonHome from './PersonHome'
import PersonBills from './PersonBills/PersonBills'
import PersonPaidBill from './PersonBills/PersonPaidBills/PersonPaidBill'

export default createAppContainer(
    //crearea unui switch navigator pentru a putea naviga intre pagini
    createSwitchNavigator({
    Home: {
        screen: PersonHome,
    },
    Bills: {
        screen: PersonBills
    },
    PaidBills : {
        screen: PersonPaidBill
    }
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#A8DCFA',
            hight: 5
        }
    },
    initialRouteName: 'Home'
}
))