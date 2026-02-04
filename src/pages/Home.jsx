import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page">
    <header className="hero hero-home">
      <div className="hero-content">
        <span className="badge">デモ版 / 社内利用想定</span>
        <h1>カウントダウンタイマー</h1>
        <p className="lead">
          研修や会議の進行にあわせて、終了時刻と残り時間を見やすく表示するシンプルなタイマーです。
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/time">
            タイマーを開く
          </Link>
          <Link className="button ghost" to="/time">
            クイックデモ
          </Link>
        </div>
      </div>
      <div className="hero-metrics">
        <div className="metric-card">
          <p>視認性</p>
          <strong>大きな残り表示</strong>
        </div>
        <div className="metric-card">
          <p>共有性</p>
          <strong>リンクで即共有</strong>
        </div>
        <div className="metric-card">
          <p>柔軟性</p>
          <strong>テーマを切替</strong>
        </div>
      </div>
    </header>

    <section className="card grid-two">
      <div>
        <h2 className="section-title">主な機能</h2>
        <ul className="feature-list">
          <li>終了時刻の入力とクイック設定に対応。</li>
          <li>現在時刻・終了時刻・残り時間を同時に表示。</li>
          <li>終了時の色合いを選んで会場の雰囲気に合わせる。</li>
        </ul>
      </div>
      <div className="note">
        <h3 className="section-title">運用メモ</h3>
        <p>
          GitHub Pages での公開を想定し、ハッシュルーティングで構成しています。
          共有リンクは <code>#/time</code> 付きで案内してください。
        </p>
      </div>
    </section>
  </div>
);

export default Home;
