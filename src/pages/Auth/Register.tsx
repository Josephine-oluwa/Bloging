import { useState } from 'react'
import pix from "../../assets/pix.jpg"
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { registerAPI } from '../../Api/Reg'
import vidd from "../../assets/vidd.mp4"


const Register = () => {
    const navigate = useNavigate()
   const [image, setImage] = useState<string>("pix")
   const [Avatar, setAvatar] = useState<string>("")

  const HandleImage = (e: any)=> {
    const localImage = e.target.files[0]
    const saveImage = URL.createObjectURL(localImage)
    setImage(localImage)
    setAvatar(saveImage)
  }

  const model = yup.object({
    name: yup.string().required(),
    email : yup.string().required(),
    password : yup.string().required()
  })

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(model)
})

const onSubmit = handleSubmit(async (data) => {
    const { name, email, password} = data

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("avatar", image)


    registerAPI(formData).then(() => {
        navigate("/create")
    })
})
  return (
    <div className='w-full h-[100vh] bg-slate-100 flex justify-center  items-center'>
         <video src={vidd} autoPlay muted loop className='relative h-[100%] w-full object-cover'/>

       
      
      
<div className='  h-full w-full bg-[rgba(0,0,0,0.65)] flex-col  flex items-center justify-center
  absolute' > 

<span className="text-[30px] m-10 font-bold text-white">
 Sign up to your account
    </span>
        
    <form onSubmit={onSubmit}
     className='w-[500px] h-[min(700px)] bg-white rounded shadow-md flex justify-center flex-col items-center '>
<div className='w-[500px] h-[min(500px)] flex justify-center flex-col items-center '>
<img  className='w-[150px] h-[300px]  object-cover mt-[20px] border-1 border-black' src={Avatar}/> 

{/* className='w-[80px] h-[80px] rounded-[50%] object-cover border-4 border-[#ff6719]'> */}

  <label className="py-1.5 px-4 my-2 bg-[#ff6719] text-white rounded-md hover:scale-[1.02] mt-5 hover:cursor-pointer duration-300 transition-all "
                        htmlFor="image"
                    >upload image</label>
                    <input placeholder='image'
                    className='hidden'
                    id='image'
                    type="file"
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={HandleImage}/>



     <div className='w-[90%] h-[90%]  flex flex-col
      items-center'>
     <div className='flex-col flex items-start m-4'>
            <label className='text-[12px] block '>Your Name</label>
    <input type="text"
    className='w-[350px] border-[1px] p-2 text-[140x] rounded border-black '
    placeholder='Type your Name'
    {...register("name")}
    {
      ...errors.name?.message && <label className="text-[12px] font-semibold w-[300px] flex justify-end text-rose-700 " >Name Error</label>
    }
    />
     </div>
     <div className='flex-col flex items-start m-4'>
            <label className='text-[12px] block '>Your email Address</label>
    <input type="text"
    className='w-[350px] border-[1px] p-2 text-[140x] rounded border-black '
    placeholder='Type your email'
    {...register("email")}
    {
      ...errors.email?.message && <label className="text-[12px] font-semibold w-[300px] flex justify-end text-rose-700 " >Email Error</label>
    }
    />
     </div>
     <div className='flex-col flex items-start m-4'>
            <label className='text-[12px] block '>Your Password</label>
    <input type="text"
    className='w-[350px] border-[1px] p-2 text-[140x] rounded border-black '
    placeholder='Type your Password'
    {...register("password")}
    {
      ...errors.password?.message && <label className="text-[12px] font-semibold w-[300px] flex justify-end text-rose-700 " >Password Error</label>
    }
    />
     </div>
     <button className='py-3 w-[350px] my-4 bg-[#ff6719]  text-white rounded hover:scale-[1.02] hover:cursor-pointer duration-300 transition-all flex justify-center ' type ="submit" onChange={onSubmit}>
    Agree and continue  
           </button >
     </div>
</div>

          
        </form>
      
           

        </div>
        </div>


  )
}

export default Register