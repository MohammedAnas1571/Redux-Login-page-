import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className='flex  justify-between items-center max-w-6xl mx-auto p-6'>
            <h2 className='font-bold'>Auth Mobile</h2>
            <ul className='flex gap-4'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Sign</Link></li>
            </ul>
        </div>

    </div>
  )
}

export default Header