import { signInWithEmailAndPassword, User } from "firebase/auth";
import { appAuth } from "./firebaseConfig";

// Define the type for the login function arguments
export interface LoginArgs {
  userEmail: string | any;
  userPassword: string | any;
}

//----------------------------------------------------
export async function registirationFun(): Promise<void> {
  console.log("registirationFun");
}

//----------------------------------------------------
export async function loginFunction(args: LoginArgs): Promise<User | null> {
  try {
    const { user } = await signInWithEmailAndPassword(
      appAuth,
      args?.userEmail,
      args?.userPassword
    );
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    throw new Error("You Have An Error");
  }
}

//----------------------------------------------------
export async function logoutFunction(): Promise<void> {
  // await signOut(appAuth);
  localStorage.removeItem("userToken");
}

// Example usage of onAuthStateChanged in a React component
// const { setuserData } = useContext(AppContextSlice);
// onAuthStateChanged(appAuth, async (currentuser) => {
//   setuserData(currentuser?.email || null);
// });
