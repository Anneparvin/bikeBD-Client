const Testimonials = () => {
	const reviews = [
	  {
		name: "Emma R.",
		feedback: "Absolutely love my new bike! The quality and performance exceeded my expectations. Great customer service and fast delivery! 🚲",
	  },
	  {
		name: "James K.",
		feedback: "Best bike shop ever! The team helped me pick the perfect model, and the ride is so smooth. Highly recommend! 🚴‍♂️",
	  },
	  {
		name: "Sophia M.",
		feedback: "Fantastic experience! The repair service was quick, and my bike feels brand new. Thanks for the excellent service! 🛠️🚲",
	  },
	];
  
	return (
	  <div className="bg-orange-300 p-6 rounded-lg shadow-md">
		<h2 className="text-2xl font-bold text-center text-gray-800 mb-4 italic">
		  🚴‍♂️ Customer Testimonials
		</h2>
		<div className="space-y-4">
		  {reviews.map((review, index) => (
			<div key={index} className="bg-white p-4 rounded-lg shadow-md">
			  <p className="text-gray-700 italic">"{review.feedback}"</p>
			  <p className="font-bold text-right text-gray-800">- {review.name}</p>
			</div>
		  ))}
		</div>
	  </div>
	);
  };
  
  export default Testimonials;
  