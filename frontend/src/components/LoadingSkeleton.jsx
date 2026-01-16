import './LoadingSkeleton.css';

/**
 * Loading Skeleton Components
 * Placeholder UI while content loads
 */

export const ItemCardSkeleton = () => (
  <div className="item-card skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="item-content">
      <div className="skeleton skeleton-badge"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  </div>
);

export const ItemsGridSkeleton = ({ count = 6 }) => (
  <div className="items-grid">
    {Array.from({ length: count }).map((_, index) => (
      <ItemCardSkeleton key={index} />
    ))}
  </div>
);

export const DetailPageSkeleton = () => (
  <div className="item-detail-page">
    <div className="detail-header">
      <div className="skeleton skeleton-back-link"></div>
    </div>
    <div className="detail-container">
      <div className="detail-main">
        <div className="skeleton skeleton-detail-image"></div>
        <div className="detail-content">
          <div className="skeleton skeleton-badge"></div>
          <div className="skeleton skeleton-title large"></div>
          <div className="skeleton skeleton-meta-grid"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
      <div className="detail-sidebar">
        <div className="sidebar-card">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-user-info"></div>
        </div>
      </div>
    </div>
  </div>
);

export default { ItemCardSkeleton, ItemsGridSkeleton, DetailPageSkeleton };
