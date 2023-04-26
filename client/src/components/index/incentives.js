const icons = [
  {
    image:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    alt: "Truck icon",
    heading: "Free shipping",
    description:
      "Shipping available anywhere in the UK, free on orders over £50.",
  },
  {
    image:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    alt: "Warranty icon",
    heading: "10-year warranty",
    description: `If an item is damaged or defected we'll replace it for free.`,
  },
  {
    image:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    alt: "Exchange icon",
    heading: "Exchanges",
    description:
      "Swap in your old electronics and gadgets for new ones up to their value equivalent",
  },
];

export default function Incentives() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
      {icons.map((icon, index) => (
        <div key={index} className="sm:flex lg:block">
          <div className="sm:flex-shrink-0">
            <img
              className="w-16 h-16"
              src={icon.image}
              width="64"
              height="64"
              alt={icon.alt}
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
            <h3 className="text-lg font-bold text-violet-600">
              {icon.heading}
            </h3>
            <p className="mt-2 text-base text-gray-500">{icon.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};