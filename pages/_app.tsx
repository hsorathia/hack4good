// import type { AppProps /*, AppContext */ } from 'next/app';
import NavBar from '../Components/Layout/nav';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <NavBar />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Free Market LLC - Hack For Good 2021</Footer>
      </Layout>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
