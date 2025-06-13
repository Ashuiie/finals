function Article({ article }) {
  if (!article.length) {
    return (
      <p className="text-center text-gray-500 italic">No articles found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {article.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-6 border border-gray-100"
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-700 hover:underline"
          >
            {item.title || "Untitled"}
          </a>

          <p className="text-sm text-gray-600 mt-2">
             <span className="font-medium">Author:</span>{" "}
            {item.author || "Unknown"}
          </p>

          <p className="text-sm text-gray-600">
             <span className="font-medium">Date:</span> {item.date || "N/A"}
          </p>

          <p className="text-sm text-gray-600">
             <span className="font-medium">Relevance:</span>{" "}
            {item.relevance || "N/A"}
          </p>

          <p className="text-sm text-gray-600">
             <span className="font-medium">Source:</span>
            {" www."}
            {item.source || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}

export { Article };
