import { useState } from "react";
import toast from "react-hot-toast";
import { submitRating, updateRating } from "../../api/ratings";
import StarRating from "../common/StarRating";

const StoreCard = ({ store, onRatingUpdate }) => {
  const [selected, setSelected] = useState(Number(store.user_rating) || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selected) {
      toast.error("Please select a rating from 1 to 5.");
      return;
    }

    setSaving(true);
    try {
      if (store.user_rating_id) {
        await updateRating(store.user_rating_id, { rating: selected });
        toast.success("Rating updated.");
      } else {
        await submitRating({ store_id: store.id, rating: selected });
        toast.success("Rating submitted.");
      }
      onRatingUpdate?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save rating.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="store-card">
      <div>
        <div className="store-card-header">
          <div>
            <h2>{store.name}</h2>
            <p>{store.address}</p>
          </div>
          <span className="rating-pill">{store.avg_rating || "New"}</span>
        </div>

        <dl className="store-meta">
          <div>
            <dt>Overall Rating</dt>
            <dd>{store.avg_rating || "No ratings yet"}</dd>
          </div>
          <div>
            <dt>Your Rating</dt>
            <dd>{store.user_rating ? <StarRating value={store.user_rating} readonly size={18} /> : "Not rated"}</dd>
          </div>
        </dl>
      </div>

      <div className="rating-editor">
        <StarRating value={selected} onChange={setSelected} />
        <button className="button button-primary" disabled={saving || !selected} type="button" onClick={handleSave}>
          {saving ? "Saving..." : store.user_rating_id ? "Modify rating" : "Submit rating"}
        </button>
      </div>
    </article>
  );
};

export default StoreCard;
