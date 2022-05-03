import { User } from "firebase/auth"
import { UserData } from "../Dtos/ContextData"

export const loginUser = async (user: User) => {
    fetch("http://localhost:5000/login/user", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            DisplayName: user.displayName,
            ImgURL: user.photoURL,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
}