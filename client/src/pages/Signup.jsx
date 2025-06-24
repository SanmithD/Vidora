import { Eye, EyeOff, Mail, User2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserStore } from "../store/UserStore";

function Signup() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [hidePass, setHidePass] = useState(false);
  const { isSinging, signup, success } = UserStore();

  const handleSubmit = async() =>{
    await signup(formData);
  }
  if(success){
      navigate('/login')
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center " >
      <div>
        <div className="space-y-8" >
          <label className="flex">
            <div className="flex items-center space-x-4 ">
              <span>
                <User2 className="size-6" />{" "}
              </span>{" "}
              <input
                type="text"
                className="text-[20px] w-full md:w-[350px] lg:w-[350px] pl-3 py-1 border-b-1 outline-0 "
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                value={formData.username}
                placeholder="username"
              />
            </div>
          </label>
          <label className="flex">
            <div className="flex items-center space-x-4 ">
              <span>
                <Mail className="size-6" />{" "}
              </span>{" "}
              <input
                type="text"
                className="text-[20px] pl-3 w-full md:w-[350px] lg:w-[350px] py-1 border-b-1 outline-0 "
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="email"
              />
            </div>
          </label>
          <label className="flex">
            <div className="flex items-center space-x-4 ">
              <span>
                <Eye className="size-6" />{" "}
              </span>{" "}
              <input
                type={ hidePass ? 'text' : 'password' }
                className="text-[20px] pl-3 w-full md:w-[350px] lg:w-[350px] py-1 border-b-1 outline-0 "
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                placeholder="password..."
              />
              <button onClick={()=> setHidePass(!hidePass) } > { hidePass ? <EyeOff /> : <Eye/> } </button>
            </div>
          </label>
          <div>
          <Link to='/login' className="text-blue-500" >Already have an account ? Login</Link> 
          </div>
        <div onClick={handleSubmit}  className="flex justify-center text-2xl font-medium h-fit px-6 py-2.5 bg-blue-500 rounded-xl cursor-pointer hover:bg-blue-800 active:bg-blue-400 duration-200 items-center" >
            <button> { isSinging ? 'Creating...' : 'Signup' }</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
