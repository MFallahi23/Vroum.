import React, { useState } from "react";
import { VscError } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";

const CreatePost = () => {
  // DATA
  const fuelTypes = ["Gasoline", "Diesel", "Bio-diesel", "Ethanol", "Electric"];
  const engineTypes = [
    "Twin-cylinder",
    "Three-cylinder",
    "Four-cylinder",
    "Five-cylinder",
    "Six-cylinder",
    "Eight-cylinder or more",
  ];
  const transmissionTypes = [
    "Manual",
    "Torque Converter",
    "Continuously Variable",
    "Semi-Automatic",
    "Dual-Clutch",
    "Tiptronic",
  ];

  //-------------------------------------------//
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    imageUrls: [],
    title: "",
    description: "",
    city: "",
    type: "sale",
    carModel: "",
    vehiculeAge: 0,
    color: "",
    fuelType: fuelTypes[0],
    Transmission: transmissionTypes[0],
    engine: engineTypes[0],
    price: 0,
  });
  // console.log(form);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const navigate = useNavigate();

  // HANDLE IMAGE SUBMIT
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + form.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setForm({
            ...form,
            imageUrls: form.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // STORE IMAGE
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // HANDLE REMOVE IMAGES
  const handleRemoveImage = (index) => {
    setForm({
      ...form,
      imageUrls: form.imageUrls.filter((_, i) => i != index),
    });
  };

  // HANDLE CHANGE IN FORM (APART FROM IMAGE)

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setForm({
        ...form,
        type: e.target.id,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.id === "engine" ||
      e.target.id === "fuelType" ||
      e.target.id === "Transmission"
    ) {
      setForm({
        ...form,
        [e.target.id]: e.target.value,
      });
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (form.vehiculeAge > 50) {
        return setError("Vehicule too old");
      }
      setLoading(true);
      setError(false);
      const res = await axios.post(
        "/api/car/create",
        JSON.stringify({
          ...form,
          userRef: currentUser._id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = res;
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/car/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <div className=" max-w-[1000px] mx-auto">
        {error && (
          <div className=" bg-red-300 p-3 mb-8 text-red-700 font-semibold text-md flex items-center gap-2 capitalize max-w-[1000px] mx-5 lg:mx-auto">
            <div className="">
              <VscError className="text-2xl" />
            </div>

            {error}
          </div>
        )}
        <div className="flex justify-center">
          <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8 ">
            Sell your car
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row p-3 gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="">
              <label htmlFor="title" className="flex flex-col">
                <span>Title:</span>
                <input
                  onChange={handleChange}
                  value={form.title}
                  required
                  className="border p-2 rounded-lg"
                  type="text"
                  id="title"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="carModel" className="flex flex-col">
                <span>Model:</span>
                <input
                  onChange={handleChange}
                  value={form.carModel}
                  required
                  className="border p-2 rounded-lg"
                  type="text"
                  id="carModel"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="color" className="flex flex-col">
                <span>Color:</span>
                <input
                  onChange={handleChange}
                  value={form.color}
                  required
                  className="border p-2 rounded-lg"
                  type="text"
                  id="color"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="city" className="flex flex-col">
                <span>City:</span>
                <input
                  onChange={handleChange}
                  value={form.city}
                  required
                  className="border p-2 rounded-lg"
                  type="text"
                  id="city"
                />
              </label>
            </div>
            <div className="flex gap-3 flex-wrap items-center justify-center">
              <div className="">
                <label htmlFor="fuelType" className="flex items-center gap-1">
                  <span>Fuel type:</span>
                  <select
                    onChange={handleChange}
                    defaultValue={fuelTypes[0]}
                    className="border p-1 rounded-lg"
                    name="fuelType"
                    id="fuelType"
                  >
                    {fuelTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="">
                <label htmlFor="engine" className="flex items-center gap-1">
                  <span>Engine type:</span>
                  <select
                    onChange={handleChange}
                    defaultValue={engineTypes[0]}
                    className="border p-1 rounded-lg"
                    name="engine"
                    id="engine"
                  >
                    {engineTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="">
                <label
                  htmlFor="Transmission"
                  className="flex items-center gap-1"
                >
                  <span>Transmission type:</span>
                  <select
                    onChange={handleChange}
                    defaultValue={transmissionTypes[0]}
                    className="border p-1 rounded-lg"
                    name="Transmission"
                    id="Transmission"
                  >
                    {transmissionTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="">
                <label
                  htmlFor="vehiculeAge"
                  className="flex items-center gap-1"
                >
                  <span>Vehicule Age:</span>
                  <input
                    onChange={handleChange}
                    value={form.vehiculeAge}
                    className="border p-1 rounded-lg"
                    type="number"
                    min="0"
                    max="50"
                    id="vehiculeAge"
                  />
                </label>
              </div>
            </div>
            <div className="">
              <label htmlFor="description" className="flex flex-col">
                <span>Description:</span>
                <textarea
                  onChange={handleChange}
                  value={form.description}
                  type="text"
                  required
                  className="border p-2 rounded-lg"
                  id="description"
                />
              </label>
            </div>
            <div className="flex items-center flex-wrap gap-3 justify-around">
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="sale"
                    onChange={handleChange}
                    checked={form.type === "sale"}
                  />
                  <span>Sell</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="rent"
                    className=""
                    onChange={handleChange}
                    checked={form.type === "rent"}
                  />
                  <span>Rent</span>
                </div>
              </div>
              <div className="">
                <label htmlFor="price" className="flex items-center gap-2">
                  <span>
                    Price
                    {form.type === "rent" && "($ / month)"}:
                  </span>
                  <input
                    required
                    className="border p-2 rounded-lg"
                    type="number"
                    id="price"
                    min="0"
                    onChange={handleChange}
                    value={form.price}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <label htmlFor="image">
                <div>
                  Image:{" "}
                  <span className="text-xs">
                    The first image will be the cover (max 6)
                  </span>
                </div>
                <div className="border p-2 rounded-lg flex items-center justify-between">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className=" "
                    type="file"
                    id="image"
                    accept="image/*"
                    multiple
                  />
                  <button
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    type="button"
                    className=" bg-green-200  text-green-700 p-1 px-2 rounded-lg   hover:opacity-60 transition disabled:opacity-35"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </label>
              {imageUploadError && (
                <p className="text-red-700 text-sm p-1 bg-red-300 flex items-center gap-2 capitalize my-2">
                  <VscError />
                  {imageUploadError}
                </p>
              )}
            </div>
            <div className="my-5 flex flex-col gap-4">
              {form.imageUrls.length > 0 ? (
                form.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex items-center justify-between border p-2 rounded-lg"
                  >
                    <img
                      src={url}
                      className="w-20 h-20 object-contain rounded-lg"
                      alt="car images"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className=" bg-red-200  text-red-700 p-1 px-2 rounded-lg   hover:opacity-60 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-xl font-semibold">No images uploaded</h1>
                  <p>Upload your images in the section above </p>
                </div>
              )}
            </div>
            <button
              disabled={loading || uploading}
              className=" bg-myOrange text-white p-2 rounded-lg hover:opacity-80 disabled:opacity-45 transition"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
