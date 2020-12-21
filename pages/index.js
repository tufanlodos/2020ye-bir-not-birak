import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>2020'ye Bir Not Bırak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://tr.wikipedia.org/wiki/2020" target="_blank">2020</a>'ye Bir Not Bırak!
        </h1>

        <p className={styles.description}>
          Evet, son zamanların en "uzun" yılıydı. <br></br>
          Evet, tahmin edemeyeceğimiz şeyler yaşadık. <br></br>
          Ve bu yıla veda ediyoruz. <br></br>
          Sen de hemen notunu bırakarak bu yıla veda et.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Kimden</h3>
            <input className={styles.cardInput} type="text" placeholder="Yazmazsan varsayılan bir isim atanır"/>
            <br/>
            <br/>
            <h3>Not</h3>
            <textarea className={styles.cardInput} rows="3" placeholder="Dilediğin uzunlukta olabilir" />
            <div className={styles.cardSubmitButtonContainer}>
              <button className={styles.cardSubmitButton}>Gönder</button>
            </div>
          </div>

          <div className={styles.card}>
            <h3>2020zede90923921312 </h3>
            <p>Batsın bu dünya bitsin bu rüya aldatıp da gülene yazıklar olssuuun.</p>
          </div>

          <div className={styles.card}>
            <h3>2020zede90923921312 </h3>
            <p>Batsın bu dünya bitsin bu rüya aldatıp da gülene yazıklar olssuuun.</p>
          </div>

          <div className={styles.card}>
            <h3>2020zede90923921312 </h3>
            <p>Batsın bu dünya bitsin bu rüya aldatıp da gülene yazıklar olssuuun.</p>
          </div>
        </div>
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
