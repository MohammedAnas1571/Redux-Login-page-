import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Header = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex  justify-between items-center max-w-6xl mx-auto p-6'>
            <h2 className='font-bold'>Auth Mobile</h2>
            <ul className='flex gap-4'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {currentUser ? (
    <Link to="/Profile">
        <img src={currentUser.profilePhoto} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
    </Link>
) : (
    <li><Link to="/login">Sign In</Link></li>
)}

              
            </ul>
        </div>

    </div>
  )
}

export default Header