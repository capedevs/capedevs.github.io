const SubscribeButton = () => {
  return (
    <button className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-lg shadow">
      <img
        src="/user-logo.png"
        alt="User logo"
        className="h-4 w-4 mr-2 inline-block align-middle"
      />
      Subscribe
    </button>
  );
};

export default SubscribeButton;
