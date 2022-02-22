import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { googleAuthProvider, auth } from "../firebase/firebase";
// import { history } from "../routers/AppRouter";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export const login = (uid) => ({
  type: "LOGIN",
  uid
});

export const startLogin = () => {
  return (dispatch) => {
    // const auth = getAuth(firebaseApp);
    // auth.signInWithPopup(googleAuthProvider);
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // navigate("/dashboard");
        // return new Promise();
        // debugger;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...
        dispatch(result);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    // history.go("/");
    return signOut(auth);
  };
};
