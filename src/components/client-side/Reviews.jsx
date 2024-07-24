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
  const [selectReviews, setSelectReviews] = useState("overall");
  const [selectedStarRatings, setSelectedStarRatings] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);

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

  // function to calculate the total average ratings
  const averageStarRating = () => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return 1;

    let totalSum = 0;
    let totalCount = 0;

    reviews.forEach((review) => {
      const defaultRating = 1;
      const ratings = [
        review.overallStarRating || defaultRating,
        review.amenitiesRating?.["Fitness Center"] || defaultRating,
        review.amenitiesRating?.["Parking"] || defaultRating,
        review.amenitiesRating?.["Playground"] || defaultRating,
        review.amenitiesRating?.["Spa"] || defaultRating,
        review.amenitiesRating?.["Pools"] || defaultRating,
      ];
      ratings.forEach((rating) => {
        if (rating !== undefined) {
          totalSum += rating;
          totalCount++;
        }
      });
      // console.log(overallStarRating.length);
    });

    return (totalSum / totalCount).toFixed(2);
  };

  // function to calculate each amenity average rating
  const calculateAverageRatings = (reviews) => {
    const amenities = [
      "Fitness Center",
      "Parking",
      "Playground",
      "Spa",
      "Pools",
    ];
    const totals = {
      amenities: {},
    };

    amenities.forEach((amenity) => {
      totals.amenities[amenity] = { sum: 0, count: 0 };
    });

    let overallSum = 0;
    let overallCount = 0;

    reviews.forEach((review) => {
      const defaultRating = 1;
      const overallRating = review.overallStarRating || defaultRating;
      overallSum += overallRating;
      overallCount++;

      // Check if overallStarRating is a valid number
      amenities.forEach((amenity) => {
        const amenityRating = review.amenitiesRating?.[amenity];
        // Check if amenityRating is a valid number
        if (amenityRating !== undefined && !isNaN(amenityRating)) {
          totals.amenities[amenity].sum += amenityRating;
          totals.amenities[amenity].count += 1;
        }
      });
    });

    const averageRatings = {
      overall: overallCount > 0 ? (overallSum / overallCount).toFixed(1) : "N/A",
      overallCount,
      amenities: {},
    };

    amenities.forEach((amenity) => {
      const { sum, count } = totals.amenities[amenity];
      averageRatings.amenities[amenity] =
        count > 0 ? (sum / count).toFixed(1) : "N/A";
    });

    // console.log("Average Ratings:", averageRatings);

    return averageRatings;
  };
  const averageRatings = calculateAverageRatings(reviews);

  const handleStarClick = (rating) => {
    setSelectedStarRatings(rating);
  };

  const filterReviews = reviews.filter((review) => {
    console.log(review);
    return true;
  });

  //if button is clicked, then all reviews is displayed, else only 2 is displayed.
  const reviewsToShow = showAllReviews
    ? filterReviews
    : filterReviews.slice(0, 2);

  return (
    <>
      <section className="px-10 py-[40px] flex items-center justify-center bg-[#131842]">
        <h2 className="text-[#FBF6E2] text-2xl font-montserrat">Reviews</h2>
      </section>
      <section className="p-[10px] mx-20 mt-4 flex items-center justify-center border-[#80808053] max-h-[80vh]">
        {/* LEFT SIDE CONTENT */}
        <section className="section-left w-full p-4 overflow-y-scroll h-[70vh]">
          {/* TITLE AND CAPTION */}
          <div className="flex-col items-center justify-center w-full">
            <p className="w-full flex items-center justify-center text-center text-[30px] font-palanquin">
              <FaGripfire className="text-[80px] text-[red]" />
              {/* Ratings */}
              {/* overall ratings + all amenities average */}
              <span className="text-[#262525] text-4xl font-serif font-bold">
                {averageStarRating(reviews)}
              </span>
              <FaGripfire className="text-[80px] text-[red]" />
            </p>
            <p></p>
            <p className="mb-2 mt-2 px-20 font-oswald text-center capitalize text-[gray]">
              One of the top-rated apartments known for its exceptional
              amenities, as well as outstanding customer reviews and
              dependability.
            </p>
          </div>

          {/* OVERALL RATINGS CONTENT */}
          <div className="mt-4 px-2 flex-col items-center justify-center">
            <h2 className="text-[gray] text-xl capitalize flex justify-between">
              <button
                className="text-[gray]"
                onClick={() => setSelectReviews("overall")}
              >
                Overall Ratings
              </button>
              {/* <p className="text-4xl">{averageStarRating(reviews)}</p> */}
            </h2>
            {/* {showStars(selectReviews, true)} */}
            {showStars(selectedStarRatings || 0, false, handleStarClick)}
          </div>

          {/* AMENITIES RATINGS CONTENT */}
          <div className="px-2 mt-4">
            <div className="mb-4 py-2 flex justify-between items-center">
              <p className="flex items-center justify-start text-[20px]">
                <IoIosFitness className="text-[gray] text-[30px] mr-10" />
                <button
                  className="flex"
                  onClick={() => setSelectReviews("Fitness Center")}
                >
                  Fitness Center
                </button>
              </p>
              <p className="text-xl">
                {averageRatings.amenities["Fitness Center"]}
              </p>
            </div>
            <div className="mb-4 py-2 flex justify-between items-center">
              <p className="flex items-center justify-start text-[20px]">
                <FaParking className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Parking")}>
                  Parking Garage
                </button>
              </p>
              <p className="text-xl">{averageRatings.amenities["Parking"]}</p>
            </div>
            <div className="mb-4 py-2 flex justify-between items-center">
              <p className="flex items-center justify-start text-[20px]">
                <MdSportsFootball className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Playground")}>
                  Playground
                </button>
              </p>
              <p className="text-xl">
                {averageRatings.amenities["Playground"]}
              </p>
            </div>
            <div className="mb-4 py-2 flex justify-between items-center">
              <p className="flex items-center justify-start text-[20px]">
                <FaPerson className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Spa")}>Spa</button>
              </p>
              <p className="text-xl">{averageRatings.amenities["Spa"]}</p>
            </div>
            <div className="mb-4 py-2 flex justify-between items-center">
              <p className="flex items-center justify-start text-[20px]">
                <MdOutlinePool className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Pools")}>
                  Swimming Pool
                </button>
              </p>
              <p className="text-xl">{averageRatings.amenities["Pools"]}</p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE CONTENT */}
        <section className="section-right p-2 h-[70vh] w-full overflow-y-scroll">
          <section className="overall-reviews flex flex-wrap justify-between">
            <h2 className="text-[gray] text-[18px]">{selectReviews} Ratings</h2>
            {reviewsToShow.map((review, index) => (
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
                {selectReviews !== "overall" && (
                  <>
                    {showStars(review.amenitiesRating[selectReviews])}
                    <p className="text-md font-oswald capitalize mt-2">
                      {review.amenitiesOpinion[selectReviews]}
                    </p>
                  </>
                )}
              </div>
            ))}
            <button
              className="border-2 p-2 rounded-[5px] capitalize mt-2 underline hover:bg-[#c8ffd4] transition-all"
              onClick={() => setShowAllReviews(true)}
            >
              {showAllReviews ? "" : "show all reviews"}
            </button>
            {showAllReviews && (
              <div className="popup-box w-full h-[100vh] border-4 border-black absolute left-0 right-0 top-0 ml-auto mr-auto bg-[#808080a1] p-[50px]">
                <div className="popup-modal-inside max-h-[70vh] px-7 bg-white overflow-y-scroll m-20 transition-all ">
                  <h2 className="text-[gray] text-xl pt-2">{selectReviews !== 'overall' ? selectReviews : 'Overall Rating'}
                  </h2>
                  {/* count for overall reviews */}
                  {selectReviews === 'overall' && (
                    <p className="text-[gray]">{averageRatings.overallCount} reviews</p>
                  )}
                  {/* count for amenities reviews */}
                  {selectReviews !== 'overall' && (
                    <p className="text-[gray]">{averageRatings.overallCount} reviews</p>
                  )}
                  <button
                    onClick={() => setShowAllReviews(false)}
                    className="absolute top-[140px] right-[160px] border-2 px-2 font-bold bg-white"
                  >
                    X
                  </button>
                  {filterReviews.map((review, index) => (
                    <div key={index} className="border-b-2 p-4 y-2 capitalize">
                      <div>
                        <div>
                          <h3 className="font-serif text-[18px] font-extralight mb-1">
                            {review.name}&apos; thoughts:
                          </h3>
                          {selectReviews === "overall" && (
                            <>
                              {showStars(review.overallStarRating)}
                              <p className="mt-2 font-palanquin text-[15px]">
                                {review.overallRating}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      {selectReviews !== "overall" && (
                        <>
                          {showStars(review.amenitiesRating[selectReviews])}
                          <p>{review.amenitiesOpinion[selectReviews]}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
    </>
  );
};
