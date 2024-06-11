const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    const file = req.file;

    if (!cName || !cDescription || !cStatus || !file) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let checkCategoryExists = await categoryModel.findOne({ cName: cName });
      if (checkCategoryExists) {
        return res.json({ error: "Category already exists" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      console.log(result);
      let newCategory = new categoryModel({
        cName: toTitleCase(cName),
        cDescription,
        cStatus,
        cImage: result.url, // Use the secure URL provided by Cloudinary
      });

      await newCategory.save();

      return res.json({ success: "Category created successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields are required" });
    }
    try {
      let editCategory = categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      let edit = await editCategory.exec();
      if (edit) {
        return res.json({ success: "Category edited successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "Category ID is required" });
    }

    try {
      let deletedCategoryFile = await categoryModel.findById(cId);
      const public_id = deletedCategoryFile.cImage.split('/').pop().split('.')[0];

      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(public_id);

      let deleteCategory = await categoryModel.findByIdAndDelete(cId);
      if (deleteCategory) {
        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
