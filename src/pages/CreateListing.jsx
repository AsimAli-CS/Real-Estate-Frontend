import React from 'react'

export default function CreateListing() {
  const [files, setFiles] = React.useState([])
  const [formData, setFormData] = React.useState({ imageUrls: [] })
  const [imagePreview, setImagePreview] = React.useState([])
  const [imageUploadError, setImageUploadError] = React.useState('')
  console.log(formData)
  const storeImage = async (file) => {
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    )
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: 'POST',
        body: uploadData,
      }
    )
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error?.message || 'Image upload failed')
    }
    return data.url
  }

  const handleImageUpload = async (e) => {
    if (files.length > 0 && files.length <= 6) {
      setImageUploadError('')
      try {
        const urls = await Promise.all(
          Array.from(files).map((file) => storeImage(file))
        )
        setImagePreview((prev) => [...prev, ...urls])
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...urls],
        }))
      } catch (error) {
        console.error('Error uploading images:', error)
        setImageUploadError('Image upload failed (2 MB max per image)')
      }
    } else {
      setImageUploadError('You can only upload up to 6 images per listing')
    }
  }

  return (
    <main className="p-3 max-w-7xl mx-auto">
      <h1 className="p-10 text-3xl font-semibold text-center">
        Create Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row ">
        <div className="flex flex-col gap-3 w-full sm:w-1/2 p-10">
          <input
            className="border border-gray-300 rounded-md p-2 flex-1 w-full"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            id="description"
            name="description"
            placeholder="Description"
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <div className="flex gap-3 flex-wrap">
            <div className="flex ">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                className="w-5"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sale: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Sale</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                className="w-5"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rent: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Rent</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parking: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Parking</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    furnished: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Furnished</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="offer"
                name="offer"
                className="w-5"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, offer: e.target.checked }))
                }
              />
              <span className="ml-2">Offer</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div>
              <input
                className="border border-gray-300 rounded-md p-2 mt-2"
                type="number"
                id="bedrooms"
                name="bedrooms"
                min="1"
                max="10"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bedrooms: parseInt(e.target.value),
                  }))
                }
              />
              <span className="ml-2">Bedrooms</span>
            </div>
            <div>
              <input
                className="border border-gray-300 rounded-md p-2 mt-2"
                type="number"
                id="bathrooms"
                name="bathrooms"
                min="1"
                max="10"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bathrooms: parseInt(e.target.value),
                  }))
                }
              />
              <span className="ml-2">Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-md p-2 mt-2"
                type="number"
                id="regularPrice"
                name="regularPrice"
                min="1"
                max="10"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    regularPrice: parseInt(e.target.value),
                  }))
                }
              />
              <div className="flex flex-col items-center gap-1">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-md p-2 mt-2"
                type="number"
                id="discountedPrice"
                name="discountedPrice"
                min="1"
                max="10"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountedPrice: parseInt(e.target.value),
                  }))
                }
              />
              <div className="flex flex-col items-center gap-1">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="font-semibold">Images:</p>
            <span> First Image will be used as the listing thumbnail.</span>
            <div className="flex flex-col gap-2">
              <input
                className="border border-gray-300 rounded-md p-2 mt-2"
                type="file"
                id="images"
                name="images"
                accept=".jpg,.png,.jpeg"
                multiple
                required
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              type="submit"
            >
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}
