import Head from "next/head";
import {Inter} from "next/font/google";
import App from "../components/Layout/App";
import NewsBlock from "@/components/NewsBlock/NewsBlock";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="title" content="Home title"/>
                <meta name="description" content="Homen description"/>
                <meta property="og:type" content="Home"/>
                <meta property="og:url" content="https://www.gujaratvandan.com/"/>
                <meta property="og:title" content="Home title"/>
                <meta property="og:description" content="Homen description"/>
                <meta
                    property="og:image"
                    content="https://secretseventeen.com/Media/icon.png"
                />
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://www.gujaratvandan.com/"/>
                <meta property="twitter:title" content="Home title"/>
                <meta property="twitter:description" content="Homen description"/>
                <meta
                    property="twitter:image"
                    content="https://secretseventeen.com/Media/icon.png"
                />
                <link rel="shortcut icon" href="/favicon.ico"/>

                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2916945760362146"
                        crossorigin="anonymous"></script>
                <meta name="google-site-verification" content="zGgHJz2irKeMA-BJqqQ2N9FK5NDP385rFy_SARY4eSo"/>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
            </Head>
            <App>
                <NewsBlock value={{unique: true}}/>
            </App>
        </>
    );
}
