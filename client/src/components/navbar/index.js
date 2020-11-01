import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
    const location = useLocation().pathname;
    const path = location === '/' ? 'home' : location.substr(1);
    const [current, setCurrent] = useState(path);

    useEffect(() => {
        setCurrent(path);
    }, [path]);

    const handleItemClick = (_, { name }) => setCurrent(name);
    return (
        <Menu pointing secondary size='massive' inverted className='navbar'>
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
