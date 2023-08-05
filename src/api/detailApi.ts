import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance, axiosUserInstance } from './api';

type Comment = {
  comment_id: number;
  username: string;
  profile_img: string;
  comment: string;
};

export type ReviewDetail = {
  id: number;
  content: string;
  img_url: string;
  video_url: string;
  createdAt: string;
  nickname: string;
  profileImgUrl: string;
  address: string;
  comments: Comment[];
};

export const getReviewDetail = async (
  detailId: undefined | string
): Promise<ReviewDetail> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<ReviewDetail> = await axiosUserInstance.get(
      `/reviews/${detailId}`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const likeReview = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosUserInstance.post(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const checkLikeStatus = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosUserInstance.get(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
