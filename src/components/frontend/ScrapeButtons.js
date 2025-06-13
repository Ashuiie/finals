import React from "react";

function ScrapeButtons({ handleScrape }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleScrape}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Scrape static website data"
      >
        Scrape
      </button>
    </div>
  );
}

export { ScrapeButtons };
