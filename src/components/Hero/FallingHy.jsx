import "./FallingHy.css";

function FallingHy() {
  return (
    <div className="global-hy-container">
      {[...Array(18)].map((_, i) => (
        <span key={i} className={`global-hy hy-${i}`}>
          囍
        </span>
      ))}
    </div>
  );
}

export default FallingHy;
