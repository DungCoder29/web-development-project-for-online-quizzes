import { useState, useEffect } from 'react';
import axios from 'axios';

const SUBJECT_ICONS = ['📘', '📗', '📙', '📕', '📓', '📔', '📒'];

const INIT_SUBJECTS = [
  { id: 1, name: 'Toán học',   desc: 'Đề kiểm tra chương 1-3', duration: 45, questions: 5, active: true },
  { id: 2, name: 'Vật lý',     desc: 'Đề giữa kỳ', duration: 45, questions: 5, active: true },
  { id: 3, name: 'Hóa học',    desc: 'Ngân hàng câu hỏi cơ bản', duration: 45, questions: 5, active: true },
  { id: 4, name: 'Tiếng Anh',  desc: 'Đề thi học kỳ', duration: 60, questions: 5, active: true },
  { id: 5, name: 'Lịch sử',    desc: 'Đề ôn tập tổng hợp', duration: 45, questions: 5, active: true },
  { id: 6, name: 'Sinh học',   desc: 'Câu hỏi bài tập lớn', duration: 45, questions: 5, active: true },
  { id: 7, name: 'Tin học',    desc: 'Kiểm tra kiến thức lập trình', duration: 45, questions: 5, active: true },
];

// ── Form Modal ─────────────────────────────────────────────────────────────
function SubjectFormModal({ mode, subject, onClose, onSave }) {
  const [form, setForm] = useState({
    name:      subject?.name      || '',
    desc:      subject?.desc      || '',
    duration:  subject?.duration  || 45,
    questions: subject?.questions || 40,
    active:    subject?.active    ?? true,
  });
  const [err, setErr] = useState('');

  const set = (key, val) => { setForm((f) => ({ ...f, [key]: val })); setErr(''); };

  const handleSave = () => {
    if (!form.name.trim()) { setErr('Vui lòng nhập tên môn thi.'); return; }
    if (!form.desc.trim()) { setErr('Vui lòng nhập mô tả môn thi.'); return; }
    if (Number(form.duration) < 1) { setErr('Thời gian phải lớn hơn 0.'); return; }
    if (Number(form.questions) < 1) { setErr('Số câu hỏi phải lớn hơn 0.'); return; }
    onSave({ ...form, duration: Number(form.duration), questions: Number(form.questions) });
  };

  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>{mode === 'add' ? '➕ Thêm môn thi mới' : '✏️ Chỉnh sửa môn thi'}</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          {err && <div className="adc-alert adc-alert--danger">{err}</div>}

          <div className="adc-form-field">
            <label>Tên môn thi *</label>
            <input className="adc-input" placeholder="VD: Lập trình Java..." value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="adc-form-field">
            <label>Mô tả</label>
            <textarea className="adc-input adc-textarea" placeholder="Mô tả ngắn về nội dung môn thi..." value={form.desc} onChange={(e) => set('desc', e.target.value)} rows={3} />
          </div>
          <div className="adc-form-row">
            <div className="adc-form-field">
              <label>Thời gian (phút) *</label>
              <input className="adc-input" type="number" min="1" value={form.duration} onChange={(e) => set('duration', e.target.value)} />
            </div>
            <div className="adc-form-field">
              <label>Số câu hỏi *</label>
              <input className="adc-input" type="number" min="1" value={form.questions} onChange={(e) => set('questions', e.target.value)} />
            </div>
          </div>
          <div className="adc-form-field">
            <label>Trạng thái</label>
            <div className="adc-toggle-wrap">
              <label className="adc-toggle">
                <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} />
                <span className="adc-toggle__slider" />
              </label>
              <span>{form.active ? 'Đang hoạt động' : 'Tạm ẩn'}</span>
            </div>
          </div>
        </div>
        <div className="adc-modal__footer">
          <button className="adc-btn adc-btn--ghost" onClick={onClose}>Hủy</button>
          <button className="adc-btn adc-btn--primary" onClick={handleSave}>
            {mode === 'add' ? 'Thêm môn thi' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ subject, onClose, onConfirm }) {
  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal adc-modal--sm" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>🗑️ Xác nhận xóa</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          <p>Bạn có chắc muốn xóa môn thi <strong>{subject.name}</strong>?</p>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 8 }}>Hành động này không thể hoàn tác.</p>
        </div>
        <div className="adc-modal__footer">
          <button className="adc-btn adc-btn--ghost" onClick={onClose}>Hủy</button>
          <button className="adc-btn adc-btn--danger" onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
}

// ── Component chính ────────────────────────────────────────────────────────
function AdminSubjectList() {
  const [subjects, setSubjects]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [formModal, setFormModal]   = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast]           = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchSubjects = () => {
    axios.get('/api/subjects')
      .then((res) => {
        const mapped = (res.data.data || []).map(s => ({
          ...s,
          questions: s.questions_count ?? 0
        }));
        setSubjects(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        showToast('❌ Lỗi khi tải danh sách môn thi.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filtered = subjects.filter(
    (s) =>
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.desc || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data) => {
    const payload = {
      name: data.name,
      desc: data.desc,
      duration: Number(data.duration),
      active: data.active
    };

    if (formModal.mode === 'add') {
      axios.post('/api/subjects', payload)
        .then(() => {
          showToast('✅ Đã thêm môn thi mới!');
          fetchSubjects();
        })
        .catch((err) => {
          console.error(err);
          showToast('❌ Thêm môn thi thất bại.');
        });
    } else {
      axios.put(`/api/subjects/${formModal.subject.id}`, payload)
        .then(() => {
          showToast('✅ Đã cập nhật thông tin môn thi!');
          fetchSubjects();
        })
        .catch((err) => {
          console.error(err);
          showToast('❌ Cập nhật môn thi thất bại.');
        });
    }
    setFormModal(null);
  };

  const handleConfirmDelete = () => {
    axios.delete(`/api/subjects/${confirmDel.id}`)
      .then(() => {
        showToast(`🗑️ Đã xóa môn thi "${confirmDel.name}".`);
        fetchSubjects();
      })
      .catch((err) => {
        console.error(err);
        showToast('❌ Xóa môn thi thất bại.');
      });
    setConfirmDel(null);
  };

  const toggleActive = (id) => {
    const target = subjects.find(s => s.id === id);
    if (!target) return;

    axios.put(`/api/subjects/${id}`, {
      name: target.name,
      desc: target.desc,
      duration: target.duration,
      active: !target.active
    })
      .then(() => {
        fetchSubjects();
      })
      .catch((err) => {
        console.error(err);
        showToast('❌ Không thể đổi trạng thái môn thi.');
      });
  };

  if (loading) {
    return (
      <div className="adc-loading">
        <div className="adc-spinner" />
        <p>Đang tải danh sách môn thi...</p>
      </div>
    );
  }

  return (
    <div className="adc-page">
      {toast && <div className="adc-toast">{toast}</div>}
      {formModal && (
        <SubjectFormModal
          mode={formModal.mode}
          subject={formModal.subject}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
      {confirmDel && (
        <ConfirmModal
          subject={confirmDel}
          onClose={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Header */}
      <div className="adc-page-header">
        <div>
          <h1 className="adc-page-title">📚 Quản lý môn thi</h1>
          <p className="adc-page-desc">
            {subjects.filter((s) => s.active).length} môn đang hoạt động &nbsp;·&nbsp; {subjects.filter((s) => !s.active).length} môn tạm ẩn
          </p>
        </div>
        <button className="adc-btn adc-btn--primary" onClick={() => setFormModal({ mode: 'add' })}>
          + Thêm môn thi
        </button>
      </div>

      {/* Search */}
      <div className="adc-card" style={{ padding: '16px 20px' }}>
        <div className="adc-search-wrap" style={{ maxWidth: 420 }}>
          <span className="adc-search-icon">🔍</span>
          <input
            className="adc-search-input"
            placeholder="Tìm kiếm môn thi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button className="adc-search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="adc-subject-grid">
        {filtered.length === 0 ? (
          <div className="adc-empty-state">
            <p>📭 Không tìm thấy môn thi phù hợp.</p>
          </div>
        ) : (
          filtered.map((subject, idx) => (
            <div key={subject.id} className={`adc-subject-card${!subject.active ? ' adc-subject-card--inactive' : ''}`}>
              <div className="adc-subject-card__head">
                <span className="adc-subject-card__icon">{SUBJECT_ICONS[idx % SUBJECT_ICONS.length]}</span>
                <div>
                  <span className={`adc-chip ${subject.active ? 'adc-chip--green' : 'adc-chip--gray'}`}>
                    {subject.active ? '● Hoạt động' : '○ Tạm ẩn'}
                  </span>
                </div>
              </div>

              <h3 className="adc-subject-card__name">{subject.name}</h3>
              <p className="adc-subject-card__desc">{subject.desc}</p>

              <div className="adc-subject-card__meta">
                <span>⏱ {subject.duration} phút</span>
                <span>📝 {subject.questions} câu</span>
                <span>🆔 #{subject.id}</span>
              </div>

              <div className="adc-subject-card__actions">
                <button
                  className="adc-btn adc-btn--sm adc-btn--ghost"
                  onClick={() => toggleActive(subject.id)}
                >
                  {subject.active ? '⏸ Ẩn' : '▶ Bật'}
                </button>
                <button
                  className="adc-btn adc-btn--sm adc-btn--outline-blue"
                  onClick={() => setFormModal({ mode: 'edit', subject })}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="adc-btn adc-btn--sm adc-btn--outline-red"
                  onClick={() => setConfirmDel(subject)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminSubjectList;
