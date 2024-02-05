/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = ({ selectedSortOption }) => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const getRestaurants = async () => {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/restaurants/list",
      params: {
        location_id: "293919",
        restaurant_tagcategory: "10591",
        restaurant_tagcategory_standalone: "10591",
        currency: "USD",
        lunit: "km",
        limit: "6",
        open_now: "false",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "4cd464ed4bmsh3c20394ee440a36p12d4a1jsn26c79f3821d5",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        console.error("Invalid response format");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const sortRestaurants = (restaurants, sortOption) => {
    switch (sortOption.name) {
      case "Popularity":
        return [...restaurants].sort((a, b) => a.rating - b.rating);
      case "Best Rating":
        return [...restaurants].sort((a, b) => b.rating - a.rating);
      case "Open Now":
        return [...restaurants].filter(
          (restaurant) => restaurant.open_now_text === "Open Now"
        );
      default:
        return [...restaurants];
    }
  };

  useEffect(() => {
    getRestaurants().then((res) => {
      const sortedRestaurants = sortRestaurants(res, selectedSortOption);
      setRestaurants(sortedRestaurants);
    });
  }, [selectedSortOption, setRestaurants]);

  return (
    <>
      <section className="flex flex-col items-center bg-white">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
          {restaurants.map((restaurant, i) => (
            <article
              className="mb-4 overflow-hidden text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
              key={i}
              onClick={() => navigate(`/restaurant/${restaurant.location_id}`)}
            >
              <div className="">
                {restaurant.photo &&
                  restaurant.photo.images &&
                  restaurant.photo.images.large && (
                    <img
                      src={restaurant.photo.images.large.url}
                      alt={`Image of ${restaurant.name}`}
                      className="w-full h-48 object-cover"
                    />
                  )}
              </div>

              <div className="p-4">
                <div className="pb-6">
                  <a
                    href="#"
                    className="text-lg hover:text-green-600 font-medium duration-500 ease-in-out"
                  >
                    {restaurant.name}
                  </a>
                </div>

                <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
                  <li className="mr-4 flex items-center text-left">
                    <i className="mr-2 text-2xl text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                        />
                      </svg>
                    </i>
                    <span className="text-sm">{restaurant.open_now_text}</span>
                  </li>
                </ul>

                <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                  <li className="text-left">
                    <span className="text-sm text-gray-400">Price</span>
                    <p className="m-0 text-base font-medium">
                      {restaurant.price_level}
                    </p>
                  </li>

                  <li className="text-left">
                    <span className="text-sm text-gray-400">Rating</span>
                    <ul className="m-0 flex items-center p-0 font-medium">
                      <li className="ml-2 inline text-base">
                        {restaurant.rating}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Cards;
