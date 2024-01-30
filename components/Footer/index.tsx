const Footer = () => {
  return (
    <div className="text-black-50 bg-black-950 py-8">
      <h2 className="text-3xl font-extralight tracking-widest text-center underline underline-offset-8">
        JD PRIVATE EQUITIES
      </h2>

      {/* Footer Container */}
      <div className="w-11/12 lg:max-w-7xl mx-auto lg:flex">
        {/* Single Footer item */}
        <div className="w-[328px] mx-auto space-y-4">
          <h3 className="text-xl uppercase font-light tracking-widest pt-8">
            Help
          </h3>
          <ul className="space-y-2">
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              FAQ
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Contact Us
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Privacy Policy
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Our Story
            </li>
          </ul>
        </div>
        <div className="w-[328px] mx-auto space-y-4">
          <h3 className="text-xl uppercase font-light tracking-widest pt-8">
            Help
          </h3>
          <ul className="space-y-2">
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              FAQ
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Contact Us
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Privacy Policy
            </li>
            <li className="text-black-300 uppercase font-extralight tracking-widest cursor-pointer">
              Our Story
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
