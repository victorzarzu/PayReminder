import Realm from 'realm'

import {payBill, queryProfile} from './profileSchemas'
import {addPaidBill} from './paidbillSchema'
import {Alert} from 'react-native'

export const BarcodeSchema = {  // crearea schemei pentru imaginea facturii neplatite
    name: 'Barcode',
    properties: {
        value: 'string',
        format: 'string',
    }
}

export const BillSchema = { // crearea schemei pentru factura neplatita
    name: 'Bill',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', indexed: true} ,
        name: {type: 'string', default: 'Bill', indexed: true},
        price: {type: 'double', default: 0},
        payDate: {type: 'date', default: new Date(), indexed: true},
        barcode: 'Barcode'
    }
}

export const databaseOptions = {
    path: 'payReminderAppBills.realm',
    schema: [BillSchema, BarcodeSchema],
    schemaVersion: 0,
};

export const addBill = newBill => new Promise((resolve, reject) => { //crearea functiei de adaugare a unei facturi in tabela pentru facturi neplatite
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                realm.create('Bill', newBill)
                resolve(newBill)
            })
        }).catch(error => reject(error))
})

export const editBill = editbill => new Promise((resolve, reject) => {    //crearea functiei de editare a unei facturi in tabela pentru facturi neplatite
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let editingBill = realm.objectForPrimaryKey('Bill', editbill.id);   
            editingBill.name = editbill.name
            editingBill.price = editbill.price
            editingBill.payDate = editbill.payDate
            editingBill.barcode = editbill.barcode
            resolve();     
        });
    }).catch((error) => reject(error));;
});

export const deleteBill = deletedBill => new Promise((resolve, reject) => { //crearea functiei de stergere a unei facturi din tabela pentru facturi neplatite
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let deletingBill = realm.objectForPrimaryKey('Bill', deletedBill.id)
                realm.delete(deletingBill)
                resolve();
            })
        }).catch(error => reject(error))
})

export const paidBill = paidBill => new Promise((resolve, reject) => { //crearea functiei de platire a unei facturi
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let payingBill = realm.objectForPrimaryKey('Bill', paidBill.id)
                payBill(payingBill.price).then().catch(error => alert(`Can not pay your bill: ${error}`)) // scaderea din fonduri a pretului facturii
                const paidBill1 = {
                    id: payingBill.id,
                    name: payingBill.name,
                    price: payingBill.price,
                    paidDate: new Date()
                }
                addPaidBill(paidBill1).then().catch(error => alert(`Can not pay your bill: ${error}`)) //adaugarea facturii in tabela pentru facturi platite
                realm.delete(payingBill)
                resolve();
            })
        }).catch(error => reject(error))
})

export const paidAllBills = () => new Promise((resolve, reject) => { //functia pentru platirea tututor facturilor din tabela pentru facturi neplatite
    Realm.open(databaseOptions)
        .then(realm => {
            let allBills = realm.objects('Bill')
            let allBillsPrice = 0
            allBills.forEach(bill => {
                allBillsPrice += bill.price
            })
            if(allBillsPrice === 0){
                alert('You do not have any unpaid bills!')
            } else {
                let currency = '€'
                queryProfile().then(profile => {
                    currency = profile.currency
                }).catch(error => {})
                Alert.alert(
                    `Pay all bills`,
                    `Are you sure you want to pay all your bills? It will reduce your funds with ${currency + '\xa0' + allBillsPrice}!`,
                    [
                        {
                            text: 'No',
                            onPress: () => {}
                        },
                        {
                            text: 'Yes',
                            onPress: () => {
                                allBills.forEach(bill => {
                                    paidBill(bill).then().catch(error => {})
                                })
                            }
                        }
                    ],
                    { cancelable: true }
                )
            }
            resolve()
        }).catch(error => reject(error))
})

export const queryAllBills = () => new Promise((resolve,reject) => { //functia pentru interogarea tuturor facturilor existente in tabela pentru facturi
    Realm.open(databaseOptions)
        .then(realm => {
            let allBills = realm.objects('Bill')
            resolve(allBills)
        }).catch(error => reject(error))
})

export const deleteAllBills = () => new Promise((resolve, reject) => { //stergerea tuturor facturilor din tabela facturilor neplatite
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let allBills = realm.objects('Bill')
                if(allBills.length == 0){
                    alert('You do not have any unpaid bills!')
                }else{
                    Alert.alert(
                        `Delete all bills`,
                        `Are you sure you want to delete all your unpaid bills?`,
                        [
                            {
                                text: 'No',
                                onPress: () => {}
                            },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    allBills.forEach(bill => {
                                        deleteBill(bill).then().catch(error => {})
                                    })
                                }
                            }
                        ],
                        { cancelable: true }
                    )
                }
                resolve()
            })
        }).catch(error => reject(error))
})

export default new Realm(databaseOptions)