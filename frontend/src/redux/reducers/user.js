import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  addressloading: false,
  usersLoading: false,
  user: null,
  users: [],
  error: null,
  successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // 1. Load User Cases
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // 2. Update User Information Cases
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 3. Update User Address Cases
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // 4. Delete User Address Cases
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // 5. Get All Users (Admin) Cases
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })

    // 6. Utility State Cleaners
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
