import React, {Component} from 'react'
import {View,Text,Modal, Button, TouchableOpacity, TextInput,DatePickerAndroid, StyleSheet, KeyboardAvoidingView, Image, TimePickerAndroid} from 'react-native'
import realm, {editBill} from '../../../../databases/billSchemas.js'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Foundation'


export default class EditDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            isVisible: false,
            id: this.props.bill.id,
            name: this.props.bill.name,
            price: this.props.bill.price,
            payDateYear: this.props.bill.payDate.getFullYear(),
            payDateMonth: this.props.bill.payDate.getMonth(),
            payDateDay: this.props.bill.payDate.getDate(),
            payDateHour: this.props.bill.payDate.getHours(),
            payDateMinute: this.props.bill.payDate.getMinutes(),
            barcodeVisible: false
        }
    }

    setDateAndroid = async () => { //alegerea datei pentru utilizatorii Android
        try {
          const {
            action, year, month, day,
          } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({ payDateYear: year, payDateMonth: month, payDateDay: day  });
          }
        } catch ({ code, message }) {
          console.warn('Cannot open date picker', message);
        }
    };

    setTimeAndroid = async () => { //alegerea timpului pentru utilizatorii Android
        try {
          const { action, hour, minute } = await TimePickerAndroid.open({
            hour: 18,
            minute: 0,
            is24Hour: true
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            this.setState({ 
                payDateHour: hour,
                payDateMinute: minute
             });
          }
        } catch ({ code, message }) {
          console.warn('Cannot open time picker', message);
        }
      };

    render(){
        return(
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress = {() => this.setState({isVisible: true}) /* deschiderea modului de editare al facturii */}>
                    <Icon
                        name = 'page-edit'
                        size = {35}
                        color = {this.props.color}
                    />
                </TouchableOpacity>
                <Dialog
                    visible={this.state.isVisible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    width = {0.85}
                    rounded
                    onTouchOutside = {() => this.setState({isVisible: false})}
                    dialogStyle = {styles.editDialog}
                    title = {<DialogTitle title = {`Edit ${this.props.bill.name} bill`} textStyle = {{color: '#05295B'}} bordered = {false} />}
                    footer={
                        <DialogFooter
                            bordered = {false}
                            style = {{height: 25}}
                        >
                          <DialogButton
                            text="Cancel"
                            key = 'cancel'
                            textStyle = {{color: '#0489B1'}}
                            style = {{justifyContent: 'center', alignItems: 'center'}}
                            onPress = {() => this.setState({isVisible: false, barcodeVisible: false}) /* se inchide modul de editare */}
                          />
                          <DialogButton
                            text="Save"
                            key = 'save'
                            style = {{justifyContent: 'center', alignItems: 'center'}}
                            textStyle = {{color: '#0489B1'}}
                            onPress = {() => {
                                if(this.state.name == '' ){ // se verifica numele
                                    alert('Please enter valid name')
                                }else if(isNaN(this.state.price) == true){ // se verifica pretul (sa fie un numar)
                                    alert('Do not forget to enter a valid price')
                                }else if(this.state.price <= 0){ // se verifica pretul(sa fie pozitiv)
                                    alert('Do not forget to enter a price higher than 0')
                                }else if(this.state.payDateDay == ''){ // se verifica ziua de plata
                                    alert('Please modify the bill with a pay day')
                                }else if(this.state.payDateHour != 0 && this.state.payDateHour == ''){  // se verifica ora de plata
                                    alert('Please modify the bill with a pay time')
                                }else {
                                    //se editeaza in baza de date si se inchide modul de editare
                                    this.setState({isVisible: false, barcodeVisible: false})
                                    const editbill = {
                                        id: this.state.id,
                                        name: this.state.name,
                                        price: parseFloat(this.state.price),
                                        payDate: new Date(this.state.payDateYear, this.state.payDateMonth, this.state.payDateDay, this.state.payDateHour, this.state.payDateMinute, 0, 0),
                                    
                                    }
                                    editBill(editbill).then().catch(error => alert(`Could not edit the bill: ${error}`))
                                }
                            }}
                          />
                        </DialogFooter>
                      }
                >
                    <DialogContent>
                        <KeyboardAvoidingView style = {styles.editModal}>
                            <Text style = {styles.titleText}> Edit bill </Text>
                            <View style = {[styles.editRowView]}>
                                <Text style = {{fontSize: 16, color:'#05295B'}}> Bill's name: </Text>
                                <TextInput
                                    placeholder = "Type a name..."
                                    textAlign = 'center'
                                    textAlignVertical = 'center'
                                    maxLength = {18} 
                                    value = {this.state.name}
                                    onChangeText = {name => this.setState({name})}
                                />
                            </View>
                            <View style = {[styles.editRowView]}>
                                <Text style = {{fontSize: 16, color:'#05295B'}}>Bill's price:</Text>
                                <TextInput
                                    placeholder = "Type a price..."
                                    textAlign = 'center'
                                    textAlignVertical = 'center' 
                                    maxLength = {15}
                                    keyboardType = 'numeric'
                                    value = {String(this.state.price)}
                                    onChangeText = {price => this.setState({price})}
                                />
                            </View>
                            <View style = {[styles.editRowView, {marginVertical: 5}]}>
                                <Text style = {{fontSize: 16, color:'#05295B'}}>Pay date: {`${this.state.payDateDay}/${this.state.payDateMonth}/${this.state.payDateYear}`}</Text>
                                <TouchableOpacity onPress = {this.setDateAndroid}>
                                    <Text style = {{color: '#0489B1', fontSize: 16}}>Change pay date</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {[styles.editRowView, {marginVertical: 5}]}>
                                <Text style = {{fontSize: 16, color:'#05295B'}}>Pay time: {`${this.state.payDateHour}:${this.state.payDateMinute <= 9 ? String('0' + this.state.payDateMinute) : this.state.payDateMinute}`}</Text>
                                <TouchableOpacity onPress = {this.setTimeAndroid}>
                                    <Text style = {{color: '#0489B1', fontSize: 16}}>Change pay time</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style = {{fontSize: 16, color:'#05295B'}}>Bill's image:</Text>
                                <TouchableOpacity
                                    onPress = {() => {
                                        this.setState({barcodeVisible: false})
                                    }}
                                >
                                    <Text style = {{color: '#0489B1', fontSize: 16}}>Modify</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    editDialog: {
        borderRadius: 15,
        backgroundColor: '#D4E6FF',
        borderColor: '#05295B',
    },
    editRowView: {
        flexDirection: 'row' ,
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    button: {
        color: 'white',
        fontSize: 15
    },
    titleText: {
        fontSize: 30,
        marginBottom: 15,
        alignSelf: 'center',
        color: '#05295B'
    },
    buttonText: {
        fontSize: 20,
        color: '#0489B1'
    }
})