 import Slider from 'react-slick';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 const images = [
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
];



export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="mt-24 flex justify-center">
      <div className='bg-gray-200 w-1/2 py-8 rounded'>
        <Slider {...settings}>
          <div>
            <img className="h-96 m-auto" src={images[0]} alt="" />
          </div>
          <div>
            <img className="h-96 m-auto" src={images[1]} alt="" />
          </div>
          <div>
            <img className="h-96 m-auto" src={images[2]} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}