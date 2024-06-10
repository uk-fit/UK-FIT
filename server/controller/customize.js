const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const customizeModel = require("../models/customize");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class Customize {
  async getImages(req, res) {
    try {
      let images = await customizeModel.find({});
      if (images) {
        return res.json({ images });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch images" });
    }
  }

  async uploadSlideImage(req, res) {
    if (!req.file) {
      return res.json({ error: "Image file required" });
    }

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Save the public URL to the database
      let newCustomize = new customizeModel({
        slideImage: result.secure_url,
      });
      let save = await newCustomize.save();
      if (save) {
        return res.json({ success: "Image uploaded successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "Image ID required" });
    }
    try {
      let deletedSlideImage = await customizeModel.findById(id);
      if (!deletedSlideImage) {
        return res.status(404).json({ error: "Image not found" });
      }

      // Delete image from Cloudinary
      const publicId = deletedSlideImage.slideImage.split('/').pop().split('.')[0];
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        // Delete image record from database
        await customizeModel.findByIdAndDelete(id);
        return res.json({ success: "Image deleted successfully" });
      } else {
        console.log(result);
        return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to delete image" });
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Users = await userModel.find({}).count();
      return res.json({ Categories, Products, Orders, Users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  }
}

module.exports = new Customize();
