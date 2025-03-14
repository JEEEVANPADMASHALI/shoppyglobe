import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = lazy(() => import("./App.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const SignIn = lazy(() => import("./components/SignIn.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));

// Define routes with lazy-loaded components
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="text-center text-lg p-6">Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<div>Loading sign-in page...</div>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<div>Loading checkout...</div>}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <Suspense fallback={<div>Loading product details...</div>}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<div>Loading cart...</div>}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: (
      <Suspense fallback={<div>Page not found...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
