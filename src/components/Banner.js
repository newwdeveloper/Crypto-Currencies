import BannerImg from "../utilis/bitcoin-5281988_640.jpg";

const Banner = () => {
  return (
    <div className="w-full h-[20rem] sm:h-[25rem] relative">
      <img
        src={BannerImg}
        alt="banner img"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-20 left-0 right-0 mx-auto w-[80%] sm:w-[60%] lg:w-[40%] text-center">
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-4xl sm:text-5xl md:text-6xl text-black">
            Crypto Tracker
          </div>
          <div className="font-semibold text-xs sm:text-sm md:text-base text-black">
            Get all information regarding cryptocurrencies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
