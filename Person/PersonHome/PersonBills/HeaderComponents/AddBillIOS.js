import React, {Component} from 'react'
import {View, Image, TextInput, TouchableOpacity, Platform, Modal, StyleSheet,Text, DatePickerIOS} from 'react-native'
import {addBill} from '../../../../databases/billSchemas'
import ImagePicker from 'react-native-image-picker'
import Ionicon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class AddBillIOS extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            payDate: new Date(),
            currency: '€',
            width: '',
            height: '',
            photo: {uri: '', width: 0, height: 0}
        }
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    setDate(newDate) { //alegerea datei si orei pentru plata facturii
        this.setState({payDate: newDate});
      }

      onLayoutChange(event) { //dimensiunile in functie de modul de orientare a ecranului
        const {width, height} = event.nativeEvent.layout;
        this.setState({width,height})
    }

    handleChoosePhoto() { //alegrea pozei pentru codul de bare
        const options = {
          noData: true
        }
        ImagePicker.showImagePicker(options,response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            this.setState({photo: response})
            console.log('response',response)
          }
        });
      }
    render() {
        return(
            <View onLayout={this.onLayoutChange} style = {{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress = {() => this.setState({addVisible: true}) /* deschiderea modului de adaugare a facturii */}
                    style = {{marginRight: 10}}
                >
                    <Image 
                        source = {require('../images/add-icon.png')}
                        style = {styles.addButtonImage} 
                    />
                </TouchableOpacity>
                <Modal
                    visible = {this.state.addVisible} 
                    animationType = "slide" 
                    style = {[styles.modalView]}
                    onRequestClose = {() => this.setState({
                        name: '',
                        price: '',
                        payDate: new Date(),
                        currency: '€',
                        width: '',
                        height: '',
                        photo: {uri: '', width: 0, height: 0}
                    })}
                    transparent = {true}
                >
                    <View style = {[styles.modalView]}>
                        <View  style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 22, color:'#05295B', top: '3%'}}>Add bill</Text>
                        </View>
                        <View style = {styles.addFormView}>
                            <View style = {{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                                <Text style = {{fontSize: 16, color:'#05295B', right: '40%'}}>Bill's name:</Text>
                                <TextInput
                                    value = {this.state.name} 
                                    placeholder = "Type a name..."
                                    onChangeText = {name => this.setState({name})}
                                    maxLength = {18}
                                />
                            </View>
                            <View style = {{alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                <Text style = {{fontSize: 16, color:'#05295B', right: '40%'}}>Bill's price:</Text>
                                <TextInput
                                    keyboardType = "numeric"
                                    placeholder = "Type a price..."
                                    value = {this.state.price}
                                    onChangeText = {price => this.setState({price})}
                                    maxLength = {15}
                                />
                            </View>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                <TouchableOpacity
                                    style = {styles.timeAndDateButton}  
                                    onPress = {this.setDate()}
                                >
                                    <AntDesign
                                        name = 'calendar' 
                                        size = {35}
                                        color = '#0489B1'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style = {styles.timeAndDateButton} 
                                    onPress = {() => this.handleChoosePhoto()}
                                >
                                    <Ionicon
                                        name = 'ios-barcode'
                                        size = {35}
                                        color = '#0489B1'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row',top: '8%'}}>
                        <TouchableOpacity onPress = {() => {
                                    const newBill = {
                                        id: Math.floor(Date.now() / 100),
                                        name: this.state.name,
                                        price: parseFloat(this.state.price),
                                        payDate: new Date(this.state.payDateYear,this.state.payDateMonth,this.state.payDateDay,this.state.payDateHour,this.state.payDateMinute,0,0),
                                        image: {uri: this.state.photo.uri, height: this.state.photo.height, width: this.state.photo.width, originalRotation: this.state.photo.originalRotation}
                                    }   
                                        if(newBill.name == ''){ //verificarea numelui pentru factura
                                            alert('Please choose a name for the bill')
                                        }else if(isNaN(newBill.price) == true){ //verificarea pretului pentru factura( sa fie un numar valid)
                                            alert('Please choose a valid price')
                                        }else if(newBill.price <= 0){ //verificarea pretului pentru factura (sa fie pozitiv)
                                            alert('Do not forget to enter a price higher than 0!')
                                        }else if(this.state.payDateDay == null){ //verificarea datei si orei pentru factura
                                            alert('Please choose a pay date!')
                                        }else if(newBill.image.uri == ''){ //verificarea imaginii cu codul de bare pentru factura
                                            alert("Please enter a photo for the bill's bar code ")
                                        }
                                        else {
                                            //adaugarea facturii in baza de date
                                            addBill(newBill).then().catch(error => {})
                                            this.setState({
                                                name: '',
                                                price: '',
                                                payDateYear: ``,
                                                payDateMonth: ``,
                                                payDateDay: ``,
                                                payDateHour: null,
                                                payDateMinute: null,
                                                addVisible: false,
                                                currency: '€',
                                                width: '',
                                                height: '',
                                                photo: {uri: '', width: 0, height: 0}
                                            })
                                        }
                                }}>
                                    <Text style = {styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style = {styles.cancelButton} onPress = {() => {
                                    this.setState({
                                        name: '',
                                        price: '',
                                        payDate: new Date(),
                                        currency: '€',
                                        width: '',
                                        height: '',
                                        photo: {uri: '', width: 0, height: 0}
                                    })
                                }}>
                                    <Text style = {styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        height: 220,
        width: 300,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: '#D4E6FF',
        borderColor: '#05295B',
        borderWidth: 1.5,
        top: '25%',
        bottom: '25%',
    },
    addFormView: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    cancelButton: {
        justifyContent: 'center',
        marginTop: 3,
    },  
    addButtonImage: {
        height: 40,
        width: 40,
        tintColor: '#0489B1'
    },
    timeAndDateImage: {
        width: 35,
        height: 35,
        tintColor: '#0489B1'
    },
    timeAndDateButton: {
        marginHorizontal: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#0489B1'
    }
})


