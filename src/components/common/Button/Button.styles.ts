import styled from 'styled-components';
import { theme } from 'style/theme';

export const StButton = styled.button<{
  $width?: string;
  $height?: string;
  $stroke?: string;
  $round?: string;
  $active?: boolean;
}>`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.icon {
    font-size: 20px;
  }

  &.normal {
    height: 2.5rem;
    border-radius: 0.875rem;
    border: 2px solid var(--textcolor, #373737);
    background: rgba(227, 227, 227, 0.75);

    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    padding: 0 1rem;
  }

  &.borderRound {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: ${(props) => props.$round};
    border: ${(props) => props.$stroke} solid ${theme.mainColor};
    background: rgba(247, 246, 246, 0.8);
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

    & span {
      color: ${theme.pointColor};
      font-weight: 700;
      margin-left: 6px;
    }
  }

  &.circleFill {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: 50%;
    background: ${theme.mainColor};
    opacity: 0.9;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

    color: ${theme.whiteColor};
    font-weight: 500;
    font-size: 0.875rem;
    line-height: normal;
  }

  &.onlyText {
    text-align: center;
    font-size: 0.875rem;
    gap: 0.5rem;
  }

  &.onlyTextToggle {
    text-align: center;
    font-size: 0.875rem;
    color: ${(props) =>
      props.$active ? theme.blackColor : theme.mediumGrayColor};
    font-weight: 400;
  }

  &.iconLeft {
    margin-left: 0.5rem;
  }

  &.authNormal {
    ${theme.authButton}
    background-color: ${(props) =>
      props.$active ? theme.mainColor : '#cec7ce'};
    pointer-events: ${(props) => (props.$active ? 'auto' : 'none')};
    color: #ffffff;
  }

  &.authOutline {
    ${theme.authButton}
    background-color: #ffffff;
    color: ${theme.mainColor};
    border: 1px solid ${theme.mainColor};
  }
  &.confirm {
    color: ${(props) => (props.$active ? 'var(--main, #9a7b9a)' : '#A2A2A2')};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 0.5rem;
  }

  & img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  &.authKakao {
    ${theme.authButton}
    background-color: #f6e24b;
    color: ${theme.mainTextColor};

    & > svg {
      position: absolute;
      left: 22px;
      top: calc(50% - 11.5px);
    }
  }
`;

export const StSubmitButton = styled.input<{
  $active?: boolean;
}>`
  width: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.icon {
    font-size: 20px;
  }

  &.normal {
    height: 2.5rem;
    border-radius: 0.875rem;
    border: 2px solid var(--textcolor, #373737);
    background: rgba(227, 227, 227, 0.75);

    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    padding: 0 1rem;
  }

  &.confirm {
    //확인버튼중에 submit 필요한 경우
    color: ${(props) => (props.$active ? 'var(--main, #9a7b9a)' : '#A2A2A2')};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 0.5rem;
  }

  &.onlyText {
    text-align: center;
    font-size: 0.875rem;
    gap: 0.5rem;
  }
`;
