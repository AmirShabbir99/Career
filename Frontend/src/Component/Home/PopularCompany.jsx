import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-8">TOP COMPANIES</h3>
        <div className="companies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {companies.map((element) => (
            <div
              className="card bg-white text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
              key={element.id}
            >
              <div className="icon text-4xl text-blue-500 mb-4">
                {element.icon}
              </div>
              <div className="text text-center mb-4">
                <p className="text-xl font-bold">{element.title}</p>
                <p className="text-gray-600">{element.location}</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
