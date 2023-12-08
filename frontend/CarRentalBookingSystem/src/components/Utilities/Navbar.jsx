import React from 'react';
import { Link , useMatch, useResolvedPath} from 'react-router-dom';
import '../../assets/nav.css'

const Navbar = () => {
    return <nav className='nav'>
        <Link to="/" className='Site-Title'>Chasing Horizons</Link>
        <ul>
            <CustomLink to="/About"> About </CustomLink>
        </ul>
    </nav>
}


function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive ? "active" : ""}> 
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
export default Navbar