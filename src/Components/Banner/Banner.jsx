import "./Banner.css";
import Carousel from "react-bootstrap/Carousel";
import banner from "../img/banner.png";
import banner1 from "../img/banner1.png";
import banner3 from "../img/banner3.png";
import banner4 from "../../images/poster.png"

function Banner() {
  return (
    <div>
      <Carousel className="carousel">
        <Carousel.Item className="ban-img-1">
          <img
            className="d-block w-100 ban-img "
            src={banner4} height={370} width={200}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner1} height={370} width={200}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner3} height={370} width={200}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner} height={370} width={200}
            alt="fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;