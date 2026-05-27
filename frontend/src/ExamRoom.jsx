import { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import Timer from './components/Timer';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExamRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  // fake questions
  const questions = [
    { id: 1, text: '1 + 1 = ?', options: ['1', '2', '3', '4'], answer: 1 },
    { id: 2, text: '2 + 2 = ?', options: ['2', '3', '4', '5'], answer: 2 },
    { id: 3, text: '3 + 3 = ?', options: ['5', '6', '7', '8'], answer: 1 },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const select = (idx) => setAnswers((s) => ({ ...s, [current]: idx }));

  const submit = () => {
    // calculate score (fake)
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) score += 1; });
    // pass score via state (simple)
    navigate('/results', { state: { score, total: questions.length } });
  };

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
              <button className="btn btn-success" onClick={submit}>Nộp bài</button>
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
    </div>
  );
}
