import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { updateUserSuccess } from '../redux/user/userSlice'
export default function Profile() {
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const { currentUser, token } = useSelector((state) => state.user)
  console.log(token)
  const [imagePreview, setImagePreview] = useState(currentUser.photo || '')
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (Object.keys(formData).length === 0) {
        setLoading(false)
        setError('No changes to update')
        return
      }

      const res = await fetch('http://localhost:3000/api/v1/user/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.status == false) {
        setError(data.message)
        setLoading(false)
        return
      }
      dispatch(updateUserSuccess(data.data))
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    )

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      console.log('Cloudinary upload result:', data.url)
      setImagePreview(data.url)
      setFormData((prev) => ({ ...prev, photo: data.url }))
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-10 text-3xl font-semibold text-center">Profile Page</h1>
      <form
        onSubmit={handleUpdateProfile}
        className="flex flex-col gap-4 max-w-lg mx-auto mt-5"
      >
        <input
          id="photo"
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <div
          className="relative w-18 h-18 mx-auto group cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-300" />
          )}

          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-medium text-center px-2">
              Change Profile Image
            </span>
          </div>
        </div>
        <input
          type="text"
          id="name"
          placeholder="username"
          value={formData.name ?? currentUser.name}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          id="email"
          type="text"
          placeholder="email"
          value={formData.email ?? currentUser.email}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}

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
