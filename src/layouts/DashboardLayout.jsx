import React from 'react';
import { Link, Outlet } from 'react-router';
import logo from '../assets/Untitled-design-2-removebg-preview(1).png'
import { MdOutlineBloodtype, MdOutlineDashboard } from 'react-icons/md';
import { CgUser } from 'react-icons/cg';
import { IoHomeOutline } from 'react-icons/io5';
import { BiDonateBlood, BiDonateHeart } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { RiRefund2Fill } from 'react-icons/ri';
const DashboardLayout = () => {
    return (
     <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-primary text-white">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4 text-xl font-bold">User Dashboard</div>
    </nav>
    {/* Page content here */}
   <Outlet></Outlet>
  </div>

 <div className="group flex flex-col bg-base-200 min-h-screen transition-all duration-300 w-16 hover:w-64">

    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex text-primary font-bold min-h-full flex-col items-start text-xl  is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
            <Link className=' max-w-15' to={'/'}><img src={logo} alt="" /></Link>
        </li>

        
           <li>
          <Link to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Main">
            {/* Main icon */}
           <MdOutlineDashboard className='text-2xl'></MdOutlineDashboard>
            <span className="ml-2 hidden group-hover:inline">Main</span>
          </Link>
        </li>

                 <li>
          <Link to={'/dashboard/profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
            {/* Progile icon */}
           <CgUser className='text-2xl'></CgUser>
            <span className="ml-2 hidden group-hover:inline">Profile</span>
          </Link>
        </li>

                  <li>
          <Link to={'/requestDonation'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Request Blood">
            {/* Progile icon */}
           <MdOutlineBloodtype className='text-2xl'/>
            <span className="ml-2 hidden group-hover:inline">Request Blood</span>
          </Link>
        </li>
{/* volunteer */}
          <li>
          <Link to={'/dashboard/myDonation'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Donations">
            {/* Progile icon */}
           <BiDonateBlood className='text-2xl'/>
            <span className="ml-2 hidden group-hover:inline">My Donations</span>
          </Link>
        </li>

{/* admin */}

          <li>
          <Link to={'/dashboard/allDonationRequests'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Donation Request">
            {/* Progile icon */}
           <BiDonateHeart className='text-2xl'/>
            <span className="ml-2 hidden group-hover:inline">All Donation Request</span>
          </Link>
        </li>

            <li>
          <Link to={'/dashboard/userManagement'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users">
            {/* Progile icon */}
           <FaUsers className='text-2xl'/>
            <span className="ml-2 hidden group-hover:inline">Users</span>
          </Link>
        </li>

          <li>
          <Link to={'/funding'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Funding">
            {/* Progile icon */}
           <RiRefund2Fill className='text-2xl'/>
            <span className="ml-2 hidden group-hover:inline">Funding</span>
          </Link>
        </li>





{/* go bak to Home */}

        <li>
          <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
           <IoHomeOutline className='text-2xl'></IoHomeOutline>
            <span className="ml-2 hidden group-hover:inline">Homepage</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default DashboardLayout;