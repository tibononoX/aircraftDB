/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "@styles/carousel.scss";

import AircraftCard from "./AircraftCard";

const SwiperCarousel = ({
  aircraftList,
  aircraftInfo,
  setAircraftInfo,
  fav,
}) => {
  const handleCarouselLength = () => {
    if (aircraftList) {
      switch (aircraftList.length) {
        case 1:
          return 1;
        case 2:
          return 2;
        default:
          return 2;
      }
    }
    return 1;
  };

  return !fav ? (
    <Swiper
      modules={[Scrollbar, Navigation, Autoplay]}
      spaceBetween={10}
      slidesPerView={handleCarouselLength()}
      navigation
      autoplay={{
        delay: 3500,
        disableOnInteraction: true,
      }}
      scrollbar={{ draggable: true }}
    >
      {aircraftList &&
        aircraftList
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 6)
          .map((aircraft) => (
            <SwiperSlide>
              <AircraftCard
                data={aircraft}
                aircraftInfo={aircraftInfo}
                setAircraftInfo={setAircraftInfo}
              />
            </SwiperSlide>
          ))}
    </Swiper>
  ) : (
    <Swiper
      modules={[Scrollbar, Navigation]}
      spaceBetween={10}
      slidesPerView={handleCarouselLength()}
      navigation
      scrollbar={{ draggable: true }}
    >
      {aircraftList &&
        aircraftList
          .sort((a, b) => 0.5 - Math.random())
          .map((aircraft) => (
            <SwiperSlide>
              <AircraftCard
                data={aircraft}
                aircraftInfo={aircraftInfo}
                setAircraftInfo={setAircraftInfo}
              />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};
export default SwiperCarousel;
