import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app'
import { LayoutHelper } from '~/components/layout-helper';
import { dark } from '@clerk/themes';
import { api } from "~/utils/api";
import "~/styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} 
      appearance={{
        baseTheme: dark
      }}
    >
      <LayoutHelper>
        <Component {...pageProps} />
      </LayoutHelper>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
