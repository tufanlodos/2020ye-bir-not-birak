import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as CookieMethods from "../common/cookie-methods";
import FormAndList from '../components/FormAndList';

export default function Home() {
  const user = CookieMethods.getUserFromCookie();
  console.log("user buuu",user);
  // CookieMethods.setUserCookie();

  return (
    <div className={styles.container}>
      <Head>
        <title>2020'ye Bir Not Bırak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          Evet, son zamanların en "uzun" yılıydı. <br></br>
          Evet, tahmin edemeyeceğimiz şeyler yaşadık. <br></br>
          Ve bu yıla veda ediyoruz. <br></br>
          Sen de
        </p>

        <h1 className={styles.title}>
          <a href="https://tr.wikipedia.org/wiki/2020" target="_blank">2020</a>'ye Bir Not Bırak!
        </h1>

        <FormAndList/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://votit.wtf/"
          target="_blank"
        >
          mrc &#xae;
        </a>
      </footer>
    </div>
  )
}
