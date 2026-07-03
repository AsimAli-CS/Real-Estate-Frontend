import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.status == false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data.data.user))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-1">
        <p>Don't you have an account?</p>
        <Link to={'/signup'} className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
