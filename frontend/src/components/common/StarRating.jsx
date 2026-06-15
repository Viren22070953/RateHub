import { useState } from "react";

const StarRating = ({ value = 0, onChange, readonly = false, size = 22 }) => {
  const [hovered, setHovered] = useState(0);
  const activeValue = hovered || Number(value) || 0;

  return (
    <div className="stars" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className={`star-button ${star <= activeValue ? "star-active" : ""}`}
          disabled={readonly}
          key={star}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          type="button"
        >
          <span style={{ fontSize: size }}>★</span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
