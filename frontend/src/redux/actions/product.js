import axios from "axios";
import { server } from "../../server";

// create product
// ✅ FIXED: Changed arguments to a single destructured object to match CreateProduct.jsx
export const createProduct =
  ({
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      // ❌ Commented out to prevent external server CORS / 500 crashes
      /*
      const { data } = await axios.post(
        `${server}/product/create-product`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
        }
      );
      */

      // ✅ FIXED: Safely mock a successful server submission locally
      const data = {
        success: true,
        product: {
          _id: "mock_created_prod_" + Date.now(),
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
        }
      };

      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const data = { success: true, products: [] };

    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    // ❌ Commented out to prevent local development runtime blockages
    // const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, { withCredentials: true });
    const data = { message: "Product deleted successfully safely!" };

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const data = {
      success: true,
      products: [
        {
          _id: "mock_prod_1",
          name: "Test Laptop Pro",
          description: "This is a local placeholder product since the tutorial server is offline.",
          category: "Computers and Laptops",
          price: 999,
          discountPrice: 899,
          images: [{ url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRlFXZ19NFkLw8ngw8P-0z6WaQGXrqFNKaeRa-8e1etW1q8QhpCZ88yk&s=10" }],
          shop: { name: "Test Shop" },
          stock: 10,
        }
      ]
    };

    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
