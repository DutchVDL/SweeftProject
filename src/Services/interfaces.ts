/* eslint-disable @typescript-eslint/no-explicit-any */
interface UnsplashPhoto {
  alt_description: string;
  blur_hash: string;
  breadcrumbs: any[];
  color: string;
  created_at: string;
  current_user_collections: any[];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  promoted_at: string | null;
  slug: string;
  sponsorship: {
    impression_urls: string[];
    tagline: string;
    tagline_url: string;
    sponsor: {
      id: string;
      updatedAt: string;
      username: string;
    };
  };
  topic_submissions: any;
  updated_at: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
  };
  width: number;
}

export interface ModalProp {
  alt_description: string;
  blur_hash: string;
  color: string;
  description: string;
  height: number;
  id: string;
  likes: number;
  urls: {
    full: string;
  };
  user: {
    username: string;
  };
  width: number;
}

export default UnsplashPhoto;

export interface PhotoStatistics {
  likes: {
    total: number;
  };
  downloads: {
    total: number;
  };
  views: {
    total: number;
  };
}

export interface ImageGridModalProps {
  cachedData: UnsplashPhoto[] | any;
  openModal: (photo: UnsplashPhoto) => void;
  closeModal: () => void;
  selectedPhoto: UnsplashPhoto | any;
  photoStatistics: PhotoStatistics | null;
  page: number;
}
