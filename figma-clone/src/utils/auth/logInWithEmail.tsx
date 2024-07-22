import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { User } from 'firebase/auth';
import { UserforForm } from "../../types/AuthProps";



export const logInWithEmail = async (value: UserforForm): Promise<User | false> => {
  if (!value.email || !value.password) {
    console.error("Email and password must be provided");
    return false;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    return userCredential.user;

  } catch (error: any) {
    // TODO: ERROR component handling
    //!delete this   
    alert("Login failed");
    console.error("Error during login with email:", error.code, error.message);
    return false;
  }
};
