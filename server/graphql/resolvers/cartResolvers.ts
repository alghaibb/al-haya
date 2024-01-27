import Cart from "../../models/Cart";

interface CartActionParams {
  userId: string;
  productId?: string;
  quantity?: number;
}

const cartResolvers = {
  Query: {
    // Fetch user's cart
    cart: async (_: any, { userId }: { userId: string }) => {
      try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return cart ? cart.items : [];
      } catch (error) {
        throw new Error("Error fetching cart");
      }
    },
  },
  Mutation: {
    // Add product to cart
    addToCart: async (_: any, { userId, productId, quantity }: CartActionParams) => {
      try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
          cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity ?? 0;
        } else {
          cart.items.push({ productId, quantity });
        }

        await cart.save();
        return cart.items.find(item => item.productId === productId);
      } catch (error) {
        throw new Error("Error adding to cart");
      }
    },

    // Remove product from cart
    removeFromCart: async (_: any, { userId, productId }: CartActionParams) => {
      try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
          throw new Error("Cart not found");
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();
        return cart.items.filter(item => item.productId !== productId);
      } catch (error) {
        throw new Error("Error removing from cart");
      }
    },

    // Clear the user's cart
    clearCart: async (_: any, { userId }: { userId: string }) => {
      try {
        await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
        return true;
      } catch (error) {
        throw new Error("Error clearing cart");
      }
    },
  },
};

export default cartResolvers;
