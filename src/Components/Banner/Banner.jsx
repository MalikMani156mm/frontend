import "./Banner.css";
import Carousel from "react-bootstrap/Carousel";
import banner from "../img/banner.jpeg";
import banner1 from "../img/banner1.jpeg";
import banner3 from "../img/banner3.jpeg";
import banner4 from "../../images/poster.jfif"

function Banner() {
  return (
    <div>
      <Carousel className="carousel">
        <Carousel.Item className="ban-img-1">
          <img
            className="d-block w-100 ban-img "
            src={banner} height={400} width={200}
            alt="First slide"
          />
          <Carousel.Caption>
            <div className="col-md-8 offset-md-2 info">
              <h1 className="text-center hpic1">Welcome to our E-FIR System</h1>
              <p className="text-center pic1">
                The Revolution of Police Stations
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner1} height={400} width={200}
            alt="Second slide"
          />

          <Carousel.Caption>
            <div className="col-md-8 offset-md-2 info">
              <h1 className="text-center hpic2">Log Into your Account</h1>
              <p className="text-center pic2">
                Goto Online FIR and Report the Incidents
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner3} height={400} width={200}
            alt="Third slide"
          />

          <Carousel.Caption>
            <div className="col-md-10 offset-md-2 info">
              <h1 className="text-center hpic3">Goto My Applications</h1>
              <p className="text-center pic3">
                Track the progress of your previous FIRs
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ban-img"
            src={banner4} height={400} width={200}
            alt="fourth slide"
          />
          <Carousel.Caption>
            <div className="col-md-8 offset-md-2 info">
              <h1 className="text-center hpic2">We will server the Community</h1>
              <p className="text-center pic2">
                Goto User Manual Guide and Resolve your Queries
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;