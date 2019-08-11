import Realm from 'realm'


export const ProfileSchema = { //crearea schemei pentru profil
    name: 'Profile',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 1},
        firstName: {type:'string', default: ''},
        lastName: {type:'string', default: ''},
        gender: {type:'string', default: "Male"},
        incomeDay: {type:'string', default: '1'},
        incomeAmount: {type:'double', default: 0},
        currency: {type: 'string', default: '€'},
        funds: {type: 'double', default: 0},
        incomeGiven: {type: 'bool', default: false},
        language: {type: 'string', default: 'EN'}
    }
}

export const databaseOptions = {
    path: 'payReminderAppProfile.realm',
    schema: [ProfileSchema],
    schemaVersion: 0,
};

export const queryProfile = () => new Promise((resolve,reject) => { //interogarea profilului din baza de date
    Realm.open(databaseOptions)
        .then(realm => {
            let profile = realm.objectForPrimaryKey('Profile', 1)
            resolve(profile)
        }).catch(error => reject(error))
})

export const saveProfile = newProfile => new Promise((resolve,reject) => { //functia de salvare a profilului
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                realm.create('Profile', newProfile, true)
            })
        }).catch(error => reject(error))
})

export const addIncome = () => new Promise((resolve, reject) => { //functia de adaugarea a salariului
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                const nowDate = new Date()
                let updatingProfile = realm.objectForPrimaryKey('Profile', 1)
                if(updatingProfile.incomeGiven === false && nowDate.getDate() == updatingProfile.incomeDay ){
                    updatingProfile.funds += updatingProfile.incomeAmount
                    updatingProfile.incomeGiven = true
                    realm.create('Profile', updatingProfile, true)
                }else if(updatingProfile.incomeGiven === false && nowDate.getDate() > updatingProfile.incomeDay){
                    updatingProfile.funds += updatingProfile.incomeAmount
                    updatingProfile.incomeGiven = true
                    realm.create('Profile', updatingProfile, true)
                }else if(updatingProfile.incomeGiven === true && nowDate.getDate() < updatingProfile.incomeDay){
                    updatingProfile.incomeGiven = false
                    realm.create('Profile', updatingProfile, true)
                }
                resolve()
            })
        }).catch(error => reject(error))
})

export const addFunds = amount => new Promise((resolve, reject) => { //functia pentru adaugare a fondurilor
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if(isNaN(amount) === true){
                    alert('Please enter a valid number')
                }else if(amount <= 0){
                    alert('Please enter a number higher than 0')
                }else{
                    let updatingProfile = realm.objectForPrimaryKey('Profile', 1)
                    updatingProfile.funds += amount
                    resolve(updatingProfile)
                }
            })
        }).catch(error => reject(error))
})

export const payBill = billPrice => new Promise((resolve, reject) => { //functia de scadere a pretului facturii din fonduri
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let updatingProfile = realm.objectForPrimaryKey('Profile', 1)
                updatingProfile.funds -= billPrice
                resolve()
            })
        })
})

export default new Realm(databaseOptions)