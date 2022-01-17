import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Salon2Bomb</title>
      </Head>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
