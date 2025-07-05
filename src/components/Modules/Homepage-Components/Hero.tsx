

const Hero = () => {
    const backgroundImage = {
        backgroundImage: `url('/as-hero.jpeg')`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
  return (
    <div
      style={backgroundImage}
      className="min-h-screen flex flex-col gap-y-8 lg:items-start items-start md:items-center lg:justify-center justify-center p-4"
    >
      {/* website heading */}
      <div className="flex flex-col gap-y-4 justify-center items-center w-9/12 lg:w-7/12  bg-black/10 md:bg-black/5 lg:ml-36 ">
        <h1 className="font-bold font-lora text-2xl md:text-5xl lg:text-7xl/25 text-secondary">
          Simplify Your Books. Borrow with Ease in{" "}
          <span className="text-primary"> BookFlow </span>
        </h1>
        <p className=" hidden md:block font-lato  md:text-xl text-white bg-black/15 lg:mt-10">
          All Your Books, All Your Borrows – Clearly Organized. Experience
          Seamless Interaction with Our{" "}
          <span className="text-primary font-semibold">
            {" "}
            Redux-RTK-Query | React{" "}
          </span>{" "}
          Powered Platform.
        </p>
      </div>
      <p className="font-lato  md:text-xl text-white bg-black/15 lg:mt-10 block md:hidden">
        All Your Books, All Your Borrows – Clearly Organized. Experience
        Seamless Interaction with Our{" "}
        <span className="text-primary font-semibold">
          {" "}
          Redux-RTK-Query | React{" "}
        </span>{" "}
        Powered Platform.
      </p>
    </div>
  );
}

export default Hero
