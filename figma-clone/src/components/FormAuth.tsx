import { FormAuthProps } from "../types/AuthProps";
import GoogleBtn from "./GoogleBtn";
import { AuthFormGeneric } from "./common/ui/AuthFormGeneric";
import Or from "./common/ui/Or";
export default function FormAuth({ loginOrRegister }: FormAuthProps) {

    return (
        // TODO: fix the responsiveness + css structure + center the page iteams 
        <section className="flex flex-col items-center justify-center h-full space-y-8">
            {
               loginOrRegister ? 
               (<h1 className="text-3xl font-medium ">Log in or create an <br /> account to collaborate</h1>):
               (<h1 className="text-2xl font-medium">Sign up for Figma</h1>)
            }

            <GoogleBtn />
            <Or />     
            <AuthFormGeneric loginOrRegister={loginOrRegister}/>      
    
        </section>
    );
}
