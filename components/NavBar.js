import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState'
// import Cookie from 'js-cookie';

function NavBar() {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const isActice = (r) => {
    if (r === router.pathname) {
      return " active"
    }
    else {
      return ""
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
    return router.push('/')
}

  const loggedRouter = () => {
    return(
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={auth.user.avatar} alt={auth.user.avatar} 
              style={{
                  borderRadius: '50%', width: '30px', height: '30px',
                  transform: 'translateY(-3px)', marginRight: '3px'
              }} /> {auth.user.name}
          </a>

          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link href="/profile">
                  <a className="dropdown-item">Profile</a>
              </Link>
              {
                  auth.user.role === 'admin' && adminRouter()
              }
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
      </li>
  )

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <div className="navbar-brand">Menu</div>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav">

          <li className="nav-item">
            <Link href="/cart">
              <div className={"nav-link" + isActice('/cart')}>
                <i className="fas fa-shopping-cart" aria-hidden="true"></i>Cart </div>
            </Link>
          </li>
          {
            Object.keys(auth).length === 0

              ? <li className="nav-item">
                <Link href="/signin">
                  <div className={"nav-link" + isActice('/signin')}>
                    <i className="fas fa-user" aria-hidden="true"></i>sign in </div>
                </Link>
              </li>
              : loggedRouter()
          }

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;