import React, {Component} from 'react'
import {View, Image, TextInput, DatePickerAndroid, TouchableOpacity, Button, Modal, StyleSheet,Text, TimePickerAndroid} from 'react-native'
import {addBill} from '../../../../databases/billSchemas'
import Ionicon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { RNCamera } from 'react-native-camera';

export default class AddBill extends Component{
    constructor(props) {
        super(props)
        this.camera = null;
        this.state = {
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
            barcodeValue: null,
            barcodeFormat: null,
            scanVisible: false,
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
              }
        }
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    setDateAndroid = async () => { //alegerea datei pentru plata facturii
        try {
          const {
            action, year, month, day,
          } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                payDateYear: year,
                payDateMonth: month,
                payDateDay: day
            });
          }
        } catch ({ code, message }) {
          console.warn('Cannot open date picker', message);
        }
      };

      setTimeAndroid = async () => { //alegerea orei pentru plata facturii
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

      onLayoutChange(event) { //dimensiunile in functie de modul de orientare a ecranului
        const {width, height} = event.nativeEvent.layout;
        this.setState({width,height})
    }

    onBarCodeRead(scanResult) {
        this.setState({barcodeValue: scanResult.data, barcodeFormat: scanResult.type, scanVisible: false})
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
                <Dialog
                    visible={this.state.addVisible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    width = {0.85}
                    rounded
                    onTouchOutside = {() => this.setState({addVisible: false})}
                    dialogStyle = {styles.addDialog}
                    title = {<DialogTitle title = 'Add bill' textStyle = {{color: '#05295B'}} bordered = {false} />}
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
                            onPress = {() => {
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
                                    barcodeValue: null,
                                    barcodeFormat: null,
                                    scanVisible: false
                                })
                            }}
                          />
                          <DialogButton
                            text="Add"
                            key = 'add'
                            style = {{justifyContent: 'center', alignItems: 'center'}}
                            textStyle = {{color: '#0489B1'}}
                            onPress = {() => {
                                const newBill = {
                                    id: Math.floor(Date.now() / 100),
                                    name: this.state.name,
                                    price: parseFloat(this.state.price),
                                    payDate: new Date(this.state.payDateYear,this.state.payDateMonth,this.state.payDateDay,this.state.payDateHour,this.state.payDateMinute,0,0),
                                    barcode: {value: this.state.barcodeValue, format: this.state.barcodeFormat}
                                }   
                                    if(newBill.name == ''){ //verificarea numelui pentru factura
                                        alert('Please choose a name for the bill')
                                    }else if(isNaN(newBill.price) == true){ //verificarea pretului pentru factura (sa fie un numar valid)
                                        alert('Please choose a valid price')
                                    }else if(newBill.price <= 0){ //verificarea pretului pentru factura (sa fie pozitiv)
                                        alert('Do not forget to enter a price higher than 0!')
                                    }else if(this.state.payDateDay == null){ //verificarea datei pentru factura
                                        alert('Please choose a pay date!')
                                    }else if(this.state.payDateHour == null){ //verificarea orei pentru factura
                                        alert('Please choose a pay time!')
                                    }else if(this.state.barcodeValue == null){
                                        alert("Please scan the bill's barcode")
                                    }else {
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
                                            barcodeValue: null,
                                            barcodeFormat: null,
                                            scanVisible: false
                                        })
                                    }
                            }}
                          />
                        </DialogFooter>
                      }
                >
                    <DialogContent>
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
                                        maxLength = {21}
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
                                        onPress = {this.setDateAndroid}
                                    >
                                        <AntDesign
                                            name = 'calendar' 
                                            size = {35}
                                            color = '#0489B1'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style = {styles.timeAndDateButton} 
                                        onPress = {this.setTimeAndroid}
                                    >
                                        <Ionicon
                                            name = 'md-clock'
                                            size = {35}
                                            color = '#0489B1'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style = {styles.timeAndDateButton}
                                        onPress = {() => this.setState({scanVisible: true})}
                                    >
                                        <Ionicon
                                            name = 'md-barcode'
                                            size = {35}
                                            color = '#0489B1'
                                        />
                                    </TouchableOpacity>
                                    <Modal
                                        visible = {this.state.scanVisible}
                                        onRequestClose = {() => this.setState({scanVisible: false})}
                                        animationType = 'slide'
                                    >
                                        <View style={styles.container}>
                                            <RNCamera
                                                ref={ref => {
                                                this.camera = ref;
                                                }}
                                                defaultTouchToFocus
                                                flashMode={this.state.camera.flashMode}
                                                mirrorImage={false}
                                                onBarCodeRead={this.onBarCodeRead.bind(this)}
                                                style={styles.preview}
                                                type={this.state.camera.type}
                                            />
                                            <View style={[styles.overlay, styles.topOverlay]}>
                                                <TouchableOpacity
                                                    onPress = {() => this.setState({scanVisible: false})}
                                                >
                                                    <AntDesign 
                                                        name = 'close'
                                                        size = {25}
                                                        color ='white'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addDialog: {
        backgroundColor: '#D4E6FF',
        borderColor: '#05295B',
        borderWidth: 1.5,
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
    container: {
        flex: 1
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
      },
      topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
})


