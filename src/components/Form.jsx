import "./form.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReviewImage from "../assets/reviewspage.png";

//array of amenities for the form
const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];

//child component for star rating system. It takes rating, setRating, hover, and setHover as props
const StarRating = ({ rating, setRating, hover, setHover }) => (
  <div className="flex">
    {/* creating a array of 5 stars */}
    {[...Array(5)].map((star, index) => {
      // let currentRating = 1;
      const currentRating = index + 1;
      return (
        <label key={index} className="text-[#c0c0c0]">
          <input
            type="radio"
            value={index}
            className="radio"
            onClick={() => setRating(currentRating)}
            required={true}
          />
          <FaStar
            className="star"
            size={18}
            color={currentRating === 1 || (currentRating <= (hover || rating) && currentRating > 1)
              ? "black"
              : "#c0c0c0"
          }
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
  const [currentName, setCurrentName] = useState("");
  const [ratings, setRatings] = useState({});
  const [overallRating, setOverallRating] = useState("");
  const [overallStarRating, setOverallStarRating] = useState(1);
  const [overallHover, setOverallHover] = useState("");
  const [hoverState, setHoverState] = useState({});
  const [opinions, setOpinions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [newOpinion, setNewOpinion] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [apartmentRatings, setApartmentRatings] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("apartmentRatings"));
    if (storedRatings) {
      setApartmentRatings(storedRatings);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newData = {
      name: currentName,
      overallRating,
      overallStarRating,
      amenitiesRating: ratings,
      amenitiesOpinion: opinions,
    };

    const updatedRatings = [...apartmentRatings, newData];
    setApartmentRatings(updatedRatings);
    localStorage.setItem("apartmentRatings", JSON.stringify(updatedRatings));

    console.log("apartment data: " + apartmentRatings);
    // setFormSubmitted(true);
    setCurrentName("");
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
      <h2 className="bg-[#131842] w-full text-center p-10 text-xl">
        Feel Free To Share Your Experience
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex border-2 border-black max-h-[85vh]"
      >
        <div className="form-left w-[50%] overflow-y-scroll pr-4">
          <div className="overall-rating">
            <h2 className="text-[#8c0000] text-2xl font-montserrat capitalize">
              Express your ratings
            </h2>
            <div className="complete-rating">
              <p className="font-oswald text-[gray]">
                give your overall rating
              </p>
              <StarRating
                rating={overallStarRating}
                setRating={setOverallStarRating}
                hover={overallHover}
                setHover={setOverallHover}
              />
            </div>
            <div className="overall-rating-input flex-col">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setCurrentName(e.target.value)}
                value={currentName}
                className="w-full font-palanquin border-2 border-black mb-2 rounded-[5px] p-2"
              />
              <textarea
                className="overall-rating-text border-2 border-black pb-6 "
                placeholder="Please Share Your Experience"
                value={overallRating}
                onChange={(e) => setOverallRating(e.target.value)}
              />
            </div>
            {/* <input type="text" />
          <textarea
            className="overall-rating-text"
            placeholder="Please Share Your Experience"
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
          /> */}
          </div>
          <div className="amenities">
            <h4 className="text-[#8c0000] font-montserrat">Amenities: </h4>
            {amenities.map((amenity) => (
              <div key={amenity} className="amenity w-[100%]">
                <div className="each-amenity">
                  <label className="font-teko font-extralight text-[gray]">
                    {amenity} :
                  </label>
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
                      className="add-btn border-2 border-black font-palanquin font-extralight hover:text-[white]"
                    >
                      Add Opinion
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="btn-submit">
            <button
              type="submit"
              className="text-white font-montserrat font-extralight"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="form-right ml-10 flex items-center justify-center">
            <img src={ReviewImage} alt="" draggable="false" />
        </div>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-modal">
            <IoIosCloseCircleOutline
              className="close-icon"
              onClick={() => setShowPopup(false)}
            />
            <label>{currentAmenity}</label>
            <textarea
              value={newOpinion}
              onChange={(e) => setNewOpinion(e.target.value)}
              placeholder="Enter your opinion..."
            />
            <button type="button" onClick={handleSaveOpinion}>
              {isEditable ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;
