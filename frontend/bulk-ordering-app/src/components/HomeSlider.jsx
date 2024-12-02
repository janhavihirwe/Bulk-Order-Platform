import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const sliderItems = [
    {
      id: 1,
      name: "Slider 1",
      imgURL:
        "https://img.freepik.com/free-vector/grocery-store-facebook-cover-template_23-2151089904.jpg?t=st=1732962359~exp=1732965959~hmac=26a71ed4b7fae0c2d67fefbc3fd4feb42bc86af3c517e66b6a5dec9873ab9931&w=1380",
    },
    {
      id: 2,
      name: "Slider 2",
      imgURL:
        "https://img.freepik.com/free-vector/hand-drawn-grocery-shopping-facebook-cover_23-2151008791.jpg?t=st=1732962942~exp=1732966542~hmac=51d7ff1629199027b5b9ff32ecf3d4d5789d7db2f4f9a6948fcf61f6870509c1&w=1380",
    },
    {
      id: 3,
      name: "Slider 3",
      imgURL:
        "https://img.freepik.com/free-vector/flat-design-grocery-store-sale-banner_23-2151074240.jpg?ga=GA1.1.1152443377.1732962264",
    },
    {
      id: 4,
      name: "Slider 4",
      imgURL:
        "https://img.freepik.com/free-vector/flat-supermarket-twitter-header_23-2149379616.jpg?ga=GA1.1.1152443377.1732962264&semt=ais_hybrid",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,          // Show navigation dots
    infinite: true,      // Infinite scrolling
    speed: 500,          // Transition speed (ms)
    slidesToShow: 1,     // Show one image at a time
    slidesToScroll: 1,   // Scroll one image at a time
    autoplay: true,      // Enable automatic sliding
    autoplaySpeed: 3000, // Time between slides (ms)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{ margin: "20px auto", width: "100%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Featured Products
      </h2>
      <Slider {...settings}>
        {sliderItems.map((item) => (
          <div key={item.id}>
            <img
              src={item.imgURL}
              alt={item.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
