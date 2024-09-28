import * as React from 'react';
import { Link } from 'react-router-dom';
import '../Contents/SideBar.css';
import { ThemeSwitch } from '../../ThemeSwitch/ThemeSwitch';
import { LoginRegisterButton } from '../../LoginResgister/jsx/LoginRegisterButton';

const maps = [
    { path: '/dashboard/manage/employees', name: 'Manage employees' },
    { path: '/dashboard/manage/customers', name: 'Manage customers' },
    { path: '/dashboard/manage/films', name: 'Manage films' },
    { path: "/dashboard/manage/tickets", name: "Manage tickets" },
  ]


export function SideBar (props) {
    // const navigate = useNavigate();
    // const scrollToSection = (id: string) => {
    //   const section = document.getElementById(id);
    //   section?.scrollIntoView({ behavior: "smooth" });
    // };

    const handleNavbarMobileToggle = () => {
      console.log("nav", "nav");
      const nav = document.getElementById('navbar')?.classList;
      console.log(nav, "nav")
      const navToggle = document.getElementById('nav-toggle')?.classList;
      if (nav?.contains('navbar-mobile')) {
        nav.remove('navbar-mobile')
        console.log("A")
        navToggle?.replace('bi-x', 'bi-list')
      } else {
        nav?.add('navbar-mobile')
        console.log("B")

        navToggle?.replace('bi-list', 'bi-x')
      }
    }

    const geeksforgeeks = () => {
      let x = document.getElementById("menus");
      
      if (x?.style.display === "block") {
          x.style.display = "none";
      } else {
          // x.style.display = "block";
      }
  }

    const renderNavbar = () => {
      
      return (
        <div className="menu-list">
        {/* <div className="geeks">
              <a href="#" className="">GeeksforGeeks</a>
              <div id="menus">
                  <a href="#">Language</a>
                  <a href="#">Practice</a>
                  <a href="#">Interview</a>
                  <a href="#">Puzzle</a>

              </div>
              
              <a href="javascript:void(0);" className="icon"
                onClick={() => geeksforgeeks()}>
                <i onClick={() => {}} className="fa fa-plus-circle">
                </i>
              </a>
            </div> */}
        </div>
      )
    }

    const handleClose = () => {
        
      }
    const navigations = [];
  
    return (
        <>
        <header id='header' className='fixed-top pt-3 pb-2 position-relative'>
          <div className='container d-flex align-items-center items-center mx-auto flex-between'>
            <i id='nav-toggle' className='bi bi-list mobile-nav-toggle' onClick={handleNavbarMobileToggle}></i>
            <h1 className='logo'>
              <a href='/' className='site'>
                Nature Cinema
              </a>
            </h1>
            <div id='navbar' className='navbar order-last order-lg-0 px-4 mx-auto mobile-cover'>
                {maps.map(({ path, name }) => {
                  const currentPath = '';
                  const p = path.split('/')?.[1];  
                  return (
                    <div key={name} className='me-4 py-4'>
                      <Link
                        className={`nav-link scrollto ${currentPath === p ? 'active' : ''}`}
                        onClick={handleClose}
                        to={path}
                      >
                        {name}
                      </Link>
                    </div>
                  )
                })}
            </div>
            <LoginRegisterButton />
            <div className='mobile-cover'>
              <ThemeSwitch />
            </div>
          </div>
        </header>
      </>
    );
  }