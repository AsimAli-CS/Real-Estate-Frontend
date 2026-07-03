import { useSelector } from 'react-redux'
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-10 text-3xl font-semibold text-center">Profile Page</h1>
      <form className="flex flex-col gap-4 max-w-lg mx-auto mt-5">
        <img
          src={currentUser.photo}
          alt="profile"
          className="w-18 h-18 rounded-full mx-auto"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          value={currentUser.name}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          value={currentUser.email}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
          Update Profile
        </button>
      </form>
      <div className="flex justify-between gap-4 mt-4">
        <span className="text-red-500 font-semibold text-sm">
          {' '}
          Delete Account
        </span>
        <span className="text-red-500 font-semibold text-sm"> Sign Out</span>
      </div>
    </div>
  )
}
