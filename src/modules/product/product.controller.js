import { productService } from './product.service.js';

const createProduct = async (req, res, next) => {
    try {
        const result = await productService.createProductDB(req.body);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsDB();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

export const productController = {
    createProduct,
    getAllProducts
};