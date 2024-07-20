import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
// import "./form.css";

const amenities = ['Fitness Center', 'Parking', 'Playground', 'Spa', 'Pools'];

const StarRating = ({ rating, setRating, hover, setHover }) => (
  <div>
    {[...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index}>
          <input 
            type="radio" 
            value={index} 
            onClick={() => setRating(currentRating)}
          />
          <FaStar 
            size={20}
            color={currentRating <= (hover || rating) ? "green" : "grey"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    })}
  </div>
);

StarRating.propTypes = {
    // label: PropTypes.string,
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    hover: PropTypes.number,
    setHover: PropTypes.func.isRequired,
};
  

const RatingPage = () => {
  const [ratings, setRatings] = useState({});
  // const [hover, setHover] = useState({});
  const [overallRatings, setOverallRatings] = useState('');
  const [opinions, setOpinions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState('');
  const [newOpinion, setNewOpinion] = useState('');
  const [isEditing, setIsEditing] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setShowPopup(true);
    setIsEditing(false);
  };

  const handleEditOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setNewOpinion(opinions[amenity]);
    setShowPopup(true);
    setIsEditing(true);
  };

  const handleSaveOpinion = () => {
    setOpinions({ ...opinions, [currentAmenity]: newOpinion });
    setShowPopup(false);
    setNewOpinion('');
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setFormSubmitted(true);
    console.log('Ratings:', ratings);
    console.log('Opinions:', opinions);
    ratings("");
  };

  return (
    <section className="reviews">
      <h2>Apartment Amenities Review</h2>
      <form onSubmit={handleSubmit} id="review-form">
        <h2>Give your ratings</h2>
        {/* <StarRating 
            rating={ratings} 
            setRating={ratings} 
            hover={hover}
            setHover={hover}
        /> */}
        <p>write your feedback</p>
        <textarea 
            value={overallRatings}
            onChange={(e) => setOverallRatings(e.target.value)}
            placeholder="enter review"
        />
        {amenities.map((amenity) => (
          <div key={amenity} className="form-review">
            <label>{amenity}</label>
            <StarRating 
              rating={ratings[amenity] || 0} 
              setRating={(rating) => setRatings({ ...ratings, [amenity]: rating })} 
              hover={null} 
              setHover={null} 
            />
            {opinions[amenity] ? (
              <>
                <span>{opinions[amenity]}</span>
                <button type="button" onClick={() => handleEditOpinion(amenity)}>Edit Opinion</button>
              </>
            ) : (
              <button type="button" onClick={() => handleAddOpinion(amenity)}>Add Your Opinion</button>
            )}
          </div>
        ))}
        <div className="btn-submit">
          <button type="submit">Submit</button>
        </div>
      </form>

      {showPopup && (
        <div className="popup">
          <label>{currentAmenity}</label>
          <textarea 
            value={newOpinion} 
            onChange={(e) => setNewOpinion(e.target.value)} 
          />
          <button onClick={handleSaveOpinion}>{isEditing ? 'Update' : 'Save'}</button>
        </div>
      )}

      {/* {formSubmitted && (
        <div className="show-reviews">
          {amenities.map((amenity, index) => (
            <div key={index}>
              <h3>{amenity}</h3>
              <p>Rating: {ratings[amenity]}</p>
              <p>Opinion: {opinions[amenity]}</p>
            </div>
          ))}
        </div>
      )} */}
    </section>
  );
};

export default RatingPage;
