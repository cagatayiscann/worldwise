import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/FakeAuthContext';
import User from './User';
import styles from './PageNav.module.css';
import Logo from './Logo';

function PageNav() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        {isAuthenticated ? (
          <User />
        ) : (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
