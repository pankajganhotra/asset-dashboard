import { Squares2X2Icon, Bars4Icon } from "@heroicons/react/24/outline";

import { useAssetUI } from "@/context/AssetsContext";

const ViewToggle = () => {
  const { viewType, setViewType } = useAssetUI();

  const toggleViewType = () => {
    setViewType(viewType === "grid" ? "list" : "grid");
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleViewType}
        className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        title={`Switch to ${viewType === "grid" ? "list" : "grid"} view`}
      >
        {viewType === "grid" ? (
          <Bars4Icon className="h-5 w-5" />
        ) : (
          <Squares2X2Icon className="h-5 w-5" />
        )}
      </button>

    </div>
  );
};

export default ViewToggle;
