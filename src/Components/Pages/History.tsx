import { useEffect, useState } from "react";
import { useCachedData, usePhotoStatistics } from "../../Services/cacheService";
import { addScrollListener } from "../../Services/scrollService";
import UnsplashPhoto, { ModalProp } from "../../Services/interfaces";
import ImageGridModal from "../ImageGridModall";

interface Props {
  usedWords: string[];
}

const History: React.FC<Props> = ({ usedWords }) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data } = useCachedData(searchWord, false);
  const [selectedPhoto, setSelectedPhoto] = useState<ModalProp | null>(null);

  const cachedData = data?.pages?.map((page) => page.results).flat();
  const handleScroll = () => {
    setPage((prev) => prev + 1);
  };

  //infinite scroll
  useEffect(() => {
    const scrollListener = addScrollListener(handleScroll);

    return () => {
      scrollListener();
    };
  }, []);

  //open modal
  const openModal = (photo: UnsplashPhoto) => {
    setSelectedPhoto({
      alt_description: photo.alt_description,
      blur_hash: photo.blur_hash,
      color: photo.color,
      description: photo.description,
      height: photo.height,
      id: photo.id,
      likes: photo.likes,
      urls: photo.urls,
      user: photo.user,
      width: photo.width,
    });
  };

  //close modal
  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const { photoStatistics } = usePhotoStatistics(
    selectedPhoto?.id ?? "",
    false
  );

  return (
    <div>
      <div className="word-grid">
        {usedWords.map((word) => (
          <a
            href="#"
            onClick={() => setSearchWord(word)}
            key={word}
            className="word-link"
          >
            {word}
          </a>
        ))}
      </div>
      {cachedData?.length === 0 && <h1>Data was not Found!!</h1>}

      <ImageGridModal
        cachedData={cachedData}
        closeModal={closeModal}
        openModal={openModal}
        selectedPhoto={selectedPhoto}
        photoStatistics={photoStatistics}
        page={page}
      />
    </div>
  );
};

export default History;
