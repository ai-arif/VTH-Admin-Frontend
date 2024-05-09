import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import store from "../../store/store";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const authRoutes = ["/auth/login", "/auth/register", "404"];
  const { asPath } = router;
  const is404Page = asPath === "/404" || (pageProps.error && pageProps.error.statusCode === 404);
  return (
    <>
      <Provider store={store}>
        {!authRoutes.includes(router.pathname) && <Navbar />}
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
