import { useEffect, useState } from "react";

import UnsplashPhoto, { ModalProp } from "../../Services/interfaces";
import { addScrollListener } from "../../Services/scrollService";
import { useCachedData, usePhotoStatistics } from "../../Services/cacheService";
import ImageGridModal from "../ImageGridModall";

interface Props {
  usedWords: string[];
  setSearchedWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const Main: React.FC<Props> = ({ setSearchedWords, usedWords }) => {
  const [word, setWord] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<ModalProp | null>(null);
  const { data, status, fetchNextPage } = useCachedData(word, true);

  // Infinite Scroll
  useEffect(() => {
    const scrollListener = addScrollListener(fetchNextPage);

    return () => {
      scrollListener();
    };
  }, [fetchNextPage]);

  //fetching first 20 popular pictures
  const initialData: UnsplashPhoto[] = !word
    ? data?.pages[0]
    : data?.pages?.flatMap((page) => page.results);

  //delay fetch for 2 seconds after the user stops writing
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);

    setTimeout(() => {
      setWord(e.target.value);
    }, 2000);
  };

  //store used Words
  useEffect(() => {
    if (
      status === "success" &&
      word.trim() !== "" &&
      !usedWords.includes(word.trim())
    ) {
      setSearchedWords((prevWords: string[]) => [...prevWords, word.trim()]);
    }
  }, [status, word, usedWords, setSearchedWords]);

  //Open Modal
  const openModal = (photo: UnsplashPhoto): void => {
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

  //Close Modal
  const closeModal = (): void => {
    setSelectedPhoto(null);
  };

  const { photoStatistics } = usePhotoStatistics(selectedPhoto?.id ?? "", true);

  return (
    <div>
      <input
        type="text"
        value={searchWord}
        onChange={handleForm}
        className="search-input"
        name="search"
        placeholder="search "
      />
      {initialData?.length === 0 && <h1>no matches were found</h1>}
      <ImageGridModal
        cachedData={initialData}
        openModal={openModal}
        closeModal={closeModal}
        photoStatistics={photoStatistics}
        selectedPhoto={selectedPhoto}
        page={-1}
      />
    </div>
  );
};

export default Main;
