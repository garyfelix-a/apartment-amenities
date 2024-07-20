import "./form.css";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";

//array of amenities for the form
const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];

//child component for star rating system. It takes rating, setRating, hover, and setHover as props
const StarRating = ({ rating, setRating, hover, setHover }) => (
  <div>
    {/* creating a array of 5 stars */}
    {[...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index} className="bg-black">
          <input
            type="radio"
            value={index}
            className="radio"
            onClick={() => setRating(currentRating)}
          />
          <FaStar
            className="star"
            size={18}
            color={currentRating <= (hover || rating) ? "yellow" : "white"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    })}
  </div>
);

//validation for props - defining its type and mentioning required or not
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  hover: PropTypes.number,
  setHover: PropTypes.func.isRequired,
};

//parent funtion contains reviews form
const Form = () => {
  //useState hooks for ratings, hover, opinions, popup, current amenity, new opinion, edit option
  const [ratings, setRatings] = useState({});
  const [overallRating, setOverallRating] = useState("");
  const [overallStarRating, setOverallStarRating] = useState("");
  const [overallHover, setOverallHover] = useState("");
  const [hoverState, setHoverState] = useState({});
  const [opinions, setOpinions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [newOpinion, setNewOpinion] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [apartmentRatings, setApartmentRatings] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newData = {
      overallRating: overallRating,
      overallStarRating: overallStarRating,
      amenitiesRating: ratings,
      amenitiesOpinion: opinions,
    }

    // setApartmentRatings([...apartmentRatings, newData]);
    setApartmentRatings((prevRatings) => {
      const updatedRatings = [...(prevRatings || []), newData];
      console.log("apartment data 1: ", updatedRatings);
      // return updatedRatings;
    });
    console.log("apartment data: "+apartmentRatings);
    // setFormSubmitted(true);
    setOverallStarRating("");
    setOverallRating("");
    setOverallHover("");
    setRatings({});
    setOpinions({});
    setHoverState({});
    // console.log("Ratings:", ratings);
    // console.log("Opinions:", opinions);
    // console.log("Overall:", overallRating);
  };

  // useEffect(() => {
  //   console.log("apartment data: ", apartmentRatings);
  // }, [apartmentRatings]);

  const handleAddOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setShowPopup(true);
    setIsEditable(false);
  };

  const handleEditOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setNewOpinion(opinions[amenity]);
    setShowPopup(true);
    setIsEditable(true);
  };

  const handleSaveOpinion = () => {
    setOpinions({ ...opinions, [currentAmenity]: newOpinion });
    setShowPopup(false);
    setNewOpinion("");
    setIsEditable(false);
  };

  

  return (
    <section className="reviews">
      <h2>Feel Free To Share Your Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="overall-rating">
          <h2>Express your ratings</h2>
          <div className="complete-rating">
            <p>give your overall rating</p>
            <StarRating
              rating={overallStarRating}
              setRating={setOverallStarRating}
              hover={overallHover}
              setHover={setOverallHover}
            />
          </div>
          <textarea
            className="overall-rating-text"
            placeholder="Please Share Your Experience"
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
          />
        </div>
        <div className="amenities">
          <h4>Amenities: </h4>
          {amenities.map((amenity) => (
            <div key={amenity} className="amenity">
              <div className="each-amenity">
                <label>{amenity}</label>
                <StarRating
                  rating={ratings[amenity]}
                  setRating={(rating) =>
                    setRatings({ ...ratings, [amenity]: rating })
                  }
                  hover={hoverState[amenity] || 0}
                  setHover={(hover) => {
                    setHoverState({ ...hoverState, [amenity]: hover });
                  }}
                />
              </div>
              <div className="add-new-opinion">
                {opinions[amenity] ? (
                  <>
                    <div className="popup-result">
                      <span className="edit-text">{opinions[amenity]}</span>
                      <button
                        type="button"
                        onClick={() => handleEditOpinion(amenity)}
                        className="edit-btn"
                      >
                        Edit Opinion
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAddOpinion(amenity)}
                    className="add-btn"
                  >
                    Add Opinion
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="btn-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-modal">
          <IoIosCloseCircleOutline className="close-icon" onClick={() => setShowPopup(false)} />
            <label>{currentAmenity}</label>
            <textarea
              value={newOpinion}
              onChange={(e) => setNewOpinion(e.target.value)}
              placeholder="Enter your opinion..."
            />
            <button 
              type="button"  
              onClick={handleSaveOpinion}>
              {isEditable ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;