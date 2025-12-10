import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png'
import useAuth from '../../hooks/useAuth';
import { MdOutlineDashboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
const Navbar = () => {
    const {user,signOutUser}=useAuth()
    const links=
    <>
    <li><Link to={'/'}  className="text-xl text-gray-600 hover:text-primary">Home</Link></li>
    <li><Link className='text-xl text-gray-600 hover:text-primary'>Donation Requests</Link></li>
    <li><Link className='text-xl text-gray-600 hover:text-primary'>Search Donors</Link></li>
    <li><Link className='text-xl text-gray-600 hover:text-primary'>Funding</Link></li>
    
    </>
    const logOut=()=>{
        signOutUser()
    }
    return (
     <div className="navbar bg-base-100 shadow-sm p-5">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn mr-5 sm:mr-0 btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}

       {
        user?  <>
<Link to={'/dashboard'} className=" text-xl mb-5  flex text-gray-600   normal-case leading-none">
 DashBoard
</Link>
<button onClick={logOut} className="btn  btn-primary font-bold text-white px-6 py-3 normal-case leading-none">
  Log Out
</button> 
</> :<>
<Link to={'/login'} className=" text-xl hover:text-primary mb-5 text-gray-600   normal-case leading-none">
  Login
</Link>
     <Link to={'/register'} className="btn btn-primary font-bold text-white px-6 py-3 normal-case leading-none">
  Register as Donor
</Link>


</>
       }

      </ul>
    </div>
    <Link to={'/'} className='flex justify-center items-center'>
        <img src={logo} alt="" className='h-[40px] w-[40px]'/>
         <a className="btn btn-ghost font-normal text-2xl">LifeBlood</a>
    </Link>
   
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
{
user? <>
<Link to={'/dashboard'} className=" hidden  mr-5 sm:flex text-gray-600   normal-case leading-none">
 <MdOutlineDashboard></MdOutlineDashboard> DashBoard
</Link>
<button onClick={logOut} className="btn hidden sm:block btn-primary font-bold text-white px-6 py-3 normal-case leading-none">
  Log Out
</button> 
</> :
<>

<Link to={'/login'} className=" hidden sm:block mr-5 text-gray-600   normal-case leading-none">
  Login
</Link>
<Link to={'/register'} className="btn hidden sm:block btn-primary font-bold text-white px-6 py-3 normal-case leading-none">
  Register as Donor
</Link>
</>

}
  </div>
</div>
    );
};

export default Navbar;