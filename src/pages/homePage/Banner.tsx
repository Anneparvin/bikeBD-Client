
const Banner = () => {
    return (
      <div className="carousel w-full h-[400px]">
  
    <div id="slide1" className="carousel-item relative w-full">
      <img
        src="https://i.ibb.co.com/wNPYF0ZR/manny-becerra-4gf-GVL7-Sxw-unsplash.jpg"
        className="w-full h-[400px] object-cover" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide4" className="btn btn-circle">❮</a>
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full">
      <img
        src="https://i.ibb.co.com/GQNyLtfd/bike-Shop1.jpg"
        className="w-full h-[400px] object-cover" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" className="btn btn-circle">❮</a>
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full">
      <img
        src="https://i.ibb.co.com/hxkcHvWB/bike-Shop4.jpg"
        className="w-full h-[400px] object-cover" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" className="btn btn-circle">❮</a>
        <a href="#slide4" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide4" className="carousel-item relative w-full">
      <img
        src="https://i.ibb.co.com/X6wvcvF/bikehd2.jpg"
        className="w-full h-[400px] object-cover" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" className="btn btn-circle">❮</a>
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
    );
  };
  
  export default Banner;