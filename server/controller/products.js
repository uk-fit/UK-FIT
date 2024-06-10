const productModel = require("../models/products");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Product {
  static async deleteImages(images) {
    try {
      for (const image of images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProduct(req, res) {
    try {
      let products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (products) {
        return res.json({ products });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
    let images = req.files;

    if (
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let allImages = [];
      for (const img of images) {
        const result = await cloudinary.uploader.upload(img.path);
        allImages.push({ url: result.secure_url, public_id: result.public_id });
      }

      let newProduct = new productModel({
        pImages: allImages,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      });

      let save = await newProduct.save();
      if (save) {
        return res.json({ success: "Product created successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to add product" });
    }

    const imageArray = images.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    if (
      !pId ||
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      return res.json({ error: "All fields are required" });
    }

    let editData = {
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
    };
    if (editImages && editImages.length == 2) {
      try {
        let allEditImages = [];
        for (const img of editImages) {
          const result = await cloudinary.uploader.upload(img.path);
          allEditImages.push({ url: result.secure_url, public_id: result.public_id });
        }
        editData = { ...editData, pImages: allEditImages };
        Product.deleteImages(pImages);
      } catch (err) {
        console.log(err);
        return res.json({ error: "Failed to upload images" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      let editProduct = productModel.findByIdAndUpdate(pId, editData);
      editProduct.exec((err) => {
        if (err) {
          console.log(err);
          return res.json({ error: "Failed to edit product" });
        }
        return res.json({ success: "Product edit successfully" });
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to edit product" });
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let deleteProductObj = await productModel.findById(pId);
      let deleteProduct = await productModel.findByIdAndDelete(pId);
      if (deleteProduct) {
        Product.deleteImages(deleteProductObj.pImages);
        return res.json({ success: "Product deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to delete product" });
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let singleProduct = await productModel
        .findById(pId)
        .populate("pCategory", "cName")
        .populate("pRatingsReviews.user", "name email userImage");
      if (singleProduct) {
        return res.json({ Product: singleProduct });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch product" });
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let products = await productModel
        .find({ pCategory: catId })
        .populate("pCategory", "cName");
      if (products) {
        return res.json({ Products: products });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let products = await productModel
        .find({ pPrice: { $lt: price } })
        .populate("pCategory", "cName")
        .sort({ pPrice: -1 });
      if (products) {
        return res.json({ Products: products });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let wishProducts = await productModel.find({
        _id: { $in: productArray },
      });
      if (wishProducts) {
        return res.json({ Products: wishProducts });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let cartProducts = await productModel.find({
        _id: { $in: productArray },
      });
      if (cartProducts) {
        return res.json({ Products: cartProducts });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let checkReviewRatingExists = await productModel.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.some(item => item.user == uId)) {
        return res.json({ error: "You have already reviewed the product" });
      }

      let newRatingReview = await productModel.findByIdAndUpdate(pId, {
        $push: {
          pRatingsReviews: {
            review: review,
            user: uId,
            rating: rating,
          },
        },
      });
      return res.json({ success: "Thanks for your review" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to add review" });
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "All fields are required" });
    }

    try {
      let reviewDelete = await productModel.findByIdAndUpdate(pId, {
        $pull: { pRatingsReviews: { _id: rId } },
      });
      return res.json({ success: "Your review is deleted" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to delete review" });
    }
  }
}

const productController = new Product();
module.exports = productController;

