const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const path = require("path");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file;

    if (!cName || !cDescription || !cStatus || !cImage) {
      return res.json({ error: "All fields must be filled" });
    }

    const imageBuffer = fs.readFileSync(cImage.path);
    const image = {
      data: imageBuffer,
      contentType: cImage.mimetype,
    };

    cName = toTitleCase(cName);
    try {
      let checkCategoryExists = await categoryModel.findOne({ cName: cName });
      if (checkCategoryExists) {
        return res.json({ error: "Category already exists" });
      } else {
        let newCategory = new categoryModel({
          cName,
          cDescription,
          cStatus,
          cImage: image,
        });
        await newCategory.save();
        fs.unlinkSync(cImage.path); // Remove the uploaded file after saving to database
        return res.json({ success: "Category created successfully" });
      }
    } catch (err) {
      console.log(err);
      fs.unlinkSync(cImage.path); // Remove the uploaded file if there's an error
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields must be filled" });
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
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All fields must be filled" });
    }
    try {
      let deleteCategory = await categoryModel.findByIdAndDelete(cId);
      if (deleteCategory) {
        return res.json({ success: "Category deleted successfully" });
      } else {
        return res.json({ error: "Category not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
