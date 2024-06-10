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
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      return res.json({ Products });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async postAddProduct(req, res) {
    const { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
    const images = req.files;

    if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const allImages = [];
      for (const img of images) {
        const result = await cloudinary.uploader.upload(img.path);
        allImages.push({ url: result.secure_url, public_id: result.public_id });
      }

      const newProduct = new productModel({
        pImages: allImages,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      });

      const save = await newProduct.save();
      return res.json({ success: "Product created successfully", product: save });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to add product" });
    }
  }

  async postEditProduct(req, res) {
    const {
      pId,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      pImages,
    } = req.body;
    const editImages = req.files;

    if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus) {
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

    if (editImages && editImages.length > 0) {
      try {
        const allEditImages = [];
        for (const img of editImages) {
          const result = await cloudinary.uploader.upload(img.path);
          allEditImages.push({ url: result.secure_url, public_id: result.public_id });
        }
        editData = { ...editData, pImages: allEditImages };
        await Product.deleteImages(pImages);
      } catch (err) {
        console.log(err);
        return res.json({ error: "Failed to upload images" });
      }
    }

    try {
      await productModel.findByIdAndUpdate(pId, editData);
      return res.json({ success: "Product edited successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to edit product" });
    }
  }

  async getDeleteProduct(req, res) {
    const { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const deleteProductObj = await productModel.findById(pId);
      if (!deleteProductObj) {
        return res.json({ error: "Product not found" });
      }
      await productModel.findByIdAndDelete(pId);
      await Product.deleteImages(deleteProductObj.pImages);
      return res.json({ success: "Product deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to delete product" });
    }
  }

  async getSingleProduct(req, res) {
    const { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const singleProduct = await productModel
        .findById(pId)
        .populate("pCategory", "cName")
        .populate("pRatingsReviews.user", "name email userImage");
      if (singleProduct) {
        return res.json({ Product: singleProduct });
      }
      return res.json({ error: "Product not found" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch product" });
    }
  }

  async getProductByCategory(req, res) {
    const { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const products = await productModel
        .find({ pCategory: catId })
        .populate("pCategory", "cName");
      return res.json({ Products: products });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getProductByPrice(req, res) {
    const { price } = req.body;
    if (!price) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const products = await productModel
        .find({ pPrice: { $lt: price } })
        .populate("pCategory", "cName")
        .sort({ pPrice: -1 });
      return res.json({ Products: products });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getWishProduct(req, res) {
    const { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const wishProducts = await productModel.find({ _id: { $in: productArray } });
      return res.json({ Products: wishProducts });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async getCartProduct(req, res) {
    const { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const cartProducts = await productModel.find({ _id: { $in: productArray } });
      return res.json({ Products: cartProducts });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to fetch products" });
    }
  }

  async postAddReview(req, res) {
    const { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All fields are required" });
    }

    try {
      const product = await productModel.findById(pId);
      if (!product) {
        return res.json({ error: "Product not found" });
      }

      const existingReview = product.pRatingsReviews.some(item => item.user.toString() === uId);
      if (existingReview) {
        return res.json({ error: "You have already reviewed the product" });
      }

      product.pRatingsReviews.push({ review, user: uId, rating });
      await product.save();
      return res.json({ success: "Thanks for your review" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to add review" });
    }
  }

  async deleteReview(req, res) {
    const { rId, pId } = req.body;
    if (!rId || !pId) {
     
      return res.json({ error: "All fields are required" });
    }

    try {
      const product = await productModel.findById(pId);
      if (!product) {
        return res.json({ error: "Product not found" });
      }

      const reviewIndex = product.pRatingsReviews.findIndex(review => review._id.toString() === rId);
      if (reviewIndex === -1) {
        return res.json({ error: "Review not found" });
      }

      product.pRatingsReviews.splice(reviewIndex, 1);
      await product.save();
      return res.json({ success: "Your review is deleted" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to delete review" });
    }
  }
}

const productController = new Product();
module.exports = productController;
