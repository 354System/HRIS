import ChartAbsensi from "./component/chart/ChartAbsensi"
import ChartDivisiWeekly from "./component/chart/ChartDivisiWeekly"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const DashboardChartAdmin = ({ data }) => {

    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <GrPrevious size={20} color="black" />,
        nextArrow: <GrNext size={20} color="black" />,
    };

    return (
        <div className="w-full h-full bg-white rounded-lg laptop:flex laptop:items-center">
            <div className="w-[60%] hp:hidden">
                <ChartAbsensi data={data} />
            </div>
            <div className="w-[40%] h-full hp:hidden">
                <ChartDivisiWeekly />
            </div>
            <div className="laptop:hidden p-5">
                <Slider {...setting} className="">
                    <div className="w-full">
                        <ChartAbsensi data={data} />
                    </div>
                    <div className="w-full">
                        <ChartDivisiWeekly />
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default DashboardChartAdmin;