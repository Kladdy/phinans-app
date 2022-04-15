// This is needed due to https://nextjs.org/docs/messages/no-stylesheets-in-head-component
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Inter Font */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>

        {/* FontAwesome */}
        <link href="css/all.css" rel="stylesheet" type="text/css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}