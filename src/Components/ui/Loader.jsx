const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="relative flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full border-4 border-red-200 border-t-red-600 animate-spin"></div>
        <span className="text-3xl animate-pulse">❤️</span>
        <p className="text-sm text-gray-500">Connecting donors & lives...</p>
      </div>
    </div>
  );
};

export default Loader;
