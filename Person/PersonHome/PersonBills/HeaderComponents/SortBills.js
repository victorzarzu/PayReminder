import React, {Component} from 'react'
import {View, Text,TouchableOpacity, StyleSheet, Image, Picker, Button} from 'react-native'

import sortRealm, {saveSort, querySort} from '../../../../databases/sortSchemas'

export default class SortBills extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: 1,
            sortState: 'id',
            ascendingState: false,
        }
    }

    saveSortStateData(){
        const newSort = {
            id: this.state.id,
            sortState: this.state.sortState,
        }
        saveSort(newSort).then().catch(error => alert(`Can not save your sort preference: ${error}`))
        console.warn(this.state.sortState)
    }

    componentWillUnmount(){
        newSort = {
            id: 1,
            sortState: 'id',
            ascendingState: false
        }
        saveSort(newSort).then().catch(error => {})
    }

    render(){
        sortOptions = [
            {label: 'Sort by id', value: 'id'},
            {label: 'Sort by name', value: 'name'},
            {label: 'Sort by price', value: 'price'},
            {label: 'Sort by deadline date', value: 'payDate'}
        ]
        return(
            <View>
                <Picker
                    selectedValue = {this.state.sortState}
                    onValueChange = {value => {
                        this.setState({sortState: value})
                    }}
                    style = {{ backgroundColor: '#DDE8F2'}}
                >
                    {sortOptions.map(sortOption => {
                        return(
                            <Picker.Item label = {sortOption.label} value = {sortOption.value} key = {sortOption.value} />
                        )
                    })}
                </Picker>
                <Button 
                    title = 'reload'
                    onPress = {() => {
                        this.saveSortStateData()
                        this.saveSortStateData()
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sortImage: {
        height: 40,
        width: 40,
        tintColor: '#0489B1',
        marginRight: 10
    },
    ascendingImage: {
        height: 25,
        width: 25,
        tintColor: '#0489B1',
        marginRight: 5
    }
})