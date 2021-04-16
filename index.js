const admin = require('firebase-admin')

const credentials = require('./credentials.json')
admin.initializeApp({
  credential: admin.credential.cert(credentials)
})
const db = admin.firestore()
// now we can CRUD

db.collection('products').get()
  .then(snapshot => {
    let products = []
    snapshot.forEach(doc => {
      let thisData = doc.data()
      let thisProd = {
        id: doc.id,
        name: thisData.name || thisData.Name,
        category: thisData.category || thisData.Category,
        vendor: thisData.vendor || thisData.Vendor,
      }
      products.push(thisProd)
    })
    console.log(products)
  })
  .catch(err => console.log('Error getting products :', err))