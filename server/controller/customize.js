const fs = require("fs");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      let images = await customizeModel.find({});
      if (images) {
        return res.json({ images });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async uploadSlideImage(req, res) {
    if (!req.file) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let newCustomize = new customizeModel({
        slideImage: {
          data: req.file.buffer, // Use req.file.buffer to store image data
          contentType: req.file.mimetype, // Use req.file.mimetype to store content type
        },
      });
      let save = await newCustomize.save();
      if (save) {
        return res.json({ success: "Image uploaded successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All fields are required" });
    } else {
      try {
        let deletedSlideImage = await customizeModel.findById(id);
        let deleteImage = await customizeModel.findByIdAndDelete(id);
        if (deleteImage) {
          return res.json({ success: "Image deleted successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Users = await userModel.find({}).count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
