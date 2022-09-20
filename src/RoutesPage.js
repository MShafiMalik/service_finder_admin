import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./modules/layouts/SplashScreen";
import { Suspense } from "react";
import Layout from "./modules/Layout";
import { useDispatch, useSelector } from "react-redux";
import { isAuthStatus, isMeAuth } from "./reducers/authSlice";
import { me } from "./helpers/auth";
import ROUTES from "./common/routes";

const ErrorPage404 = lazy(() => import("./modules/errors/ErrorPage404"));
const Login = lazy(() => import("./modules/auth/Login"));
const ForgotPassword = lazy(() => import("./modules/auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("./modules/auth/VerifyOtp"));
const ResetPassword = lazy(() => import("./modules/auth/ResetPassword"));
const Profile = lazy(() => import("./modules/auth/Profile"));
const ChangePassword = lazy(() => import("./modules/auth/ChangePassword"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Categories = lazy(() => import("./pages/categories/"));
const AddCategory = lazy(() => import("./pages/categories/AddCategory"));
const EditCategory = lazy(() => import("./pages/categories/EditCategory"));

export default function RoutesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isAuthFlag, setIsAuthFlag] = useState(false);
  const isAuth = useSelector(isAuthStatus);

  useEffect(() => {
    setLoading(true);
    try {
      me().then((response) => {
        setIsAuthFlag(true);
        if (response?.success === true) {
          const user = response.data;
          dispatch(isMeAuth({ user }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading === true || isAuthFlag === false) {
    return <SplashScreen />;
  } else {
    return (
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          <Route
            path={ROUTES.BASE}
            element={isAuth ? <Layout /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          >
            <Route index element={<Dashboard />} />
            <Route path={ROUTES.AUTH.PROFILE} element={<Profile />} />
            <Route
              path={ROUTES.AUTH.CHANGE_PASSWORD}
              element={<ChangePassword />}
            />
            <Route path={ROUTES.CATEGORY.BASE} element={<Categories />} />
            <Route path={ROUTES.CATEGORY.ADD} element={<AddCategory />} />
            <Route
              path={ROUTES.CATEGORY.UPDATE.PARAM}
              element={<EditCategory />}
            />
          </Route>
          <Route
            path={ROUTES.AUTH.LOGIN}
            element={!isAuth ? <Login /> : <Navigate to={ROUTES.BASE} />}
          />
          <Route
            path={ROUTES.AUTH.FORGOT_PASSWORD}
            element={
              !isAuth ? <ForgotPassword /> : <Navigate to={ROUTES.BASE} />
            }
          />
          <Route
            path={ROUTES.AUTH.VERIFY_OTP.PARAM}
            element={!isAuth ? <VerifyOtp /> : <Navigate to={ROUTES.BASE} />}
          />
          <Route
            path={ROUTES.AUTH.RESET_PASSWORD.PARAM}
            element={
              !isAuth ? <ResetPassword /> : <Navigate to={ROUTES.BASE} />
            }
          />
          <Route path={ROUTES.ERROR} element={<ErrorPage404 />} />
        </Routes>
      </Suspense>
    );
  }
}
