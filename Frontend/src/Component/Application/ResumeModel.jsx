const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        {/* Close Button */}
        <span
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 cursor-pointer hover:bg-red-700"
          onClick={onClose}
        >
          &times;
        </span>
        {/* Resume Image */}
        <img
          src={imageUrl}
          alt="Resume"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
