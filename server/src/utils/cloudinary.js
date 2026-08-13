// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     console.log("Cloudinary file path:", localFilePath);

//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     console.log("Cloudinary response:", response);

//     fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     console.log("Cloudinary Error:", error);

//     if (localFilePath && fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }

//     throw error;
//   }
// };

// module.exports = uploadOnCloudinary;

const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const absolutePath = path.resolve(localFilePath);

    console.log("Uploading:", absolutePath);

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "image",
    });

    console.log("Cloudinary URL:", response.secure_url);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
    return response;
  } catch (error) {
    console.log("Cloudinary Error:", error);

    if (localFilePath && fs.existsSync(path.resolve(localFilePath))) {
      fs.unlinkSync(path.resolve(localFilePath));
    }

    throw error;
  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // console.log("Cloudinary Delete Error:", error);
    throw error;
  }
};
