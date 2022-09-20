const ROUTES = {
  BASE: "/",
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFY_OTP: {
      BASE: "/verify-otp",
      PARAM: "/verify-otp/:id",
    },
    RESET_PASSWORD: {
      BASE: "/reset-password",
      PARAM: "/reset-password/:id",
    },
    CHANGE_PASSWORD: "/change-password",
    PROFILE: "/profile",
  },
  CATEGORY: {
    BASE: "/categories",
    ADD: "/category/add",
    UPDATE: {
      BASE: "/category/update",
      PARAM: "/category/update/:id",
    },
    DELETE: {
      BASE: "/category/delete",
      PARAM: "/category/delete/:id",
    },
  },
  ERROR: "*",
};

export default ROUTES;
