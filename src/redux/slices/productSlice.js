import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

// Thunk để truy vấn dữ liệu từ Firestore
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const productCollection = await firestore().collection('products').get();

  //đại diện tât cả tài liệu (docs)
  //đại diện 1 tài liệu (doc)
  return productCollection.docs.map(doc => {
    const data = doc.data();

    // Xử lý trường hợp sub_variants có trường chứa Timestamp
    const subVariants = data.sub_variants?.map(variant => {
      if (variant.evaluate) {
        variant.evaluate = variant.evaluate.map(evalItem => ({
          ...evalItem,
          date: evalItem.date?.toDate().toISOString(), // Chuyển Timestamp thành chuỗi ISO
        }));
      }
      return variant;
    });

    return {
      id: doc.id,
      name: data.name,
      category: data.category,
      image: data.image,
      sale: data.sale,
      sub_variants: subVariants || [], // Đảm bảo không bị undefined
      describe: data.describe,
      productGroup:data.productGroup
    };
  });
});



const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
