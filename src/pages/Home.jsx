import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page">
    <header className="hero">
      <div>
        <p className="eyebrow">デモ版 / 社内利用想定</p>
        <h1>カウントダウンタイマー</h1>
        <p className="lead">
          研修や会議の進行にあわせて、終了時刻と残り時間を見やすく表示するシンプルなタイマーです。
        </p>
      </div>
      <div className="hero-actions">
        <Link className="button primary" to="/time">
          タイマーを開く
        </Link>
      </div>
    </header>

    <section className="card grid-two">
      <div>
        <h2>主な機能</h2>
        <ul className="feature-list">
          <li>終了時刻の入力とクイック設定に対応。</li>
          <li>現在時刻・終了時刻・残り時間を同時に表示。</li>
          <li>終了時の色合いを選んで会場の雰囲気に合わせる。</li>
        </ul>
      </div>
      <div className="note">
        <h3>運用メモ</h3>
        <p>
          GitHub Pages での公開を想定し、ハッシュルーティングで構成しています。
          共有リンクは <code>#/time</code> 付きで案内してください。
        </p>
      </div>
    </section>
  </div>
);

export default Home;
