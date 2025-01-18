import amazonLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";

import appStoreLogo from "../../assets/imgs/get-google-play.png";
import appleStoreLogo from "../../assets/imgs/get-apple-store.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8  bottom-0 left-0 right-0 px-5">
        <div className="container space-y-6">
          {/* Header Section */}
          <header>
            <h2 className="text-xl font-semibold text-slate-800">
              Get The FreshCart App
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on your phone to download the app.
            </p>
          </header>

          {/* Email Input Section */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              className="form-control grow px-4 py-2 border rounded-md"
              placeholder="Email Address"
            />
            <button className="btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold py-2 px-4 rounded-md">
              Share App Link
            </button>
          </div>

          {/* Payment and Download Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-4 border-y-2 border-slate-300 border-opacity-50">
            {/* Payment Partners */}
            <div className="payment-partner flex flex-wrap gap-3 items-center">
              <h3 className="font-medium">Payment Partners:</h3>
              <img className="w-20" src={amazonLogo} alt="Amazon Pay" />
              <img className="w-20" src={americanExpressLogo} alt="American Express" />
              <img className="w-16" src={masterCardLogo} alt="MasterCard" />
              <img className="w-20" src={paypalLogo} alt="PayPal" />
            </div>

            {/* Download Section */}
            <div className="download flex flex-wrap gap-3 items-center">
              <h3 className="font-medium">Get deliveries with FreshCart:</h3>
              <img className="w-28" src={appStoreLogo} alt="Google Play" />
              <img className="w-24" src={appleStoreLogo} alt="Apple Store" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
