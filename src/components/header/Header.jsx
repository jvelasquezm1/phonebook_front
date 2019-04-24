import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Header.module.scss';

const Header = ({ children }) => <header className={styles.Header}>{children}</header>;

Header.defaultProps = {
  children: null,
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
