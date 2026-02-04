import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const colorOptions = [
  { value: 'sunset', label: '夕焼け (橙)', className: 'theme-sunset' },
  { value: 'ocean', label: '海 (青)', className: 'theme-ocean' },
  { value: 'forest', label: '森 (緑)', className: 'theme-forest' },
  { value: 'midnight', label: '夜 (紺)', className: 'theme-midnight' }
];

const pad = (value) => String(value).padStart(2, '0');

const formatTime = (date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const formatShort = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const buildEndDate = (timeString) => {
  if (!timeString) return null;
  const [hour, minute] = timeString.split(':').map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  const end = new Date();
  end.setHours(hour, minute, 0, 0);
  return end;
};

const toDuration = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Timer = () => {
  const [title, setTitle] = useState('研修セッション');
  const [theme, setTheme] = useState(colorOptions[0].value);
  const [endTime, setEndTime] = useState('');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const initial = new Date();
    initial.setMinutes(initial.getMinutes() + 30);
    setEndTime(formatShort(initial));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const endDate = useMemo(() => buildEndDate(endTime), [endTime]);

  const remainingMs = endDate ? endDate.getTime() - now.getTime() : 0;
  const remainingLabel = endDate ? toDuration(remainingMs) : '--:--:--';

  const handleQuickSet = (minutes) => {
    const target = new Date();
    target.setMinutes(target.getMinutes() + minutes);
    setEndTime(formatShort(target));
  };

  const themeClass = colorOptions.find((option) => option.value === theme)?.className;

  return (
    <div className={`page ${themeClass}`}>
      <header className="hero">
        <div>
          <p className="eyebrow">研修用タイマー</p>
          <h1>時刻通知ビュー</h1>
          <p className="lead">
            現在時刻と終了時刻を同時に表示し、残り時間を1秒ごとに更新します。
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button ghost" to="/">
            トップへ戻る
          </Link>
        </div>
      </header>

      <section className="card display">
        <div className="display-header">
          <label>
            タイトル
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="例: 午後研修"
            />
          </label>
          <p className="demo-note">※ 本画面はデモです。データは保存されません。</p>
        </div>
        <h2 className="display-title">{title || 'タイトル未設定'}</h2>
        <div className="time-grid">
          <div className="time-card">
            <span>現在時刻</span>
            <strong>{formatTime(now)}</strong>
          </div>
          <div className="time-card">
            <span>終了時刻</span>
            <strong>{endDate ? formatShort(endDate) : '--:--'}</strong>
          </div>
          <div className="time-card highlight">
            <span>残り時間</span>
            <strong>{remainingLabel}</strong>
          </div>
        </div>
      </section>

      <section className="card form">
        <div className="form-block">
          <label>
            終了時刻
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </label>
          <div className="quick-buttons">
            {[10, 15, 30, 60].map((minutes) => (
              <button key={minutes} type="button" onClick={() => handleQuickSet(minutes)}>
                {minutes}分後
              </button>
            ))}
          </div>
        </div>
        <div className="form-block">
          <label>
            終了時の色合い
            <select value={theme} onChange={(event) => setTheme(event.target.value)}>
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <p className="hint">終了後の画面配色のイメージを選択できます。</p>
        </div>
      </section>
    </div>
  );
};

export default Timer;
