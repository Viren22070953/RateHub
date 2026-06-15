import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="back-button-wrap">
      <button className="back-button" type="button" onClick={handleBack}>
        <ArrowLeft size={16} />
        Back
      </button>
    </div>
  );
};

export default BackButton;
