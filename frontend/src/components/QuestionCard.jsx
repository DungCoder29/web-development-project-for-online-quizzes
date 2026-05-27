export default function QuestionCard({ question, onSelect, selected }) {
  return (
    <div className="card p-3 mb-3">
      <h5>{question.text}</h5>
      <div className="list-group list-group-flush mt-2">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            className={`list-group-item list-group-item-action ${selected === idx ? 'active' : ''}`}
            onClick={() => onSelect(idx)}
          >
            {String.fromCharCode(65 + idx)}. {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
