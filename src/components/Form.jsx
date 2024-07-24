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
            color={
              currentRating === 1 ||
              (currentRating <= (hover || rating) && currentRating > 1)
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
        className="flex border-2 border-black max-h-[85vh] max-lg:w-[90vw] max-lg:p-4"
      >
        <div className="form-left w-[50%] overflow-y-scroll pr-4 max-lg:w-full max-xl:w-full pb-2">
          <div className="overall-rating">
            <h2 className="text-[#8c0000] text-2xl font-montserrat capitalize">
              Express your ratings
            </h2>
            <div className="complete-rating">
              <p className="font-oswald text-[gray] capitalize mb-2">
                give your overall rating
              </p>
              <StarRating
                rating={overallStarRating}
                setRating={setOverallStarRating}
                hover={overallHover}
                setHover={setOverallHover}
              />
            </div>
            <div className="overall-rating-input mt-3 flex-col">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setCurrentName(e.target.value)}
                value={currentName}
                className="w-full font-palanquin border-2 border-black mb-2 rounded-[5px] p-2"
              />
              <textarea
                className="overall-rating-text border-2 border-black pl-2 pt-2 pb-4 rounded-[5px] max-lg:w-full"
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

          {/* amenities ratings area */}
          <div className="amenities max-lg:w-full">
            <h4 className="text-[#8c0000] font-montserrat text-[22px]">
              Amenities:{" "}
            </h4>
            {amenities.map((amenity) => (
              <div key={amenity} className="amenity w-full mb-4">
                <div className="each-amenity flex justify-between items-center mb-2">
                  <label className="font-teko font-extralight text-[gray] max-lg:text-[18px]">
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
                      <div className="popup-result flex items-center justify-between">
                        <span className="edit-text border-2 p-3 mr-2 rounded-[5px] text-[18px] capitalize overflow-x-scroll max-lg:w-[80%] max-lg:max-h-[100px]">
                          {opinions[amenity]}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleEditOpinion(amenity)}
                          className="edit-btn border-2 border-[gray] font-palanquin font-extralight hover:text-black max-lg:text-[18px] p-2 rounded-[7px] text-[#219419] hover:bg-[#dcffdc]"
                        >
                          Edit Opinion
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddOpinion(amenity)}
                      className="add-btn border-2 border-[gray] font-palanquin font-extralight hover:text-black max-lg:text-[20px] p-2 rounded-[7px] text-[#219419] hover:bg-[#dcffdc]"
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
              className="text-white font-montserrat font-extralight px-8 py-2 rounded-[7px] text-[20px] bg-black hover:bg-white hover:text-black border-2 border-black hover:transition-all"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="form-right max-sm:border-2 max-lg:hidden ml-10 flex items-center justify-center">
          <img src={ReviewImage} alt="form-image" draggable="false" />
        </div>
      </form>
      {showPopup && (
        <div className="popup border-2 flex justify-center items-center flex-col absolute bg-[#8080809d] w-full h-full top-0 left-0 bottom-0 ml-auto mr-auto max-lg:px-2">
          <div className="popup-modal flex justify-center items-center border-2 px-2 py-10 bg-white max-lg:h-[50vh] max-lg:w-full max-lg:mx-2 rounded-[]">
            <div className="max-lg:w-full max-lg:flex-col justify-between items-center max-lg:p-10 ">
              <IoIosCloseCircleOutline
                className="close-icon max-lg:absolute max-lg:top-[10px] max-lg:right-[20px] max-lg:h-[55vh] text-[30px] cursor-pointer"
                onClick={() => setShowPopup(false)}
              />
              <label className="text-[24px]">{currentAmenity}:</label>
              <textarea
                value={newOpinion}
                onChange={(e) => setNewOpinion(e.target.value)}
                placeholder="Enter your opinion..."
                className="border-2 border-black mt-2 px-2 py-4 mr-2 rounded-[10px] w-full capitalize"
              />
              <button type="button" onClick={handleSaveOpinion} className="border-2 border-black text-[18px] py-2 px-6 mt-2 rounded-[5px] hover:bg-[#94ff94]">
                {isEditable ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;
