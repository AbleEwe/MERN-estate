import useCreateListing from "../hooks/useCreateListing"
import { useParams } from 'react-router-dom';

export const UpdateListing = () => {
    const { listingId } = useParams();

    const { 
        formData, 
        setFiles, 
        imageUploadError, 
        uploading, 
        handleImageSubmit, 
        handleRemoveImg, 
        handleChange,
        handleSubmitUpdate,
        loading,
        error 
    } = useCreateListing(listingId);

  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Update lisiting</h1>
        <form onSubmit={handleSubmitUpdate} className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
                <input value={formData.name} onChange={handleChange} type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" maxLength='62' minLength='10' required/>
                <textarea value={formData.description} onChange={handleChange} type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required/>
                <input value={formData.address} onChange={handleChange} type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" required/>
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input checked={formData.type === "sale"} onChange={handleChange} type="checkbox" id="sale" className="w-5"/>
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input checked={formData.type === "rent"} onChange={handleChange} type="checkbox" id="rent" className="w-5"/>
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input checked={formData.parking} onChange={handleChange} type="checkbox" id="parking" className="w-5"/>
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input checked={formData.furnished} onChange={handleChange} type="checkbox" id="furnished" className="w-5"/>
                        <span>Furnished</span>
                     </div>
                     <div className="flex gap-2">
                        <input checked={formData.offer} onChange={handleChange} type="checkbox" id="offer" className="w-5"/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input value={formData.bedrooms} onChange={handleChange} type="number" id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg"/>
                        <p>Bedrooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input value={formData.bathrooms} onChange={handleChange} type="number" id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg"/>
                        <p>Bathrooms</p>
                    </div>
                    {formData.offer && (
                    <div className="flex items-center gap-2">
                        <input value={formData.discountPrice} onChange={handleChange} type="number" id="discountPrice" min="0" max="10000000" required className="p-3 border border-gray-300 rounded-lg"/>
                        <div className="flex flex-col items-center">
                            <p>Discounted price</p>
                            <span className="text-xs">($ / month)</span>
                        </div>
                    </div>
                    )}
                    <div className="flex items-center gap-2">
                        <input value={formData.regularPrice} onChange={handleChange} type="number" id="regularPrice" min="50" max="10000000" required className="p-3 border border-gray-300 rounded-lg"/>
                        <div className="flex flex-col items-center">
                            <p>Regular price</p>
                            <span className="text-xs">($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                    <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple/>
                    <button 
                    disabled={uploading}
                    type="button" 
                    onClick={handleImageSubmit} 
                    className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? "Uploading..." : "Upload"}</button>
                </div>
                <p className="text-red-700">{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border item-center">
                            <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
                            <button type="button" onClick={()=>handleRemoveImg(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                        </div>
                    ))
                }
            <button 
            disabled={loading || uploading} 
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled::opacity-60">{loading ? 'Updating...' : 'Updte listing'}</button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
        </form>
    </main>
  )
}

