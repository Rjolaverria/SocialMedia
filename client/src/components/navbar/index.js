import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import { AuthContext } from '../../context/authContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation().pathname;
    const path = location === '/' ? 'home' : location.substr(1);
    const [current, setCurrent] = useState(path);

    useEffect(() => {
        setCurrent(path);
    }, [path]);

    const handleItemClick = (_, { name }) => setCurrent(name);

    const userNav = user && (
        <>
            <Menu.Item name={user.username} active={true} as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item name='logout' onClick={logout} />
            </Menu.Menu>
        </>
    );

    const guestNav = (
        <>
            <Menu.Item
                name='home'
                active={current === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={current === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={current === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </>
    );

    return (
        <Menu pointing secondary size='massive' color='blue' className='navbar'>
            <Container>{user ? userNav : guestNav}</Container>
        </Menu>
    );
};

export default Navbar;
