import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    axios.get('/api/subjects')
      .then(res => {
        const mapped = (res.data.data || [])
          .filter(s => s.active)
          .map(s => ({
            id: s.id,
            title: s.name,
            description: s.desc || '',
            duration: s.duration,
            questionsCount: s.questions_count || 0
          }));
        setSubjects(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi tải môn thi:', err);
        setLoading(false);
      });
  }, []);

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
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        // Numeric sort if id
        if (sortBy === 'id') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // String sort for others
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [subjects, search, sortBy, sortOrder]);

  const pageCount = Math.ceil(filteredSubjects.length / pageSize);
  const currentPage = Math.min(page, pageCount) || 1;

  const pagedSubjects = filteredSubjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goPage = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Đang tải danh sách môn học...</p>
      </div>
    );
  }

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
                  <span className="text-muted small">{s.duration ? `${s.duration}p` : '45p'}</span>
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
