import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Subjects() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const subjects = [
    { id: 1, title: 'Toán học', description: 'Đề kiểm tra chương 1-3' },
    { id: 2, title: 'Vật lý', description: 'Đề giữa kỳ' },
    { id: 3, title: 'Hóa học', description: 'Ngân hàng câu hỏi cơ bản' },
    { id: 4, title: 'Tiếng Anh', description: 'Đề thi học kỳ' },
    { id: 5, title: 'Lịch sử', description: 'Đề ôn tập tổng hợp' },
    { id: 6, title: 'Sinh học', description: 'Câu hỏi bài tập lớn' },
    { id: 7, title: 'Tin học', description: 'Kiểm tra kiến thức lập trình' },
  ];

  const filteredSubjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    return subjects
      .filter((item) => {
        if (!term) return true;
        return (
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.id.toString().includes(term)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortBy].toString().toLowerCase();
        const bValue = b[sortBy].toString().toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [search, sortBy, sortOrder]);

  const pageCount = Math.ceil(filteredSubjects.length / pageSize);
  const currentPage = Math.min(page, pageCount) || 1;

  const pagedSubjects = filteredSubjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goPage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 className="mb-1">Các môn thi</h2>
          <p className="text-muted mb-0">Tìm kiếm, lọc và sắp xếp danh sách môn thi.</p>
        </div>

        <div className="d-flex gap-2 flex-column flex-sm-row w-100 w-md-auto">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">🔎</span>
            <input
              type="search"
              className="form-control"
              value={search}
              placeholder="Tìm môn hoặc nội dung..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="title">Sắp xếp theo tên</option>
            <option value="id">Sắp xếp theo ID</option>
          </select>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      <div className="row g-3">
        {pagedSubjects.length > 0 ? (
          pagedSubjects.map((s) => (
            <div className="col-md-4" key={s.id}>
              <div className="subject-card p-3 h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="subject-badge">{s.id}</span>
                  <span className="text-muted small">{s.title.includes('Toán') ? '45p' : '60p'}</span>
                </div>
                <h5 className="mb-2 subject-title">{s.title}</h5>
                <p className="text-muted flex-grow-1 subject-meta">{s.description}</p>
                <div className="d-flex justify-content-center mt-2">
                  <Link to={`/exam/${s.id}`} className="primary-btn text-center" style={{width:'auto', minWidth:'140px'}}>
                    Bắt đầu
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning mb-0">Không tìm thấy môn thi phù hợp.</div>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav className="mt-4" aria-label="Pagination subjects">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goPage(currentPage - 1)} disabled={currentPage === 1}>
                Trước
              </button>
            </li>
            {Array.from({ length: pageCount }, (_, idx) => (
              <li className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`} key={idx}>
                <button className="page-link" onClick={() => goPage(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goPage(currentPage + 1)} disabled={currentPage === pageCount}>
                Sau
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
