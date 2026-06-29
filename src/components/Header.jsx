import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-400">Real</span>
            <span className="text-blue-400">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 flex items-center gap-2 px-3 py-1 rounded-md ">
          <input
            className="bg-transparent focus: outline-none placeholder:text-gray-400 w-24 sm:w-48"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-gray-400" />
        </form>
        <ul className="flex gap-3 text-sm sm:text-base">
          <Link to="/">
            <li className="hover:text-blue-400 cursor-pointer text-blue-400">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-400 cursor-pointer text-blue-400">
              About
            </li>
          </Link>
          <Link to="/signin">
            <li className="hover:text-blue-400 cursor-pointer text-blue-400">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
