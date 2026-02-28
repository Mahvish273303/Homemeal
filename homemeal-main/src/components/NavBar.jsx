import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '/images/loggo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isTransparentPage = ['/', '/process'].includes(location.pathname); // Removed '/dashboard' from transparent pages
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (isTransparentPage) {
      window.addEventListener('scroll', handleScroll);
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (isTransparentPage) {
        window.removeEventListener('scroll', handleScroll);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTransparentPage]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check if the current route is the Dashboard, and return null if true
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav ref={navRef} className={`
      w-full max-w-full fixed top-0 left-0 z-50
      ${isTransparentPage ? (scrolled ? 'bg-black shadow-md' : 'bg-transparent') : 'bg-white shadow-md'}
      transition-all duration-300 ease-in-out
    `}>
      <div className="container mx-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-center justify-start gap-0">
          <img src={logoImage} alt="Logo" className={` ${isTransparentPage ? (scrolled ? 'md:h-12 h-10' :'h-16 md:h-20 '): 'h-10 md:h-12 '}  `} />
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <ul className={`md:flex md:items-center md:space-x-6
          ${menuOpen ? 'absolute top-full left-0 right-0 bg-black shadow-md p-4' : 'hidden'}
          md:static md:bg-transparent md:shadow-none md:p-0
        `}>
          {['HOME', 'ABOUT', 'PROCESS', 'DASHBOARD'].map((item) => (
            <li key={item} className="py-2 md:py-0">
              <Link
                to={item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className={`
                  text-base font-medium tracking-wide transition-colors duration-300
                  ${
                    location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`)
                      ? 'text-[#dfd218]'
                      : scrolled 
                        ? 'text-white' 
                        : 'text-white' 
                  }
                  hover:text-[#dfd218]
                `}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
