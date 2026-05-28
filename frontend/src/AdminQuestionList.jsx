import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

const SUBJECTS = [
  { id: 1, name: 'Toán học' },
  { id: 2, name: 'Vật lý' },
  { id: 3, name: 'Hóa học' },
  { id: 4, name: 'Tiếng Anh' },
  { id: 5, name: 'Lịch sử' },
  { id: 6, name: 'Sinh học' },
  { id: 7, name: 'Tin học' },
];

const INIT_QUESTIONS = [
  // Toán học (subjectId = 1)
  { id: 1, subjectId: 1, content: 'Một cộng một bằng mấy?', optA: '1', optB: '2', optC: '3', optD: '4', correct: 'B' },
  { id: 2, subjectId: 1, content: 'Phép tính 5 + 3 * 2 bằng mấy?', optA: '16', optB: '13', optC: '11', optD: '10', correct: 'C' },
  { id: 3, subjectId: 1, content: 'Căn bậc hai của 64 là mấy?', optA: '6', optB: '7', optC: '9', optD: '8', correct: 'D' },
  { id: 4, subjectId: 1, content: 'Đạo hàm của x^2 là gì?', optA: '2x', optB: 'x', optC: '2', optD: 'x^2', correct: 'A' },
  { id: 5, subjectId: 1, content: 'Giá trị của cos(0) là bao nhiêu?', optA: '0', optB: '1', optC: '-1', optD: '0.5', correct: 'B' },

  // Vật lý (subjectId = 2)
  { id: 6, subjectId: 2, content: 'Đơn vị đo cường độ dòng điện là gì?', optA: 'Ampe (A)', optB: 'Vôn (V)', optC: 'Oát (W)', optD: 'Ôm (Ω)', correct: 'A' },
  { id: 7, subjectId: 2, content: 'Vận tốc ánh sáng trong chân không là bao nhiêu?', optA: '300 km/s', optB: '3,000 km/s', optC: '300,000 km/s', optD: '30,000 km/s', correct: 'C' },
  { id: 8, subjectId: 2, content: 'Trọng lực của một vật được tính bằng công thức nào?', optA: 'P = m * g', optB: 'P = m / g', optC: 'P = F * s', optD: 'P = m * v', correct: 'A' },
  { id: 9, subjectId: 2, content: 'Hiện tượng cầu vồng xảy ra do hiện tượng gì của ánh sáng?', optA: 'Phản xạ ánh sáng', optB: 'Tán sắc ánh sáng', optC: 'Khúc xạ ánh sáng', optD: 'Giao thoa ánh sáng', correct: 'B' },
  { id: 10, subjectId: 2, content: 'Nhiệt độ sôi của nước ở áp suất tiêu chuẩn là bao nhiêu?', optA: '0 độ C', optB: '50 độ C', optC: '80 độ C', optD: '100 độ C', correct: 'D' },

  // Hóa học (subjectId = 3)
  { id: 11, subjectId: 3, content: 'Ký hiệu hóa học của vàng là gì?', optA: 'Ag', optB: 'Au', optC: 'Fe', optD: 'Cu', correct: 'B' },
  { id: 12, subjectId: 3, content: 'Nước được cấu tạo từ các nguyên tố nào?', optA: 'Hydro và Oxy', optB: 'Nitơ và Oxy', optC: 'Cacbon và Oxy', optD: 'Hydro và Nitơ', correct: 'A' },
  { id: 13, subjectId: 3, content: 'Axit sunfuric có công thức hóa học là gì?', optA: 'HCl', optB: 'HNO3', optC: 'H2SO4', optD: 'H2CO3', correct: 'C' },
  { id: 14, subjectId: 3, content: 'Chất nào sau đây được gọi là khí gas cười?', optA: 'N2O', optB: 'CO2', optC: 'CO', optD: 'NO2', correct: 'A' },
  { id: 15, subjectId: 3, content: 'Kim loại nào nhẹ nhất trong các kim loại sau?', optA: 'Nhôm', optB: 'Lithi', optC: 'Sắt', optD: 'Đồng', correct: 'B' },

  // Tiếng Anh (subjectId = 4)
  { id: 16, subjectId: 4, content: 'What is the past tense of "go"?', optA: 'goes', optB: 'goed', optC: 'went', optD: 'gone', correct: 'C' },
  { id: 17, subjectId: 4, content: 'Choose the correct spelling:', optA: 'Beautifull', optB: 'Beautiful', optC: 'Beatiful', optD: 'Bautifull', correct: 'B' },
  { id: 18, subjectId: 4, content: 'Complete the sentence: She ___ English very well.', optA: 'speaks', optB: 'speak', optC: 'speaking', optD: 'spoke', correct: 'A' },
  { id: 19, subjectId: 4, content: 'What is the antonym of "hot"?', optA: 'warm', optB: 'spicy', optC: 'fire', optD: 'cold', correct: 'D' },
  { id: 20, subjectId: 4, content: 'Complete: If it rains, we ___ at home.', optA: 'stayed', optB: 'stay', optC: 'will stay', optD: 'would stay', correct: 'C' },

  // Lịch sử (subjectId = 5)
  { id: 21, subjectId: 5, content: 'Chiến dịch Điện Biên Phủ kết thúc vào năm nào?', optA: '1945', optB: '1975', optC: '1954', optD: '1930', correct: 'C' },
  { id: 22, subjectId: 5, content: 'Ai là người đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH?', optA: 'Hồ Chí Minh', optB: 'Võ Nguyên Giáp', optC: 'Phan Bội Châu', optD: 'Trần Phú', correct: 'A' },
  { id: 23, subjectId: 5, content: 'Ai là vị vua cuối cùng của triều đại phong kiến Việt Nam?', optA: 'Gia Long', optB: 'Bảo Đại', optC: 'Tự Đức', optD: 'Khải Định', correct: 'B' },
  { id: 24, subjectId: 5, content: 'Cách mạng Tháng Tám diễn ra vào năm nào?', optA: '1930', optB: '1940', optC: '1950', optD: '1945', correct: 'D' },
  { id: 25, subjectId: 5, content: 'Trận Bạch Đằng Ngô Quyền đánh bại quân Nam Hán vào năm nào?', optA: '938', optB: '981', optC: '1288', optD: '1010', correct: 'A' },

  // Sinh học (subjectId = 6)
  { id: 26, subjectId: 6, content: 'Cơ quan nào trong cơ thể người lọc máu?', optA: 'Tim', optB: 'Thận', optC: 'Phổi', optD: 'Dạ dày', correct: 'B' },
  { id: 27, subjectId: 6, content: 'Nhóm máu nào được gọi là nhóm máu chuyên cho?', optA: 'Nhóm máu O', optB: 'Nhóm máu A', optC: 'Nhóm máu B', optD: 'Nhóm máu AB', correct: 'A' },
  { id: 28, subjectId: 6, content: 'Chất diệp lục trong cây có màu gì?', optA: 'Màu đỏ', optB: 'Màu vàng', optC: 'Màu xanh lá cây', optD: 'Không màu', correct: 'C' },
  { id: 29, subjectId: 6, content: 'Xương dài nhất trong cơ thể người là xương nào?', optA: 'Xương sườn', optB: 'Xương cánh tay', optC: 'Xương cột sống', optD: 'Xương đùi', correct: 'D' },
  { id: 30, subjectId: 6, content: 'Thuyết tiến hóa được đề xuất bởi nhà khoa học nào?', optA: 'Newton', optB: 'Charles Darwin', optC: 'Einstein', optD: 'Mendeleev', correct: 'B' },

  // Tin học (subjectId = 7)
  { id: 31, subjectId: 7, content: 'Định dạng file nào sau đây là file ảnh?', optA: '.png', optB: '.mp3', optC: '.exe', optD: '.txt', correct: 'A' },
  { id: 32, subjectId: 7, content: 'RAM là viết tắt của từ gì?', optA: 'Read Access Memory', optB: 'Rapid Access Memory', optC: 'Random Access Memory', optD: 'Real Active Memory', correct: 'C' },
  { id: 33, subjectId: 7, content: 'Trong lập trình, vòng lặp nào lặp với số lần biết trước?', optA: 'while', optB: 'for', optC: 'do-while', optD: 'foreach', correct: 'B' },
  { id: 34, subjectId: 7, content: 'Giao thức HTTP chạy mặc định trên cổng nào?', optA: '443', optB: '21', optC: '22', optD: '80', correct: 'D' },
  { id: 35, subjectId: 7, content: 'Đâu là một ngôn ngữ lập trình phổ biến?', optA: 'Python', optB: 'HTML', optC: 'CSS', optD: 'JSON', correct: 'A' },
];

const CORRECT_LABELS = { A: 'A', B: 'B', C: 'C', D: 'D' };

// ── Form Modal ─────────────────────────────────────────────────────────────
function QuestionFormModal({ mode, question, onClose, onSave, subjects }) {
  const [form, setForm] = useState({
    subjectId: question?.subjectId || (subjects.length > 0 ? subjects[0].id : ''),
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
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
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
  const [questions, setQuestions]   = useState([]);
  const [subjects, setSubjects]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filterSubject, setFilter]  = useState('all');
  const [search, setSearch]         = useState('');
  const [formModal, setFormModal]   = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast]           = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchQuestionsAndSubjects = () => {
    Promise.all([
      axios.get('/api/subjects'),
      axios.get('/api/admin/questions')
    ])
      .then(([subjectsRes, questionsRes]) => {
        setSubjects(subjectsRes.data.data || []);
        const mappedQuestions = (questionsRes.data.data || []).map(q => ({
          id: q.id,
          subjectId: q.subject_id,
          content: q.question,
          optA: q.option_a,
          optB: q.option_b,
          optC: q.option_c,
          optD: q.option_d,
          correct: q.correct_answer
        }));
        setQuestions(mappedQuestions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        showToast('❌ Lỗi khi tải dữ liệu câu hỏi.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestionsAndSubjects();
  }, []);

  const filtered = useMemo(() => {
    let q = questions;
    if (filterSubject !== 'all') q = q.filter((x) => x.subjectId === Number(filterSubject));
    if (search.trim()) q = q.filter((x) => x.content.toLowerCase().includes(search.toLowerCase()));
    return q;
  }, [questions, filterSubject, search]);

  const getSubjectName = (id) => subjects.find((s) => s.id === id)?.name || '—';

  const handleSave = (data) => {
    const payload = {
      subject_id: data.subjectId,
      question: data.content,
      option_a: data.optA,
      option_b: data.optB,
      option_c: data.optC,
      option_d: data.optD,
      correct_answer: data.correct
    };

    if (formModal.mode === 'add') {
      axios.post('/api/questions', payload)
        .then(() => {
          showToast('✅ Đã thêm câu hỏi mới!');
          fetchQuestionsAndSubjects();
        })
        .catch((err) => {
          console.error(err);
          showToast('❌ Thêm câu hỏi thất bại.');
        });
    } else {
      axios.put(`/api/questions/${formModal.question.id}`, payload)
        .then(() => {
          showToast('✅ Đã cập nhật câu hỏi!');
          fetchQuestionsAndSubjects();
        })
        .catch((err) => {
          console.error(err);
          showToast('❌ Cập nhật câu hỏi thất bại.');
        });
    }
    setFormModal(null);
  };

  const handleConfirmDelete = () => {
    axios.delete(`/api/questions/${confirmDel.id}`)
      .then(() => {
        showToast('🗑️ Đã xóa câu hỏi.');
        fetchQuestionsAndSubjects();
      })
      .catch((err) => {
        console.error(err);
        showToast('❌ Xóa câu hỏi thất bại.');
      });
    setConfirmDel(null);
  };

  if (loading) {
    return (
      <div className="adc-loading">
        <div className="adc-spinner" />
        <p>Đang tải danh sách câu hỏi...</p>
      </div>
    );
  }

  return (
    <div className="adc-page">
      {toast && <div className="adc-toast">{toast}</div>}
      {formModal && (
        <QuestionFormModal
          mode={formModal.mode}
          question={formModal.question}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
          subjects={subjects}
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
            {subjects.map((s) => (
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
