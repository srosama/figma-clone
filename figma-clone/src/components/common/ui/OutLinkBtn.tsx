import { Button } from "./button";

type outLinkBtn = { 
    onSubmit: () => void;  
    brandIcon: string;
    title: string;
}
export default function OutLinkBtn({onSubmit, brandIcon, title}:outLinkBtn ) {
    return (<>
        <Button onClick={onSubmit} size={"lg"} className="bg-white text-black rounded-lg
        w-full sm:w-96  pr-16 pt-6 h-14 pb-6 font-medium text-base
        flex gap-5 border border-black hover:text-secondary hover:bg-ring transition-all duration-75">
            <span><img src={brandIcon} alt="google Icon" width={17} /></span>
            <span>{title}</span>
        </Button>
    </>)
}
