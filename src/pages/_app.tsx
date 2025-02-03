import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../../Providers/AppContext"; // Import the provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
  <Component {...pageProps} />
  </AppProvider>
);
}
