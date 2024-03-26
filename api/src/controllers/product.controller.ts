import { RequestHandler } from "express";
import { ProductModel } from "../models";
import { ViewModel } from "../models/view.model";
import mongoose from "mongoose";

// CREATE PRODUCT
export const createProduct: RequestHandler = async (req, res) => {
  const {
    productName,
    generalCategoryId,
    subCategoryId,
    price,
    qty,
    // thumbnails,
    images,
    // coupon,
    // salePercent,
    description,
  } = req.body;

  try {
    const productExists = await ProductModel.find({
      productName,
      generalCategoryId,
      subCategoryId,
      price,
    });

    if (productExists.length) {
      return res.status(401).json({
        message: "This product is already exists",
      });
    }

    const product = await ProductModel.create({
      productName,
      generalCategoryId,
      subCategoryId,
      price,
      qty,
      // thumbnails,
      images,
      // coupon,
      // salePercent,
      description,
      createdAt: new Date(),
    });

    return res.json({ message: "Product successfully created", product });
  } catch (error) {
    res.json(error);
  }
};
// UPDATE PRODUCT
export const updateProduct: RequestHandler = async (req, res) => {
  const {
    id,
    productName,
    generalCategoryId,
    subCategoryId,
    price,
    qty,
    // thumbnails,
    // images,
    // coupon,
    // salePercent,
    description,
  } = req.body;

  try {
    const productExists = await ProductModel.find({ _id: id });

    if (!productExists.length) {
      return res.status(401).json({
        message: "Could not find this product",
      });
    }

    const updatedProduct = await ProductModel.updateOne(
      { _id: id },
      {
        productName,
        generalCategoryId,
        subCategoryId,
        price,
        qty,
        // thumbnails,
        // images,
        // coupon,
        // salePercent,
        description,
        updatedAt: new Date(),
      }
    );

    return res.json({
      message: "Product successfully updated",
      updatedProduct,
    });
  } catch (error) {
    res.json(error);
  }
};

// VIEW UPDATE
export const viewUpdate: RequestHandler = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const isViewed = await ViewModel.find({ userId, productId });

    if (isViewed.length) {
      const newViewQty = isViewed[0].viewQty + 1;
      await ViewModel.updateOne(
        {
          userId,
          productId,
        },
        { viewQty: newViewQty }
      );
      productViewsQuantityUpdate(productId);
      return res.json({ message: "View quantity updated" });
    }

    await ViewModel.create({
      userId,
      productId,
      viewQty: 1,
    });

    await productViewsQuantityCreate(productId);
    return res.json({ message: "View quantity created" });
  } catch (error) {
    res.json(error);
  }
};

// PRODUCT VIEWS QUANTITY UPDATE
export const productViewsQuantityUpdate = async (props: {
  productId: mongoose.Schema.Types.ObjectId;
}) => {
  const { productId } = props;

  try {
    const thisProduct = await ProductModel.findOne({ productId });

    if (thisProduct?.viewsCount) {
      const newViewsCount = thisProduct?.viewsCount + 1;
      await ProductModel.updateOne(
        {
          productId,
        },
        { viewsCount: newViewsCount }
      );
    }

    return true;
  } catch (error) {
    return false;
  }
};
// PRODUCT VIEWS QUANTITY CREATE
export const productViewsQuantityCreate = async (props: {
  productId: mongoose.Schema.Types.ObjectId;
}) => {
  const { productId } = props;

  try {
    await ProductModel.updateOne(
      {
        productId,
      },
      { viewsCount: 1 }
    );
    return true;
  } catch (error) {
    return false;
  }
};
