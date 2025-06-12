import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with dark overlay and contrast */}
      <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/crisis-background.jpg"
            alt="Crisis regions background image"
            fill
            quality={100}
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 md:space-y-12">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              <span className="block">Crisis Insights</span>
              <span className="block mt-2 text-2xl md:text-4xl text-red-500 font-semibold">
                Understanding Global Crises Through AI
              </span>
            </h1>
            
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Explore and understand global conflict and crisis regions with AI-powered insights, 
              visualizations, and comparative analysis.
            </p>
          </div>

          <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
            <div className="stat p-4 bg-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-red-500">35+</p>
              <p className="text-sm md:text-base text-gray-300">Active Crisis Regions</p>
            </div>
            <div className="stat p-4 bg-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-red-500">104M+</p>
              <p className="text-sm md:text-base text-gray-300">Displaced People</p>
            </div>
            <div className="stat p-4 bg-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-red-500">21</p>
              <p className="text-sm md:text-base text-gray-300">Ongoing Conflicts</p>
            </div>
            <div className="stat p-4 bg-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-red-500">$43B</p>
              <p className="text-sm md:text-base text-gray-300">Aid Needed</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <Link
              href="/map"
              className="px-8 py-4 text-lg md:text-xl font-medium rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 text-white transform hover:scale-105"
            >
              Explore Crisis Map
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            Powered by Google Cloud AI & MongoDB Atlas Vector Search
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Mission section */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-red-500 text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Understand</h3>
              <p className="text-gray-300">
                Gain deeper insights into global crises through AI-generated reports and comprehensive data analysis.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-red-500 text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-2">Compare</h3>
              <p className="text-gray-300">
                Discover patterns and similarities between different crisis regions using advanced vector search technology.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-red-500 text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Visualize</h3>
              <p className="text-gray-300">
                Explore interactive maps and data visualizations that bring context and clarity to complex humanitarian situations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
