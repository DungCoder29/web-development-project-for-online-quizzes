import { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import Timer from './components/Timer';
import { useNavigate, useParams } from 'react-router-dom';
import api from './api';

export default function ExamRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  // fake questions
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get(`/questions?subject_id=${id}`)
      .then((res) => {
        setQuestions(res.data || []);
      })
      .catch((err) => {
        console.error('Lỗi tải câu hỏi:', err);
      });
  }, [id]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  if (!questions[current]) return <div>Loading...</div>;

  const select = (idx) => setAnswers((s) => ({ ...s, [current]: idx }));

  const calculateScore = () => {
  let score = 0;

  questions.forEach((q, i) => {
    const correct =
      q.correct_answer === 'A' ? 0 :
      q.correct_answer === 'B' ? 1 :
      q.correct_answer === 'C' ? 2 : 3;

    if (answers[i] === correct) score += 1;
  });

  return score;
};

  const submit = () => {
    const score = calculateScore();
    navigate('/results', { state: { score, total: questions.length } });
  };

  const askConfirmSubmit = () => setShowConfirm(true);
  const cancelSubmit = () => setShowConfirm(false);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8">
          <QuestionCard
            question={questions[current]}
            selected={answers[current]}
            onSelect={select}
          />

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
              Trước
            </button>
            {current < questions.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrent((c) => c + 1)}>Tiếp</button>
            ) : (
              <button className="btn btn-success" onClick={askConfirmSubmit}>Nộp bài</button>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <Timer seconds={300} onExpire={submit} />
          <div className="card p-3">
            <h6>Thông tin</h6>
            <p>Môn: ID {id}</p>
            <p>Câu hiện tại: {current + 1} / {questions.length}</p>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="adc-modal-backdrop">
          <div className="adc-modal adc-modal--sm">
            <div className="adc-modal__header">
              <h3>Bạn có chắc chắn muốn nộp bài?</h3>
            </div>
            <div className="adc-modal__body">
              <p>Hành động này sẽ gửi bài và bạn không thể chỉnh sửa thêm nữa. Chọn "Xác nhận" để nộp hoặc "Hủy" để quay về trang đánh đáp án.</p>
            </div>
            <div className="adc-modal__footer">
              <button className="btn btn-outline-secondary" type="button" onClick={cancelSubmit}>
                Hủy
              </button>
              <button className="btn btn-success" type="button" onClick={submit}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
