import { Link, NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                YOUDEMY
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
                end
              >
                Accueil
              </NavLink>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Cours
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Catégories
              </NavLink>
              
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Statistiques
              </NavLink>
            </nav>
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header
