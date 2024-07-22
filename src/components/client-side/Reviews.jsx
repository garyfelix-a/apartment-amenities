import "../styles/reviews.css";
import { IoIosFitness } from "react-icons/io";
import { FaParking, FaStar } from "react-icons/fa";
import { MdSportsFootball } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { MdOutlinePool } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";

import { useEffect, useState } from "react";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectReviews, setSelectReviews] = useState('overall');
  const [selectedStarRatings, setSelectedStarRatings] = useState(1);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("apartmentRatings"));
    if (storedRatings) {
      setReviews(storedRatings);
    }
  }, []);

  const showStars = (rating, clickable = false, onClick = () => {}) => (
    <div className="flex">
      {/* creating a array of 5 stars */}
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <FaStar
            className="star flex"
            key={index}
            size={clickable ? 14 : 18}
            color={currentRating <= rating ? "black" : "gray"}
            style={{ cursor: clickable ? "pointer" : "default" }}
            onClick={() => clickable && onClick(currentRating)}
          />
        );
      })}
    </div>
  );

  const handleStarClick = (rating) => {
    setSelectedStarRatings(rating);
  }

  const filterReviews = reviews.filter(review => {
      if(selectReviews === 'overall'){
        return selectedStarRatings ? review.overallStarRating === selectedStarRatings : true;
      }
      return selectedStarRatings ? review.amenitiesRating[selectReviews] === selectedStarRatings : true;
  })

  return (
    <>
      <section className="px-10 py-[70px] flex items-center justify-center bg-[#131842]">
        <h2 className="text-[#FBF6E2] text-4xl font-montserrat">Reviews</h2>
      </section>
      <section className="p-[10px] mx-20 mt-4 flex items-center justify-center border-[4px] border-[#80808053] max-h-[70vh]">
        <section className="section-left w-full p-4 overflow-y-scroll h-[70vh]">
          <div className="flex-col items-center justify-center w-full">
            <p className="w-full flex items-center justify-center text-center text-[30px] font-palanquin">
              <FaGripfire className="text-[60px] text-[red]" />
              Ratings
              <FaGripfire className="text-[60px] text-[red]" />
            </p>
            <p></p>
            <p className="mb-2 mt-2 px-20 font-oswald text-center capitalize text-[gray]">
              One of the top-rated apartments known for its exceptional
              amenities, as well as outstanding customer reviews and
              dependability.
            </p>
          </div>
          <div className="mt-4 px-2 flex-col items-center justify-center">
            <h2 className="text-[gray] text-xl capitalize">
              <button
                className="text-[gray]"
                onClick={() => setSelectReviews("overall")}
              >
                Overall Ratings
              </button>
            </h2>
            {/* {showStars(selectReviews, true)} */}
            {showStars(selectedStarRatings || 0, true, handleStarClick)}
          </div>
          <div className="px-2 mt-4">
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <IoIosFitness className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Fitness Center")} >
                  Fitness Centre
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <FaParking className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Parking")}>
                  Parking Garage
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <MdSportsFootball className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Playground")}>
                  Playground
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <FaPerson className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Spa")}>Spa</button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <MdOutlinePool className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Pools")}>
                  Swimming Pool
                </button>
              </p>
            </div>
          </div>
        </section>
        <section className="section-right p-2 h-[70vh] w-full overflow-y-scroll">
          <section className="overall-reviews flex flex-wrap justify-between">
            <h2 className="text-[gray] text-[18px]">{selectReviews} Ratings</h2>
            {filterReviews.map((review, index) => (
              <div
              key={index}
              className="w-full p-2 rounded-xl mb-2 review-item border-2 border-transparent bg-[#dbdbdb]"
              >
                <div className="flex flex-col">
                  <h3 className="text-2xl capitalize font-thin">
                    &apos;{review.name}&apos; thoughts:
                  </h3>
                  {/* <p>Overall Star Rating: {review.overallStarRating}</p> */}
                  {selectReviews === "overall" && (
                    <>
                      {showStars(review.overallStarRating)}
                      <p className="text-md font-oswald capitalize mt-2">
                        {review.overallRating}
                      </p>
                    </>
                  )}
                </div>
                { selectReviews!== 'overall' && 
                    <>
                        {showStars(review.amenitiesRating[selectReviews])}
                      <p className="text-md font-oswald capitalize mt-2">
                        {review.amenitiesOpinion[selectReviews]}
                      </p>
                    </>
                }
                {/* <div className="">
                  <button
                    type="button"
                    className="cursor:pointer hover:bg-[yellowgreen] transition-all hover:text-white mt-2 mb-2 border-transparent p-2 rounded-md bg-[#11ffbb] text-[red] capitalize"
                    onClick={() =>
                      setShowAmenitiesReview(
                        showAmenitiesReview === index ? null : index
                      )
                    }
                  >
                    Click To View Amenities Review
                  </button>
                </div>
                {showAmenitiesReview === index && (
                  <div className="border-2 border-transparent bg-[#3e3e3e] rounded-xl mt-2 text-white p-2">
                    <h4 className="text-[yellow] italic">
                      Amenities Ratings and Reviews:
                    </h4>
                    <div className="mt-1">
                      <p className="flex items-center">
                        <IoIosFitness />
                        &nbsp;Fitness Center Rating: &nbsp;{" "}
                        {showStars(review.amenitiesRating["Fitness Center"])}
                      </p>
                      <p>
                        Opinion: {review.amenitiesOpinion["Fitness Center"]}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="flex items-center">
                        <FaParking />
                        &nbsp;Parking Rating: &nbsp;
                        {showStars(review.amenitiesRating["Parking"])}
                      </p>
                      <p>Opinion: {review.amenitiesOpinion["Parking"]}</p>
                    </div>
                    <div className="mt-2">
                      <p className="flex items-center">
                        <MdSportsFootball />
                        &nbsp;Playground Rating: &nbsp;
                        {showStars(review.amenitiesRating["Playground"])}
                      </p>
                      <p>Opinion: {review.amenitiesOpinion["Playground"]}</p>
                    </div>
                    <div className="mt-2">
                      <p className="flex items-center">
                        <FaPerson />
                        &nbsp;Spa Rating: &nbsp;
                        {showStars(review.amenitiesRating["Spa"])}
                      </p>
                      <p>Opinion: {review.amenitiesOpinion["Spa"]}</p>
                    </div>
                    <div className="mt-2">
                      <p className="flex items-center">
                        <MdOutlinePool />
                        &nbsp;Swimming Pool Rating: &nbsp;
                        {showStars(review.amenitiesRating["Pools"])}
                      </p>
                      <p>Opinion: {review.amenitiesOpinion["Pools"]}</p>
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </section>
        </section>
      </section>
    </>
  );
};
