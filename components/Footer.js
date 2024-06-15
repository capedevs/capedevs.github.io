export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white shadow-t-md mt-auto">
      <div className="container mx-auto text-center px-4">
        <div className="text-xl font-bold mb-2">Cape Software Community</div>
        <p className="text-gray-600 mb-6">
          The Cape Software Community hosts a monthly meetup in Cape Town, South
          Africa
        </p>
        {/*<div className="flex justify-center mb-4">
          <input
            type="email"
            placeholder="jamie@example.com"
            className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-r">
            <Image
              src="/user-logo.png"
              alt="User logo"
              className="h-4 w-4 mr-2 inline-block align-middle"
            />
            Submit
          </button>
        </div>
  */}
        <p className="text-gray-500">
          &copy; 2024 Cape Software Community. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
