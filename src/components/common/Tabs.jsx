const Tabs = ({ tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b-2 border-gray-300 mb-4 md:mb-6 overflow-x-auto -mx-2 md:mx-0 px-2 md:px-0 scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-2 md:px-6 py-2 md:py-3 font-medium text-xs md:text-base whitespace-nowrap transition-all relative flex-shrink-0 ${
              activeTab === tab.id
                ? 'text-green-600 border-b-2 border-green-600 -mb-[2px]'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden">
              {tab.label.split(' ')[0]}
            </span>
            {tab.required && activeTab !== tab.id && (
              <span className="ml-0.5 md:ml-1 text-red-500 text-xs md:text-sm">*</span>
            )}
            {tab.completed && activeTab !== tab.id && (
              <span className="ml-1 md:ml-2 text-green-500 text-xs md:text-base">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
};

export default Tabs;
