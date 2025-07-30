import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from "react-icons/fa";

const HomeSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-400  to-blue-300 min-h-screen text-white">
      <div className="heroSection py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div
            className="title mb-12 animate-fadeIn"
            style={{ animationDuration: "1.5s" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              CareerCompass
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Helping users discover roles that align with their skills and
              aspirations. Empowering users to find meaningful career paths
              tailored to their strengths.
            </p>
          </div>
        </div>
        <div className="details grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {details.map((item) => (
            <div
              className="card bg-white text-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 "
              key={item.id}
            >
              <div className="icon text-5xl text-[#8BC6EC] hover:text-[#9599E2] transition-colors duration-300">
                {item.icon}
              </div>
              <div className="content text-center">
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="text-gray-600">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
