import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import Modal from "react-modal";
import logo_pot from "../../assets/images/logo_pot.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteAlertModal from "./DeleteAlertModal";
import dogCatSwag from "../../assets/images/dogcat_swag.svg";

const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOutAnimation = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export default function EditTodoModal({ isOpen, EditTodoModalHandler }) {
  Modal.setAppElement("#root");
  const [calenderDate, setCalenderDate] = useState("");
  const [timeStartDate, setTimeStartDate] = useState(new Date());
  const [timeEndDate, setTimeEndDate] = useState(new Date());
  const [isDeleteAlertModalOpen, setIsDeleteAlertModalOpen] = useState(false);

  const DeleteAlertModalHandler = (isOpen) => {
    setIsDeleteAlertModalOpen(isOpen);
  };

  /* react-modal style props 속성 */
  const customStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    content: {
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      transform: "none",
      backgroundColor: "#F4FFF2",
      borderRadius: "20px",
      width: "534px",
      height: "550px",
      padding: "20px",
      boxShadow: "0px 0px 10px 0px gray",
    },
  };

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div>
        <ModalTodoDateInputLabel onClick={props.onClick} ref={ref}>
          <ModalTodoDateInputValue>
            {props.value || props.placeholder
              ? props.value || props.placeholder
              : "시작 날짜를 선택해주세요."}
          </ModalTodoDateInputValue>
          <ModalTodoDateCalenderIcon onClick={props.onClick} />
        </ModalTodoDateInputLabel>
      </div>
    );
  });

  return (
    <ModalContainer isOpen={isOpen} style={customStyles}>
      <ModalContent>
        <ModalImageWrapper>
          <PotIcon alt="Dog Icon" />
        </ModalImageWrapper>
        <ModalTitleWrapper>할 일을 수정해주세요.</ModalTitleWrapper>
        <ModalTodoTextWrapper>
          <ModalGardenTodoTextInput placeholder="(원래 투두 내용)" />
        </ModalTodoTextWrapper>
        <ModalTodoDateWrapper>
          <DatePicker
            wrapperClassName="datepicker"
            selected={calenderDate}
            onChange={(date) => setCalenderDate(date)}
            customInput={<CustomInput />}
          />
        </ModalTodoDateWrapper>
        <ModalTodoTimeContainer>
          <ModalTodoTimeLeftWrapper>
            진행 시간을 입력해주세요.
          </ModalTodoTimeLeftWrapper>
          <ModalTodoTimeRightWrapper>
            <ModalTodoTimeBox
              selected={timeStartDate} // 현재 선택된 날짜
              onChange={(date) => setTimeStartDate(date)} // 날짜가 변경되었을 때 실행되는 함수
              selectsStart // DatePicker가 시작 날짜를 선택하는 데 사용되는 것임을 나타냅니다.
              startDate={timeStartDate} // 범위 선택기에서 사용자가 선택할 수 있는 시작 날짜를 결정
              endDate={timeEndDate} // 범위 선택기에서 사용자가 선택할 수 있는 종료 날짜를 결정
              showTimeSelect // 사용자가 시간을 선택할 수 있도록 DatePicker에 시간 선택 옵션을 활성화
              showTimeSelectOnly // 날짜를 선택하는 대신 시간만을 선택할 수 있게 하는 옵션
              timeIntervals={10} // 사용자가 선택할 수 있는 시간 간격을 분 단위로 설정
              timeCaption="Start Time" // 시간 선택 부분 옆에 표시되는 레이블
              dateFormat="HH:mm" // 사용자에게 날짜와 시간을 어떻게 표시할지를 결정하는 포맷
            />
            ~
            <ModalTodoTimeBox
              selected={timeEndDate}
              onChange={(date) => setTimeEndDate(date)}
              selectsEnd
              startDate={timeStartDate}
              endDate={timeEndDate}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="End Time"
              dateFormat="HH:mm"
            />
          </ModalTodoTimeRightWrapper>
        </ModalTodoTimeContainer>
        <DeleteTodoButton onClick={() => DeleteAlertModalHandler(true)}>
          <DeleteTodoIcon />
          삭제하기
        </DeleteTodoButton>
        <ModalButtonWrapper>
          <ModalButton
            iscomplete="true"
            onClick={() => EditTodoModalHandler(false)}
          >
            완료
          </ModalButton>
          <ModalButton onClick={() => EditTodoModalHandler(false)}>
            취소
          </ModalButton>
        </ModalButtonWrapper>
      </ModalContent>
      <DeleteAlertModal
        isOpen={isDeleteAlertModalOpen}
        data="투두를"
        DeleteAlertModalHandler={DeleteAlertModalHandler}
      />
    </ModalContainer>
  );
}

/* Modal */
const ModalContainer = styled(Modal)`
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    animation: ${(props) => (props.isOpen ? fadeInAnimation : fadeOutAnimation)} 0.25s ease-in-out;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

/* ModalTitleImage */
const ModalImageWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 15%;
  margin: 10px 0;
`;

const PotIcon = styled.img.attrs({
  src: dogCatSwag,
})`
  width: fit-content;
  height: 100%;
`;

/* ModalTitle */
const ModalTitleWrapper = styled.div`
  width: 100%;
  height: 10%;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 20px;
`;

/* ModalTodoText */
const ModalTodoTextWrapper = styled.div`
  width: 75%;
  height: 10%;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  margin: 10px 0px;
`;

const ModalGardenTodoTextInput = styled.input`
  width: 95%;
  height: 80%;
  border: none;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 15px;
  padding: 0;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

/* ModalTodoDate */
const ModalTodoDateWrapper = styled.div`
  width: 75%;
  height: 10%;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  margin: 10px 0px;
  display: grid;
`;

const ModalTodoDateInputLabel = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTodoDateInputValue = styled.div`
  padding-left: 15px;
`;

const ModalTodoDateCalenderIcon = styled(AiFillCalendar)`
  padding-right: 15px;
  width: 25px;
  height: 25px;
`;

/* ModalTodoTime */
const ModalTodoTimeContainer = styled.div`
  width: 75%;
  height: 10%;
  display: flex;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  margin: 10px 0px 30px;
`;

const ModalTodoTimeLeftWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;

const ModalTodoTimeRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const ModalTodoTimeBox = styled(DatePicker)`
  width: 60%;
  height: 25px;
  margin-left: 15px;
  text-align: center;
`;

/* Modal Button */
const ModalButtonWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const ModalButton = styled.button`
  margin: 20px;
  height: 70%;
  width: 23%;
  border-radius: 20px;
  border: 2px solid #5c846d;
  background-color: #f4fff2;
  color: #5c846d;
  font-size: 25px;
  font-weight: 500;

  ${(props) =>
    props.iscomplete &&
    css`
      background-color: ${({ theme }) => theme.colors.green06};
      color: white;
    `};
`;

const DeleteTodoButton = styled.button`
  position: absolute;
  width: 15%;
  height: 5%;
  left: 65px;
  top: 415px;
  padding: 0;
  background-color: #f4fff2;
  border: none;
`;

const DeleteTodoIcon = styled(FaRegTrashAlt)`
  margin-right: 5px;
`;
