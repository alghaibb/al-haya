import Wishlist from '../../models/Wishlist';

interface WishlistActionParams {
  userId: string;
  productId?: string;
}


const wishlistResolvers = {
  Query: {
    // Fetch user's wishlist
    wishlist: async (_: any, { userId }: WishlistActionParams) => {
      try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');
        return wishlist ? wishlist.items : [];
      } catch (error) {
        throw new Error('Error fetching wishlist');
      }
    },
  },
  Mutation: {
    // Add product to wishlist
    addToWishlist: async (_: any, { userId, productId }: WishlistActionParams) => {
      try {
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
          wishlist = new Wishlist({ user: userId, items: [] });
        }

        const itemExists = wishlist.items.some(item => item.productId === productId);

        if (!itemExists) {
          wishlist.items.push({ productId });
          await wishlist.save();
        }

        return wishlist.items.find(item => item.productId === productId);
      } catch (error) {
        throw new Error('Error adding to wishlist');
      }
    },

    // Remove product from wishlist
    removeFromWishlist: async (_: any, { userId, productId }: WishlistActionParams) => {
      try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
          throw new Error('Wishlist not found');
        }

        // Remove the item from the wishlist
        wishlist.items = wishlist.items.filter(item => item.productId !== productId);
        await wishlist.save();

        return { message: 'Item removed from wishlist' };

      } catch (error) {
        throw new Error('Error removing from wishlist');
      }
    },

    // Clear the user's wishlist
    clearWishlist: async (_: any, { userId }: WishlistActionParams) => {
      try {
        await Wishlist.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
        return true;
      } catch (error) {
        throw new Error('Error clearing wishlist');
      }
    },
  },
};

export default wishlistResolvers;
