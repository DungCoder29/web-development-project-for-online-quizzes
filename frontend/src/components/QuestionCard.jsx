export default function QuestionCard({ question, onSelect, selected }) {
  const options = [
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d,
  ];

  return (
    <div className="question-card card p-3 mb-3">
      <h5>{question.question}</h5>

      <div className="list-group list-group-flush mt-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            className={`list-group-item list-group-item-action question-option ${
              selected === idx ? 'active' : ''
            }`}
            onClick={() => onSelect(idx)}
          >
            <span className="option-label">
              Câu {String.fromCharCode(65 + idx)}
            </span>

            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}