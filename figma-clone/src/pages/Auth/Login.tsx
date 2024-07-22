import FormAuth from "../../components/FormAuth"
import NavbarAuth from "../../components/common/ui/NavbarAuth"
export default function Login() {
  return (
    <div className="main-container-auth">
      <NavbarAuth/>
      <FormAuth loginOrRegister={true}/>      
    </div>
  )
}
