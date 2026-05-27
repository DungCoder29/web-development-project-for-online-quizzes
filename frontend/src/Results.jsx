import { useLocation, Link } from 'react-router-dom';

export default function Results() {
  const { state } = useLocation();
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  return (
    <div className="container py-5 text-center">
      <h2>Kết quả</h2>
      <p className="display-6">{score} / {total}</p>
      <p className="text-success">Bạn đã hoàn thành bài thi.</p>
      <Link to="/subjects" className="btn btn-primary">Quay về danh sách môn</Link>
    </div>
  );
}
