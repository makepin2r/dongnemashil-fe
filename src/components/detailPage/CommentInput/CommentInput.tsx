import { useMutation } from '@tanstack/react-query';
import { postComment } from 'api/detailApi';
import { Button, Input, Modal } from 'components/common';
import { queryClient } from 'queries/queryClient';
import React, { useState } from 'react';
import { StFooterContatiner, StFooterWrapper } from './CommentInput.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';
import { commentAddListenerAtom } from 'recoil/commentAddListener/commentAddListenerAtom';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const CommentInput = ({
  reviewId,
  $isCommentShow = false,
}: FooterProps) => {
  const [comment, setComment] = useState('');
  const setCommentAddListener = useSetRecoilState(commentAddListenerAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const userState = useRecoilValue(userProfileSelector);
  const navigate = useNavigate();
  // 댓글 등록 함수
  const commentMutation = useMutation(
    (newComment: string) => postComment(reviewId, newComment),
    {
      onSuccess: () => {
        setComment('');
        queryClient.invalidateQueries(['comment', reviewId]);
        setCommentAddListener(true); // 댓글 추가된것을 감지 -> 스크롤 이벤트
      },
      onError: (err) => {
        console.log(err);
        setComment('');
        setIsErrorModalOpen(true);
      },
    }
  );

  // 댓글 입력
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !comment) {
      console.log('🟥댓글은 1초에 1개만 등록 가능합니다.');
      return;
    }

    setIsSubmitting(true);
    commentMutation.mutate(comment);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <StFooterContatiner $isCommentShow={$isCommentShow}>
      <StFooterWrapper onSubmit={onSubmitHandler}>
        {userState?.isLoggedIn ? (
          <>
            {' '}
            <Input
              placeholder="댓글을 입력해주세요"
              onChange={onChangeHandler}
              value={comment}
            />
            <Button inputType="submit" type={'commentInput'}>
              등록
            </Button>
          </>
        ) : (
          <>
            {' '}
            <Input
              type=""
              placeholder="로그인 후 댓글 입력이 가능합니다."
              disabled={true}
            />
            <Button inputType="button" type={'commentInput'} url="/login">
              로그인
            </Button>
            <Modal
              isOpen={isErrorModalOpen}
              onSubmitHandler={() => navigate('/login')}
              onCloseHandler={() => setIsErrorModalOpen(false)}
              title="댓글 등록 실패"
              firstLine="다시 로그인 후 이용해주세요!"
              onSubmitText="로그인"
            />
          </>
        )}
      </StFooterWrapper>
    </StFooterContatiner>
  );
};
