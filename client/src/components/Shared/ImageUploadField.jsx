import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const MultipleImageUploadField = ({
  values,
  setFieldValue,
  existingImages = [],

}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Load existing images into previews on component mount 
  useEffect(() => {
    if (existingImages.length) {
      const fullImageUrls = existingImages.map((image) =>
        image.startsWith("http")
          ? image
          : `http://localhost:5454/images/${image}`
      );
      setImagePreviews(fullImageUrls);
      setSelectedImages(fullImageUrls);
      setFieldValue("imageUrl", fullImageUrls);
    }
  }, [existingImages, setFieldValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(selectedImages, "files")
    if (files.length) {
      setSelectedImages((prev) => [...prev, ...files]);
      const newImagePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newImagePreviews]);

      setFieldValue("imageUrl", [...selectedImages, ...files]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    console.log(updatedImages, 'updatedImages')

    setSelectedImages(updatedImages);
    setImagePreviews(updatedPreviews);

    setFieldValue("imageUrl", updatedImages);
  };
  console.log(selectedImages, "selected")
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full lg:h-40 mt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
        </div>
      </label>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        name="imageUrl"
      />
      {imagePreviews.length > 0 && (
        <div className="w-full grid grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={``}
                className="w-full lg:h-[10rem] h-[5rem] object-cover rounded-lg"
              />
              <MdCancel
                size={32}
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 text-primary rounded-full p-1 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MultipleImageUploadField;
