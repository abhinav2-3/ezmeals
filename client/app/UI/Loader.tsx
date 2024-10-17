export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div
        className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse" />
      <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
    </div>
  );
}
