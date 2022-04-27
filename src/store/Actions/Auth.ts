import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { githubProvider } from '../../firebase/client'

export const StartLoginWithGithub = () => {

    const auth = getAuth();

    signInWithPopup(auth, githubProvider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            // The signed-in user info.
            const user = result.user;
            // ...
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
}