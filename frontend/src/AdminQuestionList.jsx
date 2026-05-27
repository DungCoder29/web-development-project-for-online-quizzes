import { useState, useMemo } from 'react';

const SUBJECTS = [
  { id: 1, name: 'Kiểm thử phần mềm' },
  { id: 2, name: 'Xây dựng phần mềm Web' },
  { id: 3, name: 'Lập trình C++' },
  { id: 4, name: 'Cơ sở dữ liệu' },
  { id: 5, name: 'Mạng máy tính' },
  { id: 6, name: 'Trí tuệ nhân tạo' },
];

const INIT_QUESTIONS = [
  { id: 1, subjectId: 1, content: 'Unit Testing là loại kiểm thử ở cấp độ nào?', optA: 'Hệ thống', optB: 'Đơn vị', optC: 'Tích hợp', optD: 'Chấp nhận', correct: 'B' },
  { id: 2, subjectId: 1, content: 'Black-box testing kiểm tra điều gì?', optA: 'Mã nguồn nội bộ', optB: 'Giao diện và chức năng đầu ra', optC: 'Hiệu năng', optD: 'Bảo mật', correct: 'B' },
  { id: 3, subjectId: 2, content: 'CSS Flexbox sử dụng thuộc tính nào để căn chỉnh theo trục chính?', optA: 'align-items', optB: 'justify-items', optC: 'justify-content', optD: 'align-content', correct: 'C' },
  { id: 4, subjectId: 2, content: 'React sử dụng kiến trúc nào cho giao diện người dùng?', optA: 'MVC', optB: 'MVVM', optC: 'Component-based', optD: 'Microservice', correct: 'C' },
  { id: 5, subjectId: 3, content: 'Trong C++, từ khóa nào dùng để kế thừa lớp?', optA: 'extends', optB: 'inherits', optC: ':',  optD: 'derive', correct: 'C' },
  { id: 6, subjectId: 4, content: 'SQL là viết tắt của từ gì?', optA: 'Simple Query Language', optB: 'Structured Query Language', optC: 'System Query Language', optD: 'Sequential Query Language', correct: 'B' },
  { id: 7, subjectId: 4, content: 'Câu lệnh nào dùng để lấy dữ liệu từ bảng?', optA: 'GET', optB: 'FETCH', optC: 'SELECT', optD: 'RETRIEVE', correct: 'C' },
  { id: 8, subjectId: 5, content: 'Mô hình OSI có bao nhiêu tầng?', optA: '5', optB: '6', optC: '7', optD: '8', correct: 'C' },
  { id: 9, subjectId: 6, content: 'Machine Learning là một nhánh của ngành nào?', optA: 'Data Science', optB: 'Artificial Intelligence', optC: 'Computer Vision', optD: 'Robotics', correct: 'B' },
];

const CORRECT_LABELS = { A: 'A', B: 'B', C: 'C', D: 'D' };

// ── Form Modal ─────────────────────────────────────────────────────────────
function QuestionFormModal({ mode, question, onClose, onSave }) {
  const [form, setForm] = useState({
    subjectId: question?.subjectId || SUBJECTS[0].id,
    content:   question?.content   || '',
    optA:      question?.optA      || '',
    optB:      question?.optB      || '',
    optC:      question?.optC      || '',
    optD:      question?.optD      || '',
    correct:   question?.correct   || 'A',
  });
  const [err, setErr] = useState('');

  const set = (key, val) => { setForm((f) => ({ ...f, [key]: val })); setErr(''); };

  const handleSave = () => {
    if (!form.content.trim()) { setErr('Vui lòng nhập nội dung câu hỏi.'); return; }
    if (!form.optA.trim() || !form.optB.trim() || !form.optC.trim() || !form.optD.trim()) {
      setErr('Vui lòng nhập đủ 4 đáp án A, B, C, D.'); return;
    }
    onSave({ ...form, subjectId: Number(form.subjectId) });
  };

  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal adc-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>{mode === 'add' ? '➕ Thêm câu hỏi mới' : '✏️ Chỉnh sửa câu hỏi'}</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          {err && <div className="adc-alert adc-alert--danger">{err}</div>}

          <div className="adc-form-field">
            <label>Môn thi *</label>
            <select className="adc-input" value={form.subjectId} onChange={(e) => set('subjectId', e.target.value)}>
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="adc-form-field">
            <label>Nội dung câu hỏi *</label>
            <textarea
              className="adc-input adc-textarea"
              rows={3}
              placeholder="Nhập nội dung câu hỏi..."
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
            />
          </div>

          <div className="adc-form-row">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <div key={opt} className={`adc-form-field adc-opt-field${form.correct === opt ? ' adc-opt-field--correct' : ''}`}>
                <label>
                  Đáp án {opt}
                  {form.correct === opt && <span className="adc-opt-correct-tag"> ✅ Đúng</span>}
                </label>
                <input
                  className="adc-input"
                  placeholder={`Nhập đáp án ${opt}...`}
                  value={form[`opt${opt}`]}
                  onChange={(e) => set(`opt${opt}`, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="adc-form-field">
            <label>Đáp án đúng *</label>
            <div className="adc-correct-choice">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`adc-choice-btn${form.correct === opt ? ' adc-choice-btn--active' : ''}`}
                  onClick={() => set('correct', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="adc-modal__footer">
          <button className="adc-btn adc-btn--ghost" onClick={onClose}>Hủy</button>
          <button className="adc-btn adc-btn--primary" onClick={handleSave}>
            {mode === 'add' ? 'Thêm câu hỏi' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ question, onClose, onConfirm }) {
  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal adc-modal--sm" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>🗑️ Xác nhận xóa</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          <p>Bạn có chắc muốn xóa câu hỏi này?</p>
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
function AdminQuestionList() {
  const [questions, setQuestions]   = useState(INIT_QUESTIONS);
  const [filterSubject, setFilter]  = useState('all');
  const [search, setSearch]         = useState('');
  const [formModal, setFormModal]   = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast]           = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => {
    let q = questions;
    if (filterSubject !== 'all') q = q.filter((x) => x.subjectId === Number(filterSubject));
    if (search.trim()) q = q.filter((x) => x.content.toLowerCase().includes(search.toLowerCase()));
    return q;
  }, [questions, filterSubject, search]);

  const getSubjectName = (id) => SUBJECTS.find((s) => s.id === id)?.name || '—';

  const handleSave = (data) => {
    if (formModal.mode === 'add') {
      const newId = questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
      setQuestions((prev) => [{ id: newId, ...data }, ...prev]);
      showToast('✅ Đã thêm câu hỏi mới!');
    } else {
      setQuestions((prev) =>
        prev.map((q) => (q.id === formModal.question.id ? { ...q, ...data } : q))
      );
      showToast('✅ Đã cập nhật câu hỏi!');
    }
    setFormModal(null);
  };

  const handleConfirmDelete = () => {
    setQuestions((prev) => prev.filter((q) => q.id !== confirmDel.id));
    showToast('🗑️ Đã xóa câu hỏi.');
    setConfirmDel(null);
  };

  return (
    <div className="adc-page">
      {toast && <div className="adc-toast">{toast}</div>}
      {formModal && (
        <QuestionFormModal
          mode={formModal.mode}
          question={formModal.question}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
      {confirmDel && (
        <ConfirmModal
          question={confirmDel}
          onClose={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Header */}
      <div className="adc-page-header">
        <div>
          <h1 className="adc-page-title">❓ Quản lý câu hỏi</h1>
          <p className="adc-page-desc">Ngân hàng câu hỏi: {questions.length} câu &nbsp;·&nbsp; {filtered.length} đang hiển thị</p>
        </div>
        <button className="adc-btn adc-btn--primary" onClick={() => setFormModal({ mode: 'add' })}>
          + Thêm câu hỏi
        </button>
      </div>

      {/* Toolbar */}
      <div className="adc-card" style={{ padding: '16px 20px' }}>
        <div className="adc-toolbar">
          <div className="adc-search-wrap" style={{ maxWidth: 360 }}>
            <span className="adc-search-icon">🔍</span>
            <input
              className="adc-search-input"
              placeholder="Tìm kiếm câu hỏi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="adc-search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
          <select
            className="adc-input adc-select"
            value={filterSubject}
            onChange={(e) => setFilter(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <option value="all">📚 Tất cả môn thi</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Question Cards */}
      <div className="adc-question-list">
        {filtered.length === 0 ? (
          <div className="adc-empty-state"><p>📭 Không tìm thấy câu hỏi phù hợp.</p></div>
        ) : (
          filtered.map((q, idx) => (
            <div key={q.id} className="adc-question-card">
              <div className="adc-question-card__header">
                <div className="adc-question-num">Câu {idx + 1}</div>
                <span className="adc-chip adc-chip--blue">{getSubjectName(q.subjectId)}</span>
                <div className="adc-question-card__actions">
                  <button className="adc-btn adc-btn--sm adc-btn--outline-blue" onClick={() => setFormModal({ mode: 'edit', question: q })}>
                    ✏️ Sửa
                  </button>
                  <button className="adc-btn adc-btn--sm adc-btn--outline-red" onClick={() => setConfirmDel(q)}>
                    🗑️
                  </button>
                </div>
              </div>

              <p className="adc-question-content">{q.content}</p>

              <div className="adc-options-grid">
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <div key={opt} className={`adc-option${q.correct === opt ? ' adc-option--correct' : ''}`}>
                    <span className="adc-option__label">{opt}</span>
                    <span>{q[`opt${opt}`]}</span>
                    {q.correct === opt && <span className="adc-option__check">✅</span>}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminQuestionList;
