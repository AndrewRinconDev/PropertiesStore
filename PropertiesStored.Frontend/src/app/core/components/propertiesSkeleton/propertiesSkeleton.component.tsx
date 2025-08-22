import { PAGINATION_CONSTANTS } from "../../constants/pagination.constants";
import { LAYOUT_CONSTANTS } from "../../constants/layout.constants";

const PropertiesSkeleton = () => (
  <div className={`grid grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.MOBILE} sm:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.TABLET} lg:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.DESKTOP} ${LAYOUT_CONSTANTS.GRID.GAP} ${LAYOUT_CONSTANTS.GRID.JUSTIFY} ${LAYOUT_CONSTANTS.GRID.MARGIN_BOTTOM}`}>
    {Array.from({ length: PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT }).map((_, index) => (
      <div key={index} className={`${LAYOUT_CONSTANTS.SKELETON.WIDTH} ${LAYOUT_CONSTANTS.SKELETON.MAX_WIDTH} ${LAYOUT_CONSTANTS.SKELETON.HEIGHT} ${LAYOUT_CONSTANTS.SKELETON.BACKGROUND} ${LAYOUT_CONSTANTS.SKELETON.BORDER_RADIUS} ${LAYOUT_CONSTANTS.SKELETON.ANIMATION}`}>
        <div className={`${LAYOUT_CONSTANTS.SKELETON.WIDTH} ${LAYOUT_CONSTANTS.SKELETON.IMAGE_HEIGHT} ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded-t-lg`}></div>
        <div className="p-4 space-y-3">
          <div className={`h-4 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded w-3/4`}></div>
          <div className={`h-3 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded w-1/2`}></div>
          <div className={`h-4 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded w-1/3`}></div>
          <div className={`h-8 ${LAYOUT_CONSTANTS.SKELETON.IMAGE_BACKGROUND} rounded w-full`}></div>
        </div>
      </div>
    ))}
  </div>
);

export default PropertiesSkeleton;
