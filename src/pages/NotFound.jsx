import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page">
    <header className="hero">
      <div>
        <p className="eyebrow">404</p>
        <h1>ページが見つかりません</h1>
        <p className="lead">
          指定されたページは存在しないか、移動した可能性があります。URLをご確認ください。
        </p>
      </div>
      <div className="hero-actions">
        <Link className="button primary" to="/">
          トップへ戻る
        </Link>
      </div>
    </header>
  </div>
);

export default NotFound;
