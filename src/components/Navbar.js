import { Link } from 'react-router-dom';
import logo from './images/pet-house.png';
import logoBrand from './images/homepets-brand.png';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

function Navbar() {
  const { logout, loggedInUser } = useContext(AuthContext);

  return (
    <nav className='py-0 px-4 navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between'>
      <Link
        className='navbar-brand d-flex justify-content-between align-items-center m-0'
        style={{ width: '100px' }}
        to='/'
      >
        <img className='is-logo' src={logo} alt='logo' width='45' height='45' />
        <img
          className='is-logo'
          src={logoBrand}
          alt='logo name'
          width='65'
          height='35'
        />
      </Link>
      <ul className='nav justify-content-center align-items-center'>
        {loggedInUser.token ? null : (
          <li className='nav-item'>
            <Link
              className='nav-link p-0'
              aria-current='page'
              to='/auth/signup'
            >
              <button className='btn btn-warning rounded-pill btnNav'>
                Cadastre-se
              </button>
            </Link>
          </li>
        )}

        {loggedInUser.token ? null : (
          <li className='nav-item'>
            <Link
              className='nav-link p-0'
              aria-current='page'
              to='/auth/login'
            >
              <button className='btn btn-primary rounded-pill btnNav'>Entre</button>
            </Link>
          </li>
        )}
        {loggedInUser.token ? (
          <li className='nav-item'>
            <Link
              className='nav-link p-0'
              aria-current='page'
              to='/adv/create'
            >
              <button className='btn btn-dark rounded-pill btnNav'>
                Criar anúncio
              </button>
            </Link>
          </li>
        ) : null}
        {loggedInUser.token ? (
          <li className='nav-item'>
            <Link
              className='nav-link p-0'
              aria-current='page'
              to={`/detalhes-usuario/${loggedInUser.user._id}`}
            >
              <button className='btn btn-primary rounded-pill btnNav'>
                {loggedInUser.user.name.split(' ')[0]}
              </button>
            </Link>
          </li>
        ) : null}
        {loggedInUser.token ? (
          <li className='nav-item'>
            <Link
              className='nav-link p-0'
              aria-current='page'
              to='/'
              onClick={logout}
            >
              <button className='btn btn-danger rounded-pill btnNav'>Sair</button>
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
export default Navbar;
