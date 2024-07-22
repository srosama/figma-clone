import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
  


export const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      if (!credential) {
        throw new Error("No credential found");
      }
      return result.user;
    } catch (error: any) {
      console.error("Error during sign-up with Google:", error.code, error.message);
      return false;
    }
  };
  