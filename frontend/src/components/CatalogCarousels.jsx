import SwiperCarousel from "@components/SwiperCarousel";

const CatalogCarousels = ({
  type,
  aircraftList,
  aircraftInfo,
  setAircraftInfo,
}) => {
  let filteredAcList;
  if (aircraftList) {
    filteredAcList = aircraftList.filter(
      (aircraft) => aircraft.type_id === type.id
    );
  }

  const handleEmptyType = () => {
    if (filteredAcList.length) {
      return (
        <section className="aircraft-carousel">
          <h1 title={type.desc}>
            ({filteredAcList.length}) {type.name}
            {filteredAcList && filteredAcList.length <= 1 ? "" : "s"}
          </h1>

          <SwiperCarousel
            aircraftList={filteredAcList}
            aircraftInfo={aircraftInfo}
            setAircraftInfo={setAircraftInfo}
          />
        </section>
      );
    }
    return null;
  };

  return aircraftList && handleEmptyType();
};

export default CatalogCarousels;
