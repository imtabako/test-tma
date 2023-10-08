import {Link, useMatch, useResolvedPath} from "react-router-dom";

import './Navbar.css';

function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/swipe">Swipe</CustomLink>
        <CustomLink to="/chats">Chats</CustomLink>
      </ul>
    </nav>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true});

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar
