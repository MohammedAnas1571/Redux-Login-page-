import { useSelector } from "react-redux"


export const Profile = () => {
  const currentUser = useSelector(state=>state.user)

  return (
    <div className="p-12 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>
      <form className="flex flex-col gap-5">
        <img src ={currentUser.currentUser.profilePhoto} alt="Profile Picture" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 " />
        <input  defaultValue={currentUser.currentUser.username} 
        type='text' id='userName' placeholder="username" className="bg-slate-200 rounded-lg p-3 "/> 
        <input  defaultValue={currentUser.currentUser.email} type='email' id='email' placeholder="email" className="bg-slate-200  rounded-lg p-3"/>
        <input   type='password' id='password' placeholder="password" className="bg-slate-200 rounded-lg p-3"/>
        <button type ='submit' className="bg-slate-700 text-white uppercase rounded-lg hover:opacity-90"></button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">SignOut</span>
      </div>
    </div>
  )
}
