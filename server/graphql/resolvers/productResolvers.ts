import Product from "../../models/Product";
import { validatePrice } from "../../utils/productValidators";

type ProductInput = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const productResolvers = {
  Query: {
    getProducts: async () => {
      try {
        return await Product.find({});
      } catch (err) {
        throw new Error('Error fetching products');
      }
    },
    getProductById: async (_: any, { id }: ProductInput) => {
      try {
        return await Product.findById(id);
      } catch (err) {
        throw new Error('Error fetching product');
      }
    },
  },

  Mutation: {
    // Add a new product
    addProduct: async (_: any, { name, description, price, image }: ProductInput) => {

      if (!validatePrice(price)) {
        throw new Error('Invalid price, price must be greater than 0.01');
      }

      // Create a new product
      const newProduct = new Product({
        name,
        description,
        price,
        image
      });

      // Save the product to the database
      try {
        await newProduct.save();
      } catch (error) {
        console.error("Error saving product", error);
        throw new Error("Error saving product");
      }
    },
    // Delete a product
    deleteProduct: async (_: any, { id }: { id: string }) => {
      try {
        const deleteProduct = await Product.findByIdAndDelete(id);

        if (!deleteProduct) {
          throw new Error("Product not found");
        }
        return `Product with ID ${id} was deleted successfully`;
      } catch (error) {
        console.error("Error deleting product", error);
        throw new Error("Error deleting product");
      }
    },
  },
};

export default productResolvers;
