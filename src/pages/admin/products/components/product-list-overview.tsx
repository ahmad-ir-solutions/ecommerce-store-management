

import Woo from "../../../../assets/images/woo.svg";
import Ebay from "../../../../assets/images/ebay.svg";
import OnBuy from "../../../../assets/images/onbuy.svg";
import TikTok from "../../../../assets/images/tiktok.svg";
export const ProductListOverview = () => {

  return (
    <div className="bg-white rounded-xl p-6">
    <h2 className="text-lg font-semibold mb-4">Product Listings Overview</h2>
    <div className="flex justify-around mb-4">
      <div className="flex flex-col items-center">
        <img src={Woo} alt="Woo" />
      </div>
      <div className="flex flex-col items-center">
        <img src={Ebay} alt="ebay" />
      </div>
      <div className="flex flex-col items-center">
        <img src={OnBuy} alt="onbuy" />
      </div>
      <div className="flex flex-col items-center">
        <img src={TikTok} alt="tiktok" />

      </div>
    </div>
    <div className="flex justify-around align-middle bg-[#ECF6FF] py-2 ml-4 rounded-lg">
    <div className="text-center">-</div>
    <div className="text-center">-</div>
    <div className="text-center">-</div>
    <div className="text-center">-</div>
    </div>
  </div>
  );
};

export default ProductListOverview;