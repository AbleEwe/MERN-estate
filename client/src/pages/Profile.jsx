import {useDispatch, useSelector} from 'react-redux'
import { useRef, useState } from 'react'
import { 
  updateUserSuccess, 
  updateUserFailure,
  updateUserStart, 
  deleteUserFailure, 
  deleteUserStart, 
  deleteUserSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure, 
} from '../redux/userSlice';
import useFileUpload from '../hooks/useFileUpload';
import { Link } from 'react-router-dom';

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const {
    setFile,
    filePerc,
    fileUploadError,
    formData,
    handleChance,
  } = useFileUpload();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }
  
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
        const data = await res.json();
        if(data.success === false) {
          console.log(error.message)
          return;
    }
    setUserListings((prev) => prev.filter((listing)=> listing._id !== listingId))
    } catch (error) {
      console.log(error.message);
    }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData?.avatar || currentUser.avatar} alt='profile'
        className='rounded-full h-24 w-24  object-cover cursor-pointer self-center mt-2'/>
        <p>
          {fileUploadError ? 
          (<span className='text-red-700'>Error image upload(Image must be under 2MB)</span>) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input defaultValue={currentUser.username} type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChance}/>
        <input defaultValue={currentUser.email} type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChance}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80'>Save</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700'>{error ? error: ''}</p>
      <p className='text-green-700'>{updateSuccess ? 'User is updated successfully' : ""}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' :  ''}</p>
            
      {userListings && userListings.length > 0 &&
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
        {userListings.map((listing) => { 
          return (
          <div key={listing._id} className='gap-4 border rounded-lg p-3 flex justify-between items-center'>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain rounded-lg'/>
            </Link>
            <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
              <p>{listing.name}</p>
            </Link> 
            <div className='flex flex-col items-center'>
              <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase'>Edit</button>
              </Link>
            </div> 
          </div>
        )}
        )}
      </div>}
    </div>
  )
}

export default Profile
