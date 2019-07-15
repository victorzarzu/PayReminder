import Realm from 'realm'

import {payBill, queryProfile} from './profileSchemas'
import {Alert} from 'react-native'

export const BillImageSchema = {  // crearea schemei pentru imaginea facturii neplatite
    name: 'BillImage',
    properties: {
        uri: 'string',
        height: 'int',
        width: 'int',
        originalRotation: 'int'
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
        image: 'BillImage'
    }
}

export const databaseOptions = {
    path: 'payReminderAppBills.realm',
    schema: [BillSchema, BillImageSchema],
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