import React from "react";
import UnsplashPhoto, { ImageGridModalProps } from "../Services/interfaces";

const ImageGridModal: React.FC<ImageGridModalProps> = ({
  cachedData,
  openModal,
  closeModal,
  selectedPhoto,
  photoStatistics,
  page,
}) => {
  return (
    <div>
      <div className="image-grid">
        {cachedData ? (
          cachedData
            .slice(
              page !== -1 ? 0 : undefined,
              page !== -1 ? page * 20 : undefined
            )
            .map(
              (res: UnsplashPhoto) =>
                res && (
                  <div key={res.id} className="image-container">
                    {res.urls && res.urls.thumb && (
                      <img
                        src={res.urls.thumb}
                        alt=""
                        onClick={() => openModal(res)}
                        className="image"
                      />
                    )}
                  </div>
                )
            )
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
      {selectedPhoto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.urls.full} alt="" className="modal-image" />
            <div className="statistics">
              <p className="statistic">
                Likes:{" "}
                <span>
                  {photoStatistics && photoStatistics.likes
                    ? photoStatistics.likes.total
                    : "to retrieve data you should be online"}
                </span>
              </p>
              <p className="statistic">
                Downloads:{" "}
                <span>
                  {photoStatistics && photoStatistics.downloads
                    ? photoStatistics.downloads.total
                    : "to retrieve data you should be online"}
                </span>
              </p>
              <p className="statistic">
                Views:{" "}
                <span>
                  {photoStatistics && photoStatistics.views
                    ? photoStatistics.views.total
                    : "to retrieve data you should be online"}
                </span>
              </p>
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGridModal;
