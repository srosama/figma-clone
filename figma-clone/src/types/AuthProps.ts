import { User } from 'firebase/auth';
//? Use a context if you will use it many times + deep components need

import firebase from "firebase/compat/app";

export interface FormAuthProps {
    loginOrRegister: boolean;
}

export interface AuthFormGenericProp {
    loginOrRegister: boolean;

}


export interface AuthContextType {
    user: firebase.User | undefined;
};



export interface AuthState {
  user: User | null;
  loading: boolean;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };


export type UserforForm = {
  email: string;
  password: string;
}