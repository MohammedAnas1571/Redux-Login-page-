import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";

import {
  updateUSerStart,
  updateUSerSuccess,
  updateUserFailure,
} from "../Redux/user/createSlice";

export const Profile = () => {
  const {currentUser,loading,error} = useSelector((state) => state.user);
  const inputRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [update,setUpdate] = useState(false)
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileSystem(image);
    }
  }, [image]);

  const handleFileSystem = (image) => {
    const store = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(store, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        

        setImagePercent(progress);
      },
      (error) => setImageError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePhoto: downloadUrl });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUSerStart());

    try {
     
      const response = await axios.post(`/auth/user/update/${currentUser._id}`, formData);
      const data = response.data;
      dispatch(updateUSerSuccess(data));
      setUpdate(true)
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  console.log(currentUser.profilePhoto);

  return (
    <div className="p-12 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={inputRef}
          hidden
          accept="/image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
  src={formData.profilePhoto || (currentUser.profilePhoto)}
  alt="Profile Picture"
  className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 "
  onClick={() => inputRef.current.click()}
/>

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-600">Error Uploading Image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-red-600">{`Uploading ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-600">Image Uploaded successfully </span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="userName"
          placeholder="username"
          className="bg-slate-200 rounded-lg p-3 "
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200  rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          type="submit" className="bg-slate-700 text-white uppercase rounded-lg hover:opacity-90 p-3"
        >{loading? "Loading":"Update"}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">SignOut</span>
      </div>
      <p className="text-green-600">{update ?"updated successfully":""}</p>
      <p className="text-red-600">{error && "Something went to Error"}</p>
    </div>
  );
};
