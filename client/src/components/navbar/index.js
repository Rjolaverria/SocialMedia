import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
    const path = window.location.pathname;
    const location = path === '/' ? 'home' : path.substr(1);
    const [current, setCurrent] = useState(location);

    const handleItemClick = (_, { name }) => setCurrent(name);
    return (
        <Menu pointing secondary size='massive' color='blue' className='navbar'>
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
        </Menu>
    );
};

export default Navbar;
