import landing_img from "../imgs/landing-pic.jpg";
import "./landing.css";

function LandingPage({
  onLoginClick,
  onSignUpClick,
}: {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}) {
  return (
    <div className="landing-page">
      <img src={landing_img} id="landing-img" />
      <div className="landing-text">
        <h2 id="landing-title-one">Welcome to</h2>
        <h1 id="landing-title-two">Photoverse</h1>
        <p>Connecting photographers with clients seamlessly.</p>
      </div>
      <div className="landing-buttons">
        <button onClick={onLoginClick} className="landing-button">
          LOG IN
        </button>
        <button onClick={onSignUpClick} className="landing-button">
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
