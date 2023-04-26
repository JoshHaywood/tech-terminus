const brands = [
  "../images/logos/razer.png" /* Attribution: https://www.cleanpng.com/png-dreamhack-laptop-razer-inc-computer-mouse-headphon-80624/ */,
  "../images/logos/hyperx.png" /* Attribution: https://www.cleanpng.com/png-kingston-technology-logo-brand-transparency-font-n-6869660/ */,
  "../images/logos/microsoft.png" /* Attribution: https://www.cleanpng.com/png-microsoft-azure-logo-typescript-business-segue-per-2344386/ */,
  "../images/logos/steelseries.png" /* Attribution: https://www.cleanpng.com/png-computer-mouse-steelseries-computer-keyboard-mouse-4402776/ */,
  "../images/logos/asus.png" /* Attribution: https://www.cleanpng.com/png-laptop-intel-ram-asus-hard-drives-emblem-882168/ */,
  "../images/logos/logitech.png" /* Attribution: https://www.cleanpng.com/png-computer-keyboard-logitech-logo-headphones-marketp-898934/ */,
];

export default function Brands() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 gap-5 items-center">
      {brands.map((logo, index) => (
        <img
          key={index}
          src={logo}
          width="150"
          height="40"
          alt="brand logo"
          className="object-fit w-40 h-auto"
        />
      ))}
    </div>
  );
};