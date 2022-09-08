import { Header } from './Header'
import { Footer } from './Footer'
import Head from 'next/head'

export default function Layout({ children, onSubmit, logResult, userConnect }) {

  return (
    <>
      <Head>
        <title>RetroGamers</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header onSubmit={onSubmit} logResult={logResult} userConnect={userConnect} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
