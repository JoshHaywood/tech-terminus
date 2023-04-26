import { Helmet } from "react-helmet";

import Breadcrumb from "../components/breadcrumb";
import CheckoutForm from "../components/checkout/checkout-form";
import Summary from "../components/checkout/summary";

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Tech Terminus | Checkout</title>
      </Helmet>

      <Breadcrumb
        crumbOneLink="/checkout"
        crumbOneRoute="/checkout"
        crumbOneName="Checkout"
      />

      <div className="w-screen bg-gray-50">
        <div className="py-16 max-w-[1350px] ml-5 mr-4 2xl:mx-auto">
          {/* Heading */}
          <h1 className="mb-5 lg:mb-10 text-4xl font-bold tracking-wide text-violet-600">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row lg:space-x-10">
            {/* Checkout form */}
            <CheckoutForm />

            {/* Product list */}
            <Summary />
          </div>
        </div>
      </div>
    </>
  );
};