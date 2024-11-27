// services/product.service.ts
import axios from 'axios';
import { Product } from './product.model';


const fetchAndSaveAllProducts = async () => {
  try {
    // Fetching all products from the database
    const products = await Product.find({}).limit(12);

    if (!products || products.length === 0) {
      console.log('No products found in the database.');
      return [];
    }

    // Optionally, you can map the products to a specific format if needed
    const formattedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image, // Assuming you are saving the first image
      price: product.price,
    }));

    return formattedProducts;
  } catch (error) {
    console.error('Error fetching products from database:', error);
    throw new Error('Unable to fetch products from the database');
  }
};
const fetchProductById = async (id: number) => {
  try {
    const product = await Product.findOne({ id });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Unable to fetch product');
  }
};

export const ProductService = {
  fetchAndSaveAllProducts,
  fetchProductById,
};