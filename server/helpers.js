const { collection, getDocs } = require("firebase/firestore");

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

module.exports.findRoom = async function (db, roomID) {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    let roomInfo = null

    querySnapshot.docs.forEach((doc) => {
        console.log(doc.id);
        console.log({roomID});
        if (doc.id === roomID) {
            const { admin, roomSID } = doc.data()
            roomInfo = {
                uid: doc.id,
                admin,
                roomSID
            }
        }
    });

    return roomInfo
}