import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
export default function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const { currentUser } = useSelector((state) => state.user)
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
      console.log('Cloudinary upload result:', data)
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
      <form className="flex flex-col gap-4 max-w-lg mx-auto mt-5">
        <input
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
          <img
            src={currentUser.photo}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />

          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-medium text-center px-2">
              Change Profile Image
            </span>
          </div>
        </div>
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
