import { PAGINATION_CONSTANTS } from "../../constants/pagination.constants";
import { LAYOUT_CONSTANTS } from "../../constants/layout.constants";

const PropertiesSkeleton = () => (
  <div className={`grid grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.MOBILE} sm:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.TABLET} lg:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.DESKTOP} ${LAYOUT_CONSTANTS.GRID.GAP} ${LAYOUT_CONSTANTS.GRID.JUSTIFY} ${LAYOUT_CONSTANTS.GRID.MARGIN_BOTTOM}`}>
    {Array.from({ length: PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT }).map((_, index) => (
      <div 
        key={index} 
        data-testid="skeleton-item"
        className={`${LAYOUT_CONSTANTS.SKELETON.WIDTH} ${LAYOUT_CONSTANTS.SKELETON.MAX_WIDTH} ${LAYOUT_CONSTANTS.SKELETON.HEIGHT} ${LAYOUT_CONSTANTS.SKELETON.BACKGROUND} ${LAYOUT_CONSTANTS.SKELETON.BORDER_RADIUS} ${LAYOUT_CONSTANTS.SKELETON.ANIMATION} border border-slate-200/50`}
      >
        <div 
          data-testid="image-skeleton"
          className={`${LAYOUT_CONSTANTS.SKELETON.WIDTH} ${LAYOUT_CONSTANTS.SKELETON.IMAGE_HEIGHT} ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-t-xl`}
        ></div>
        <div data-testid="content-skeleton" className="p-6 space-y-4">
          <div data-testid="text-skeleton" className={`h-5 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-lg w-3/4`}></div>
          <div data-testid="text-skeleton" className={`h-4 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-lg w-1/2`}></div>
          <div className="flex items-center justify-between">
            <div data-testid="text-skeleton" className={`h-6 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-lg w-1/3`}></div>
            <div data-testid="text-skeleton" className={`h-5 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-full w-20`}></div>
          </div>
          <div data-testid="button-skeleton" className={`h-12 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-xl w-full`}></div>
        </div>
      </div>
    ))}
  </div>
);

export default PropertiesSkeleton;
