/**
 * Fallback component for features section in about page
 */

export function FeaturesFallback() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl border border-gray-100 bg-gray-50 animate-pulse"
            >
              <div className="w-16 h-16 mx-auto mb-6 p-4 bg-primary/10 rounded-2xl"></div>
              <div className="h-8 w-32 bg-gray-200 rounded mb-3 mx-auto"></div>
              <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Fallback component for stats section in about page
 */
export function StatsFallback() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center">
              <div className="h-12 md:h-14 w-24 md:w-32 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2"></div>
              <div className="h-5 w-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
