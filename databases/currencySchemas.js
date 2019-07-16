import Realm from 'realm'

export const CurrencySchema = { // crearea schemei pentru valuta pentru facturi
    name: 'Currency',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', indexed: true} ,
        currency: {type: 'string', default: '€'}
    }
}

export const databaseOptions = {
    path: 'payReminderAppCurrency.realm',
    schema: [CurrencySchema],
    schemaVersion: 0,
};

export const queryCurrency = () => new Promise((resolve,reject) => { //interogarea profilului din baza de date
    Realm.open(databaseOptions)
        .then(realm => {
            let currency = realm.objectForPrimaryKey('Currency', 1)
            resolve(currency)
        }).catch(error => reject(error))
})

export const saveCurrency = newCurrency => new Promise((resolve,reject) => { //functia de salvare a profilului
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                realm.create('Currency', newCurrency, true)
            })
        }).catch(error => reject(error))
})

export default new Realm(databaseOptions)