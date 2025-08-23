export const LAYOUT_CONSTANTS = {
  GRID: {
    COLUMNS: {
      MOBILE: 1,
      TABLET: 2,
      DESKTOP: 3,
    },
    GAP: "gap-6",
    JUSTIFY: "justify-items-center",
    MARGIN_BOTTOM: "mb-8",
  },
  SKELETON: {
    WIDTH: "w-full",
    MAX_WIDTH: "max-w-sm",
    HEIGHT: "h-80",
    IMAGE_HEIGHT: "h-48",
    BACKGROUND: "bg-slate-100",
    IMAGE_BACKGROUND: "bg-slate-200",
    BORDER_RADIUS: "rounded-xl",
    ANIMATION: "animate-pulse",
  },
  CONTAINER: {
    FLEX: "flex flex-col lg:flex-row",
    MAIN_AREA: "flex-1 p-6 lg:p-8",
    FILTERS_AREA: "w-full lg:w-80 p-6 lg:p-8 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 shadow-lg",
  },
  CARD: {
    BASE: "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100",
    IMAGE: "rounded-t-2xl overflow-hidden",
    CONTENT: "p-6 space-y-4",
    BUTTON: "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg",
  },
} as const;
