import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase-config";
import { User } from 'firebase/auth';
import { UserforForm } from "../types/AuthProps";

export const signUpWithEmail = async (value: UserforForm): Promise<User | false> => {

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );

    await sendEmailVerification(userCredential.user);

    return userCredential.user;

  } catch (error: any) {
    alert("Registration Failed");
    console.error("Error during sign-up with email:", error.code, error.message);
    return false;
  }
};
