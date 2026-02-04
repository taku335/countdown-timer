import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page">
    <header className="hero">
      <div>
        <p className="eyebrow">404</p>
        <h1>ページが見つかりません</h1>
        <p className="lead">指定されたページは存在しない可能性があります。</p>
        <Link className="text-link" to="/">
          タイマーへ戻る
        </Link>
      </div>
    </header>
  </div>
);

export default NotFound;
