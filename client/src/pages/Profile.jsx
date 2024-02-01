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

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false)
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
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700'>{error ? error: ''}</p>
      <p className='text-green-700'>{updateSuccess ? 'User is updated successfully' : ""}</p>
    </div>
  )
}

export default Profile
