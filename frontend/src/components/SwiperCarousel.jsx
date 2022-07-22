/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import AircraftCard from "./AircraftCard";

const SwiperCarousel = ({ aircraftList, aircraftInfo, setAircraftInfo }) => {
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

  return (
    <Swiper
      modules={[Scrollbar, Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={handleCarouselLength()}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
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
