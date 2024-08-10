//
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { appAuth } from "./firebaseConfig";

//----------------------------------------------------
export async function registirationFun() {
  console.log("registirationFun");
}
//----------------------------------------------------
export async function loginFunction(args) {
  try {
    const { user } = await signInWithEmailAndPassword(
      appAuth,
      args?.userEmail,
      args?.userPassword
    );
    if (user) {
      return user;
    }
  } catch (error) {
    throw new Error("You Have An Error");
  }
}
//----------------------------------------------------
export async function logoutFunction() {
  // await signOut(appAuth);
  localStorage.removeItem("userToken");
}

// const { setuserData } = useContext(AppContextSlice);
//   onAuthStateChanged(appAuth, async (currentuser) => {
//     setuserData(currentuser?.email);
//   });
