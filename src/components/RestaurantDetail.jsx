import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurantDetails = async (restaurantId) => {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/restaurants/get-details",
      params: {
        location_id: restaurantId,
        currency: "USD",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "4cd464ed4bmsh3c20394ee440a36p12d4a1jsn26c79f3821d5",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    getRestaurantDetails(restaurantId).then((res) => {
      setRestaurant(res);
    });
  }, [restaurantId, setRestaurant]);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {restaurant && (
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12 ">
            <div className="md:pt-8 lg:flex lg:flex-col lg:justify-center">
              <p className="text-center font-bold text-green-500 md:text-left">
                {restaurant.name}
              </p>

              <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">
                {restaurant.ranking}
              </h1>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                {restaurant.address}
              </p>
            </div>
            <div>
              <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img
                  src={restaurant.photo.images.large.url}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">
                Description
              </h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                {restaurant.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
