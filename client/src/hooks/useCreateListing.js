import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux'
import { useNavigate} from "react-router-dom";


const useCreateListing = (listingId) => {
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);


    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                } else {
                    setFormData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (listingId) {
            fetchListing();
        }
    }, [listingId]);
    

    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished:false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageSubmit = () => {
        if(files.length > 0 && files.length  + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for(let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                console.error('Image upload failed:', error);
                setImageUploadError('Image upload failed (2MB max per image)');
                setUploading(false);
            });
        }else {
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false);
        } 
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() +file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImg = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    }

    const handleChange = (e) => {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type: e.target.id
            });
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData ({
                ...formData,
                [e.target.id]: e.target.checked
            });
        }
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData, 
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1) return setError('You must upload atleast one image!');
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price!');
            setLoading(true);
            setError(false);
            const res = await fetch("/api/listing/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                }),
              });
              const data = await res.json();
              setLoading(false);
              if (data.success === false) {
                setError(data.message);
                return;
              }
              navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1) return setError('You must upload atleast one image!');
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price!');
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${listingId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                }),
              });
              const data = await res.json();
              setLoading(false);
              if (data.success === false) {
                setError(data.message);
                return;
              }
              navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    return { formData, setFormData, setFiles, imageUploadError, uploading, handleImageSubmit, handleRemoveImg, handleChange, handleSubmit, handleSubmitUpdate, error, loading };
}

export default useCreateListing;