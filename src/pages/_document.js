import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>VTH Admin Dashboard</title>
      <link id="theme-style" rel="stylesheet" href="/assets/css/portal.css"></link>
      </Head>
      <body className="app">
        <div className="app-wrapper">
        <Main />
        </div>
        <NextScript />
      </body>
      <script defer src="/assets/plugins/fontawesome/js/all.min.js"></script>
      {/* <script src="/assets/plugins/popper.min.js"></script> */}
    <script src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>  

    
    {/* <script src="/assets/plugins/chart.js/chart.min.js"></script> 
    <script src="/assets/js/index-charts.js"></script>  */}
    
    
    {/* <script src="/assets/js/app.js"></script>  */}
    
    
    
    </Html>
  );
}
