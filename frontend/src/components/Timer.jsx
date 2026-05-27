import { useEffect, useState } from 'react';

export default function Timer({ seconds = 300, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire && onExpire();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, onExpire]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="card p-3 text-center mb-3">
      <strong>{mm}:{ss}</strong>
      <div className="small text-muted">Thời gian còn lại</div>
    </div>
  );
}
