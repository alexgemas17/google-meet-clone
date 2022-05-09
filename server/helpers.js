const { collection, getDocs, doc, setDoc } = require("firebase/firestore");


module.exports.findUser = async function (db, user) {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userFromDB = null

    querySnapshot.docs.forEach((doc) => {
        const { DisplayName, ImgURL } = doc.data()
        if (user && user.name === DisplayName) {
            userFromDB = {
                uid: doc.id,
                DisplayName,
                ImgURL
            }
        }
    });

    return userFromDB
}

module.exports.hasUserDataChanged = function (userFromDTO, userFromDB) {
    return userFromDTO.DisplayName !== userFromDB.DisplayName
        && userFromDTO.ImgURL !== userFromDB.ImgURL
}

module.exports.findRoom = async function (db, url) {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    let room = null

    querySnapshot.docs.forEach((doc) => {
        const { admin, name, roomSID } = doc.data()
        if (doc.id === url) {
            room = {
                userAdmin: admin,
                nameRoom: name,
                roomSID: roomSID
            }
        }
    });

    return room
}


module.exports.generateUrl = function () {
    const dateStr = Date
        .now()
        .toString(36); // convert num to base 36 and stringify

    const randomStr = Math
        .random()
        .toString(36)
        .substring(2, 8); // start at index 2 to skip decimal poin
    return `${dateStr}-${randomStr}`;
}

module.exports.saveNewRoom = async function (db, userName, roomURL, roomSID, roomName) {
    try {
        const docRef = await setDoc(doc(db, "rooms", roomURL), {
            admin: userName,
            roomSID,
            name: roomName
        });
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }
}
