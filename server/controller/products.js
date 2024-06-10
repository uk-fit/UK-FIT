const productModel = require("../models/products");

class Product {
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
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
    let images = req.files;

    // Validation
    if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
      return res.json({ error: "All fields must be filled" });
    }

    // Validate Name and description
    if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name must be less than 255 characters and Description must be less than 3000 characters",
      });
    }

    // Validate Images
    if (images.length !== 2) {
      return res.json({ error: "Must provide exactly 2 images" });
    }

    const imageArray = images.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    try {
      let newProduct = new productModel({
        pImages: imageArray,
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
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postEditProduct(req, res) {
    let { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body;
    let editImages = req.files;

    // Validate other fields
    if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
      return res.json({ error: "All fields must be filled" });
    }

    // Validate Name and description
    if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name must be less than 255 characters and Description must be less than 3000 characters",
      });
    }

    // Validate Update Images
    if (editImages && editImages.length !== 2) {
      return res.json({ error: "Must provide exactly 2 images" });
    }

    const editData = {
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
    };

    if (editImages.length === 2) {
      const imageArray = editImages.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
      editData.pImages = imageArray;
    }

    try {
      let editProduct = await productModel.findByIdAndUpdate(pId, editData, { new: true });
      if (editProduct) {
        return res.json({ success: "Product edited successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let deleteProduct = await productModel.findByIdAndDelete(pId);
      if (deleteProduct) {
        return res.json({ success: "Product deleted successfully" });
      } else {
        return res.json({ error: "Product not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let singleProduct = await productModel
        .findById(pId)
        .populate("pCategory", "cName")
        .populate("pRatingsReviews.user", "name email userImage");
      if (singleProduct) {
        return res.json({ product: singleProduct });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let products = await productModel.find({ pCategory: catId }).populate("pCategory", "cName");
      if (products) {
        return res.json({ products });
      }
    } catch (err) {
      return res.json({ error: "Error retrieving products by category" });
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let products = await productModel
        .find({ pPrice: { $lt: price } })
        .populate("pCategory", "cName")
        .sort({ pPrice: -1 });
      if (products) {
        return res.json({ products });
      }
    } catch (err) {
      return res.json({ error: "Error filtering products by price" });
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let wishProducts = await productModel.find({ _id: { $in: productArray } });
      if (wishProducts) {
        return res.json({ products: wishProducts });
      }
    } catch (err) {
      return res.json({ error: "Error retrieving wish list products" });
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let cartProducts = await productModel.find({ _id: { $in: productArray } });
      if (cartProducts) {
        return res.json({ products: cartProducts });
      }
    } catch (err) {
      return res.json({ error: "Error retrieving cart products" });
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let product = await productModel.findById(pId);
      if (product) {
        const existingReview = product.pRatingsReviews.find(r => r.user.toString() === uId);
        if (existingReview) {
          return res.json({ error: "You have already reviewed this product" });
        }

        product.pRatingsReviews.push({ review, user: uId, rating });
        await product.save();
        return res.json({ success: "Thanks for your review" });
      } else {
        return res.json({ error: "Product not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId || !pId) {
      return res.json({ error: "All fields must be filled" });
    }

    try {
      let product = await productModel.findById(pId);
      if (product) {
        product.pRatingsReviews = product.pRatingsReviews.filter(r => r._id.toString() !== rId);
        await product.save();
        return res.json({ success: "Your review has been deleted" });
      } else {
        return res.json({ error: "Product not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const productController = new Product();
module.exports = productController;
