import { getAuth, signInWithPopup, User, UserCredential } from "firebase/auth";
import { githubProvider } from "../firebase/client";
import { userStore } from "../store/userStore";

export const IsUserLogged = (): Promise<User> => {
  const auth = getAuth();

  return new Promise(function (resolve, reject) {
    // 2 - Copy-paste your code inside this function
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      } else {
        resolve({} as User)
      }
    });
  })
};

export const StartLoginWithGithub = async (): Promise<UserCredential> => {
  const auth = getAuth();

  const user = await signInWithPopup(auth, githubProvider);
  return user;
};

export const UserLogout = async () => {
  const auth = getAuth();

  auth
    .signOut()
    .catch(function (error) {
      throw new Error("Error during logging out! :( ", error);
    });
};
