import BannerImg from "../utilis/bitcoin-5281988_640.jpg";
const Banner = () => {
  return (
    <div className="w-full h-[25rem] relative">
      <img src={BannerImg} alt="banner img" className="w-full h-full" />
      <div className="absolute top-20 left-0 right-0 mx-auto w-[20rem] ">
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-5xl text-black">
            Crypto Tracker
          </div>
          <div className="font-semibold text-sm text-black text-center">
            get all information regarding crypto currencies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
