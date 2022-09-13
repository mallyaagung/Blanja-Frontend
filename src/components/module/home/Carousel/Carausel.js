import React from 'react'
import "../StyleHome.css"
import slide2 from '../../../../assets/image/slide2.png'
import slide1 from '../../../../assets/image/slide1.png'
import { Carousel } from "react-bootstrap";
const Carausel = () => {
  return (
    <div>
      <div className="container slide">
        <div className="row">
          <Carousel>
            <Carousel.Item interval={1000}>
              <img className="d-block w-100" src={slide1} alt="First slide" />
              <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                <h2 className="caption">Trends in 2020</h2>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img className="d-block w-100" src={slide2} alt="Second slide" />
              <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                <h2 className="caption">Black edition</h2>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={slide1} alt="Third slide" />
              <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                <h2 className="caption">Black edition</h2>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Carausel