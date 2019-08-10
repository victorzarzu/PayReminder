import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class BillLegend extends Component{
    constructor(props){
        super(props)
        this.state = {
            legendVisible: false
        }
    }
    render(){
        return(
            <View style = {{justifyContent: 'center', alignItems: 'center',marginRight: '5%'}}>
                <TouchableOpacity
                    onPress = {() => this.setState({legendVisible: true}) /* deschiderea modului de adaugare a facturii */}
                >
                    <MaterialIcons
                        name = "color-lens"
                        size = {40}
                        color = '#0489B1'
                    />

                </TouchableOpacity>
                <Dialog
                    visible={this.state.legendVisible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    width = {0.85}
                    rounded
                    dialogStyle = {{backgroundColor: '#D4E6FF',borderColor: '#05295B',borderWidth: 1.5}}
                    onTouchOutside = {() => this.setState({legendVisible: false})}
                    dialogTitle = {<DialogTitle 
                        title = {this.props.language == 'EN' ? 'Legend' : 'Legenda'} 
                        textStyle = {{color: '#05295B'}}
                        bordered = {false} 
                        style = {{backgroundColor: '#D4E6FF'}}
                         />}
                >
                    <DialogContent
                        bordered = {false}
                        style = {{justifyContent: 'center', alignItems: 'center'}}
                    >
                        <View style = {{justifyContent: 'space-around', flexDirection: 'row'}}>
                            <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                                <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}>
                                </View>
                                <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}>
                                </View>
                                <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}>
                                </View>
                                <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}>
                                </View>
                            </View>
                            <View style = {{ alignItems: 'flex-start', justifyContent: 'space-around', marginLeft: '10%'}}>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Bills exceeding deadline' : 'Facturi trecute de data scadenta'}</Text>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Bills with deadline under 3 days' : 'Facturi scadente in mai putin de 3 zile'}</Text>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Bills with deadline over 3 days' : 'Facturi scadente in mai mult de 3 zile'}</Text>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Bills with deadline over 7 days' : 'Facturi scadente in mai mult de 7 zile'}</Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    legendView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 15,
        backgroundColor: '#DDE8F2'
    },
    itemView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    circleView: {
        width: 30,
        height: 15, 
        borderRadius: 50,
        marginBottom: '9%'
    },
    legendText: {
        fontSize: 11,
        marginBottom: '3%'
    }
})

/* 
                        <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                            <View style = {[styles.itemView, {flex: 2}]}>
                                <View style = {[styles.circleView, {backgroundColor: '#D34354'}]}>
                                </View>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Time expired' : 'Timp expirat'}</Text>
                            </View>
                            <View style = {[styles.itemView, {flex: 2}]}>
                                <View style = {[styles.circleView, {backgroundColor: '#D67FA3'}]}>
                                </View>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'Less then 3 days left' : 'Mai putin de 3 zile ramase'}</Text>
                            </View>
                            <View style = {[styles.itemView, {flex: 2}]}>
                                <View style = {[styles.circleView, {backgroundColor: '#6A62C6'}]}>
                                </View>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'More then 3 days left' : 'Mai mult de 3 zile ramase'}</Text>
                            </View>
                            <View style = {[styles.itemView, {flex: 2}]}>
                                <View style = {[styles.circleView, {backgroundColor: '#98C2E9'}]}>
                                </View>
                                <Text style = {styles.legendText}>{this.props.language == 'EN' ? 'More then 7 days left' : 'Mai mult de 7 zile ramase'}</Text>
                            </View>
                        </View>
*/