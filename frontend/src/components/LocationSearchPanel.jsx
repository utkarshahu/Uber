import React, { useEffect } from "react";

/**
 * Defensive LocationSearchPanel
 * - suggestions may be array | single object | null
 * - item may be string or object; derive a safe string label
 */
const LocationSearchPanel = ({
  suggestions = [],
  activeField,
  setpickup,
  setdestination,
  setopenPanel,
  setVehiclePanel
}) => {
  // Debug: inspect what you're receiving
  useEffect(() => {
    console.log("LocationSearchPanel suggestions (raw):", suggestions);
  }, [suggestions]);

  // normalize suggestions -> always an array
  const safeSuggestions = Array.isArray(suggestions)
    ? suggestions
    : suggestions
      ? [suggestions]
      : [];

  if (!activeField) {
    return <div className="p-4 text-gray-500">Click input and type 3+ chars to get suggestions</div>;
  }

  const getLabel = (item) => {
    // If it's a string, return it
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return String(item);

    // Prefer known keys from your backend
    return (
      item.formatted ||
      item.description ||
      item.place_name ||
      (item.city && item.state ? `${item.city}, ${item.state}` : null) ||
      // final fallback to a short JSON so React renders a string, not object
      JSON.stringify(item)
    );
  };

  const handleClick = (item) => {
    const label = getLabel(item);
    if (activeField === "pickup") setpickup(label);
    else setdestination(label);

    setopenPanel(false);
    if (typeof setVehiclePanel === "function") setVehiclePanel(true);
  };

  return (
    <div className="p-4">
      {safeSuggestions.length > 0 ? (
        safeSuggestions.map((item, idx) => {
          const label = getLabel(item);
          return (
            <div
              key={idx}
              onClick={() => handleClick(item)}
              className="flex gap-4 items-center border-2 p-3 my-2 rounded-2xl border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-2-fill text-xl"></i>
              </div>
              <h4 className="font-medium">{label}</h4>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center mt-4">No suggestions found</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
