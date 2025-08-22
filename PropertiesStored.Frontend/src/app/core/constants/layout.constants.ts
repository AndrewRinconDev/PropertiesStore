export const LAYOUT_CONSTANTS = {
  GRID: {
    COLUMNS: {
      MOBILE: 1,
      TABLET: 2,
      DESKTOP: 3,
    },
    GAP: "gap-4",
    JUSTIFY: "justify-items-center",
    MARGIN_BOTTOM: "mb-6",
  },
  SKELETON: {
    WIDTH: "w-full",
    MAX_WIDTH: "max-w-[350px]",
    HEIGHT: "h-64",
    IMAGE_HEIGHT: "h-32",
    BACKGROUND: "bg-gray-200",
    IMAGE_BACKGROUND: "bg-gray-300",
    BORDER_RADIUS: "rounded-lg",
    ANIMATION: "animate-pulse",
  },
  CONTAINER: {
    FLEX: "flex flex-col md:flex-row",
    MAIN_AREA: "flex-1 p-4",
    FILTERS_AREA: "flex flex-wrap w-full p-4 gap-3 md:w-64 md:flex-col justify-center md:justify-start",
  },
} as const;
