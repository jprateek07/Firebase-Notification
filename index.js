const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.data = functions.database
.ref('/root/bus routes/time')
.onUpdate((change,context)=>{
    console.log('notify')

    const payload = {
        notification: {
            title: "Bus Route",
            body: "Bus Route changed"
        }
    };  
    return admin.messaging().sendToTopic("notify",payload)
    .then((response)=> {
       console.log("Successfully sent message:", response);
       return null
        })
    .catch((error)=> {
        console.log("Error sending message:", error);
        return null
        });
})