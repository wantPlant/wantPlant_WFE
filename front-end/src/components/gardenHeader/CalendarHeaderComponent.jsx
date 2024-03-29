import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/** 정원 헤더 컴포넌트의 캘린더 부분 */
export default function CalendarHeaderComponent({ selected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/calendar");
  }

  // 선택되었을 때엔 커진 버튼
  if (selected) {
    return (
      <SelectedWrapper onClick={handleClick}>
        <SelectedText>캘린더</SelectedText>
      </SelectedWrapper>
    );
  } else {
    return (
      <Wrapper onClick={handleClick}>
        <Text>캘린더</Text>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw 1vw 0 0;
  width: 5vw;
  height: 2.45vw;
  background-color: ${({ theme }) => theme.colors.pink01};
  margin: 0 2px;
  cursor: pointer;

  @media (max-width: 1280px) {
    border-radius: 15px 15px 0 0;
    width: 68px;
    height: 30px;
  }
`;

const SelectedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw 1vw 0 0;
  width: 5vw;
  height: 3.1vw;
  background-color: #FFE7DD;
  margin: 0 2px;
  cursor: pointer;

  @media (max-width: 1280px) {
    border-radius: 15px 15px 0 0;
    width: 68px;
    height: 40px;
  }
`;

const Text = styled.span`
  font-size: 1.2vw;
  color: black;
  padding: 2px 10px;
  border-radius: 15px;
  transition: background-color 0.25s;

  ${Wrapper}:hover &{
    background-color: rgba(236, 243, 232, 0.4);
  }
  @media (max-width: 1280px) {
    font-size: 16px;
  }
`;

const SelectedText = styled.span`
  font-size: 1.5vw;
  color: black;

  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;
