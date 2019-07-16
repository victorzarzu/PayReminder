import Realm from 'realm'
import {Alert} from 'react-native'

export const PaidBillSchema = { // crearea schemei pentru factura neplatita
    name: 'PaidBill',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', indexed: true} ,
        name: {type: 'string', default: 'PaidBill', indexed: true},
        price: {type: 'double', default: 0},
        paidDate: {type: 'date'}
    }
}

export const databaseOptions = {
    path: 'payReminderAppPaidBills.realm',
    schema: [PaidBillSchema],
    schemaVersion: 0,
};

export const addPaidBill = newPaidBill => new Promise((resolve, reject) => { //adaugarea unei facturi platite in tabela facturilor platite
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                realm.create('PaidBill', newPaidBill)
                resolve(newPaidBill)
            })
        }).catch(error => reject(error))
})

export const deletePaidBill = deletedPaidBill => new Promise((resolve, reject) => { //stergerea unei facturi din tabela pentru facturi platite
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let deletingPaidBill = realm.objectForPrimaryKey('PaidBill', deletedPaidBill.id)
                realm.delete(deletingPaidBill)
                resolve();
            })
        }).catch(error => reject(error))
})

export const deleteAllPaidBills = () => new Promise((resolve, reject) => { //stergera tuturor facturilor platite din baza de date
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let allPaidBills = realm.objects('PaidBill')
                if(allPaidBills.length == 0){
                    alert('You do not have any paid bills')
                }else {
                    Alert.alert(
                        'Delete all bills',
                        'Are you sure you want to delete all your paid bills? This will modify your chart',
                        [
                            {
                                text: 'No',
                                onPress: () => {}
                            },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    realm.delete(allPaidBills)
                                    resolve()
                                }
                            }
                        ],
                        { cancelable: true }
                    )
                }
            })
        }).catch(error => reject(error))
})

export const queryAllPaidBills = () => new Promise((resolve,reject) => { //interogarea tuturor facturilor din tabela facturilor platite
    Realm.open(databaseOptions)
        .then(realm => {
            let allPaidBills = realm.objects('PaidBill')
            resolve(allPaidBills)
        }).catch(error => reject(error))
})

export default new Realm(databaseOptions)