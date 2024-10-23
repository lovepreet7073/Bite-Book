import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
const MultipleImageUploadField = ({ values, setFieldValue }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // Handle file input change (multiple files)
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Get multiple files
        if (files.length) {
            setSelectedImages((prev) => [...prev, ...files]); // Add new files to selected images
            const newImagePreviews = files.map((file) => URL.createObjectURL(file)); // Create preview URLs
            setImagePreviews((prev) => [...prev, ...newImagePreviews]);

            // Update Formik field value with the array of files
            setFieldValue('imageUrl', [...selectedImages, ...files]);
        }
    };

    // Handle removing an image
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove); // Remove from selected images
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove); // Remove preview

        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);

        // Update Formik field value with updated images
        setFieldValue('imageUrl', updatedImages);
    };

    return (
        <div className="flex flex-col items-center justify-center  gap-3 w-full">
            {/* Display selected image previews */}
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 mt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                    </p>
                </div>
            </label>
            <input
                name="imageUrl"
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple // Allow multiple files
                onChange={handleImageChange}
            />
            {imagePreviews.length > 0 && (
                <div className="w-full grid grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img
                                src={preview}
                                alt={`Selected Preview ${index}`}
                                className="w-full h-22 object-cover rounded-lg"
                            />
                            {/* Delete button to remove image */}
                            <MdCancel
                                size={32}
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1  text-primary rounded-full p-1 cursor-pointer "
                            />


                        </div>
                    ))}
                </div>
            )}

            {/* File input for selecting multiple images */}

        </div>
    );
};

export default MultipleImageUploadField;
