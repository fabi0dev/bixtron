import { useNavigate } from "react-router";
import "./style.scss";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div id="landing-container">
      <div className="content">
        <div className="hero">
          <h1 className="title">
            <span className="gradient-text">Bixtron</span>
          </h1>
          <p className="subtitle">
            Um robô interativo com expressões e reações únicas
          </p>
          <p className="description">
            Explore emoções, movimentos e interações em tempo real com o Bixtron
          </p>
        </div>

        <button className="cta-button" onClick={() => navigate("/home")}>
          <span className="button-text">Ver o Bixtron</span>
          <svg className="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
    </div>
  );
}
