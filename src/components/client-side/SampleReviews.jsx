import "../styles/reviews.css";
import { IoIosFitness } from "react-icons/io";
import { FaParking, FaStar } from "react-icons/fa";
import { MdSportsFootball } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { MdOutlinePool } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";
import { useEffect, useState } from "react";

export const SampleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectReviews, setSelectReviews] = useState("overall");
  const [selectedStarRatings, setSelectedStarRatings] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  // const [totalStarsCount, setTotalStarsCount] = useState(null);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("apartmentRatings"));
    if (storedRatings) {
      setReviews(storedRatings);
    }
  }, []);

  const showStars = (rating, clickable = false, onClick = () => {}) => (
    <div className="flex">
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

  //   const averageStarRating = (review) => {
  //     const defaultRating = 1;
  //     const ratings = [
  //       review.overallStarRating || defaultRating,
  //       review.amenitiesRating?.["Fitness Center"] || defaultRating,
  //       review.amenitiesRating?.['Parking'] || defaultRating,
  //       review.amenitiesRating?.['Playground'] || defaultRating,
  //       review.amenitiesRating?.['Spa'] || defaultRating,
  //       review.amenitiesRating?.['Pools'] || defaultRating,
  //     ];

  //     const validRatings = ratings.map(rating => rating !== undefined? rating : defaultRating);
  //     const totalStars = validRatings.length;
  //     const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
  //     console.log(sum);
  //     const average = sum / totalStars.toFixed(2);
  //     console.log(average);
  //     return (sum / totalStars).toFixed(2);
  //   }

  // const averageStarRating = () => {
  //   const totalReviews = reviews.length;
  //   if (totalReviews === 0) return 1; // default to 1 if there are no reviews

  //   let totalSum = 0;
  //   let totalCount = 0;

  //   reviews.forEach((review) => {
  //     const defaultRating = 1;
  //     const ratings = [
  //       review.overallStarRating || defaultRating,
  //       review.amenitiesRating?.["Fitness Center"] || defaultRating,
  //       review.amenitiesRating?.["Parking"] || defaultRating,
  //       review.amenitiesRating?.["Playground"] || defaultRating,
  //       review.amenitiesRating?.["Spa"] || defaultRating,
  //       review.amenitiesRating?.["Pools"] || defaultRating,
  //     ];

  //     ratings.forEach((rating) => {
  //       if (rating !== undefined) {
  //         totalSum += rating;
  //         totalCount++;
  //       }
  //     });
  //   });

  //   return (totalSum / totalCount).toFixed(2);
  // };

  // const calculateAverageRatings = (reviews) => {
  //   const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];
  //   const totals = {
  //       overall: {sum: 0, count: 0},
  //       amenities: {}
  //   };

  //   amenities.forEach(amenity => {
  //       totals.amenities[amenity] = {sum: 0, count: 0};
  //   });

  //   reviews.forEach(review => {
  //       if(review.overallStarRating!== undefined){
  //           totals.overall.sum += review.overallStarRating;
  //           totals.overall.count++;
  //       }

  //       amenities.forEach(amenity => {
  //           const amenityRating = review.amenityRating?.[amenity];
  //           if(amenityRating !== undefined){
  //               totals.amenityRating[amenity].sum += amenityRating;
  //               totals.amenities[amenity].count++;
  //           }
  //       });
  //   });
    
  //   const averageRatings = {
  //     overall: totals.overall.sum / (totals.overall.count).toFixed(2),
  //     amenities: {}
  //   };

  //   amenities.forEach(amenity => {
  //     const { sum, count } = totals.amenities[amenity];
  //     averageRatings.amenities[amenity] = (sum / count).toFixed(2);
  //   });

  //   return averageRatings;
  // }

  // const calculateAverageRatings = (reviews) => {
  //   const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];
  //   const totals = {
  //     overall: { sum: 0, count: 0 },
  //     amenities: {}
  //   };

  //   amenities.forEach(amenity => {
  //     totals.amenities[amenity] = { sum: 0, count: 0 };
  //   });

  //   reviews.forEach(review => {
  //     if (review.overallStarRating !== undefined) {
  //       totals.overall.sum += review.overallStarRating;
  //       totals.overall.count += 1;
  //     }

  //     amenities.forEach(amenity => {
  //       const amenityRating = review.amenitiesRating?.[amenity];
  //       if (amenityRating !== undefined) {
  //         totals.amenities[amenity].sum += amenityRating;
  //         totals.amenities[amenity].count += 1;
  //       }
  //     });
  //   });

  //   console.log('Total Ratings:', totals);

  //   const averageRatings = {
  //     overall: totals.overall.count > 0 ? (totals.overall.sum / totals.overall.count).toFixed(2) : 'N/A',
  //     amenities: {}
  //   };

  //   amenities.forEach(amenity => {
  //     const { sum, count } = totals.amenities[amenity];
  //     averageRatings.amenities[amenity] = count > 0 ? (sum / count).toFixed(2) : 'N/A';
  //   });

  //   console.log('Average Ratings:', averageRatings);

  //   return averageRatings;
  // };
  const averageOverallRating = () => {
    const totalReviews = reviews.length;
    if(totalReviews === 0) return 1;
    
    let totalSum = 0;
    let totalCount = 0;

    reviews.forEach(review => {
        const defaultRating = 1;
        const ratings = [
          review.overallStarRating || defaultRating,
          review.amenitiesRating?.["Fitness Center"] || defaultRating,
          review.amenitiesRating?.['Parking'] || defaultRating,
          review.amenitiesRating?.['Playground'] || defaultRating,
          review.amenitiesRating?.['Spa'] || defaultRating,
          review.amenitiesRating?.['Pools'] || defaultRating,
        ];
        ratings.forEach(rating => {
          if(rating !== undefined){
            totalSum += rating;
            totalCount++;
          }
        });
    });

    return (totalSum / totalCount).toFixed(2);
  }

  const calculateAverageRatings = (reviews) => {
    const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];
    const totals = {
      amenities: {}
    };
  
    amenities.forEach(amenity => {
      totals.amenities[amenity] = { sum: 0, count: 0 };
    });
  
    reviews.forEach(review => {
      // Check if overallStarRating is a valid number
      amenities.forEach(amenity => {
        const amenityRating = review.amenitiesRating?.[amenity];
        // Check if amenityRating is a valid number
        if (amenityRating !== undefined && !isNaN(amenityRating)) {
          totals.amenities[amenity].sum += amenityRating;
          totals.amenities[amenity].count += 1;
        }
      });
    });

    const averageRatings = {
      amenities: {}
    };
  
    amenities.forEach(amenity => {
      const { sum, count } = totals.amenities[amenity];
      averageRatings.amenities[amenity] = count > 0 ? (sum / count).toFixed(1) : 'N/A';
    });
  
    console.log('Average Ratings:', averageRatings);
  
    return averageRatings;
  };
  const averageRatings = calculateAverageRatings(reviews);

  const handleStarClick = (rating) => {
    setSelectedStarRatings(rating);
  };

  const filterReviews = reviews.filter((review) => {
    // Return all reviews without star-based filtration
    // if(selectReviews === 'overall'){
    //   return selectedStarRatings ? review.overallStarRating === selectedStarRatings : true;
    // }
    // return selectedStarRatings ? review.amenitiesRating[selectReviews] === selectedStarRatings : true;
    console.log(review);
    return true;
  });

  const reviewsToShow = showAllReviews
    ? filterReviews
    : filterReviews.slice(0, 2);

  return (
    <>
      <section className="px-10 py-[70px] flex items-center justify-center bg-[#131842]">
        <h2 className="text-[#FBF6E2] text-4xl font-montserrat">Reviews</h2>
      </section>
      <section className="p-[10px] mx-20 mt-4 flex items-center justify-center border-[4px] border-[#80808053] max-h-[70vh]">
        
        {/*  LEFT SIDE CONTENT */}

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
            <h2 className="text-[gray] text-xl capitalize flex justify-between">
              <button
                className="text-[gray]"
                onClick={() => setSelectReviews("overall")}
              >
                Overall Ratings
              </button>
              <p className="text-4xl">{averageOverallRating(reviews)}</p>
            </h2>
            {showStars(selectedStarRatings || 0, true, handleStarClick)}
          </div>
          <div className="px-2 mt-4">
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <IoIosFitness className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Fitness Center")}>
                  Fitness Center ({averageRatings.amenities["Fitness Center"]})
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <FaParking className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Parking")}>
                  Parking Garage ({averageRatings.amenities["Parking"]})
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <MdSportsFootball className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Playground")}>
                  Playground ({averageRatings.amenities["Playground"]})
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <FaPerson className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Spa")}>
                  Spa ({averageRatings.amenities["Spa"]})
                </button>
              </p>
            </div>
            <div className="mb-4 py-2">
              <p className="flex items-center justify-start text-[20px]">
                <MdOutlinePool className="text-[gray] text-[30px] mr-10" />
                <button onClick={() => setSelectReviews("Pools")}> 
                  Swimming Pool ({averageRatings.amenities["Pools"]})
                </button>
              </p>
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
              className="cursor-pointer hover:bg-[yellowgreen] transition-all hover:text-white mt-2 mb-2 border-transparent p-2 rounded-md bg-[#11ffbb] text-[red] capitalize"
              onClick={() => setShowAllReviews(true)}
            >
              Show All Reviews
            </button>
            {showAllReviews && (
              <div className="popup">
                <div className="popup-inner">
                  <button
                    className="close-btn"
                    onClick={() => setShowAllReviews(false)}
                  >
                    Close
                  </button>
                  {filterReviews.map((review, index) => (
                    <div
                      key={index}
                      className="w-full p-2 rounded-xl mb-2 review-item border-2 border-transparent bg-[#dbdbdb]"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-2xl capitalize font-thin">
                          &apos;{review.name}&apos; thoughts:
                        </h3>
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
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
    </>
  );
};


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