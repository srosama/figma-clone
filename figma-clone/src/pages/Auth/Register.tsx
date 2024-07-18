import FormAuth from "../../components/common/FormAuth";
import NavbarAuth from "../../components/common/ui/NavbarAuth";


export default function Register() {

  return (
    <div className="main-container-auth">
      <NavbarAuth />
      <FormAuth loginOrRegister={false}/>      
    </div>
  )
}
