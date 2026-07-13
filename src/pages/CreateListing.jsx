import React from 'react'

export default function CreateListing() {
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
          />
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            id="description"
            name="description"
            placeholder="Description"
            required
          />
          <input
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            required
          />
          <div className="flex gap-3 flex-wrap">
            <div className="flex ">
              <input type="checkbox" id="sale" name="sale" className="w-5" />
              <span className="ml-2">Sale</span>
            </div>
            <div className="flex ">
              <input type="checkbox" id="rent" name="rent" className="w-5" />
              <span className="ml-2">Rent</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5"
              />
              <span className="ml-2">Parking</span>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5"
              />
              <span className="ml-2">Furnished</span>
            </div>
            <div className="flex ">
              <input type="checkbox" id="offer" name="offer" className="w-5" />
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
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
