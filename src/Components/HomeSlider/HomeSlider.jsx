import React from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="row py-5">
                <div className="col-md-9">
                    <Slider {...settings}>
                        <div>
                            <img style={{ width: "100%", height: "400px" }} src={require("../../images/41nN4nvKaAL._AC_SY200_.jpg")} alt="" className='w-100' />
                        </div>
                        <div>
                            <img style={{ width: "100%", height: "400px" }} src={require("../../images/61cSNgtEISL._AC_SY200_.jpg")} alt="" className='w-100' />
                        </div>


                    </Slider>

                </div>
                <div className="col-md-3">
                    <div>
                        <img style={{ width: "100%", height: "200px" }} src={require("../../images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg")} alt="" className='w-100' />
                    </div>
                    <div>
                        <img style={{ width: "100%", height: "200px" }} src={require("../../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg")} alt="" className='w-100' />
                    </div>
                </div>
            </div>


        </>
    )
}
