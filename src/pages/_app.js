import "@/styles/globals.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router=useRouter()
  const authRoutes=['/auth/login','/auth/register','404']
  const { asPath } = router;
  const is404Page = asPath === "/404" || (pageProps.error && pageProps.error.statusCode === 404);
  return <>
  <Provider store={store}>
    {(!authRoutes.includes(router.pathname) ) && <Navbar />}
    <Toaster position="bottom-right" />
  <Component {...pageProps} />
  </Provider>
  </>;
}
