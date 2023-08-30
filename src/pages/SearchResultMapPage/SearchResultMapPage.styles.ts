import styled from 'styled-components';

export const StResultMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  & button {
    position: absolute;
    z-index: 1000;

    // 뒤로가기 버튼
    &:first-of-type {
      width: 38px;
      height: 38px;
      top: 20px;
      left: 20px;
    }
  }
`;