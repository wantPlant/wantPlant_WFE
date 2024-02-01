import styled from "styled-components";
import { useTheme } from "styled-components";

import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import GardenHeader from "../../components/gardenHeader/GardenHeader";
import GardenSecond from "./GardenSecond";
import Calender from "../../components/calender/Calender";

import moment from "moment";

import DatePicker from "react-datepicker";

import { FaCirclePlus } from "react-icons/fa6";

export default function CalenderPage() {
    const location = useLocation();
    // location = "/garden/{카테고리}"
    const pathname = location.pathname.split("/");
    // pathname = ["", "garden", "{카테고리}"] 저장됨
    const category = pathname[2] ? pathname[2].toUpperCase() : "";

    // 태그 추가 옵션들
    const [selectedSlot, setSelectedSlot] = useState({ start: new Date() });
    const [tagName, setTagName] = useState("");
    const [timeStartDate, setTimeStartDate] = useState(new Date(0));
    const [timeEndDate, setTimeEndDate] = useState(new Date(0));
    const [selectedTagColor, setSelectedTagColor] = useState("");

    const theme = useTheme();
    const [tagColors, setTagColors] = useState([]);

    const [tags, setTags] = useState([]);

    const addTagHandler = () => {
        const formattedDate = moment(selectedSlot.start).format("YYYY-MM-DD");

        const sameDayEvents = tags.filter((event) => moment(event.start).isSame(selectedSlot.start, "day"));
        if (sameDayEvents.length >= 2) {
            alert("같은 날에 추가할 수 있는 태그의 최대 개수는 2개입니다.");
            return;
        }

        const newTag = {
            title: tagName,
            start: moment(formattedDate).toDate(),
            end: moment(formattedDate).toDate(),
            selectedTagColor: selectedTagColor,
        };

        setTags([...tags, newTag]);
    };

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...{
                style: {
                    backgroundColor: event.selectedTagColor,
                },
            },
        }),
        [],
    );

    useEffect(() => {
        const themeTagColors = Object.entries(theme.colors)
            .filter(([key, value]) => key.startsWith("tag")) // 'tag'로 시작하는 키만 선택
            .map(([key, value]) => value); // 선택된 키-값 쌍을 객체로 변환

        if (tagColors.length === 0) {
            setTagColors(themeTagColors);
        }
    }, [selectedSlot, tagColors, tags]);

    return (
        <Wrapper>
            <GardenHeader category={category} />
            <Content className="Content">
                <CalenderTitleContainer className="CalenderTitleWrapper">
                    <CalenderTitleInput placeHolder="캘린더 제목을 입력해주세요!" />
                </CalenderTitleContainer>
                <FullContainer className="FullContainer">
                    <LeftContainer className="LeftContainer">
                        <CalenderWrapper>
                            <Calender setSelectedSlot={setSelectedSlot} tags={tags} eventPropGetter={eventPropGetter} />
                        </CalenderWrapper>
                    </LeftContainer>
                    <RightContainer className="RightContainer">
                        <RightWrapper className="RightWrapper">
                            <TodoListContentWrapper className="TodoListContentWrapper">
                                <TodoListContentDateWrapper className="TodoListContentDateWrapper">
                                    <DateBox>
                                        {(selectedSlot ? selectedSlot.start : new Date()).getMonth() + 1}
                                        <DateUnit>월</DateUnit>
                                    </DateBox>
                                    <DateBox>
                                        {(selectedSlot ? selectedSlot.start : new Date()).getDate()}
                                        <DateUnit>일</DateUnit>
                                    </DateBox>
                                </TodoListContentDateWrapper>
                            </TodoListContentWrapper>
                            <FixPlanContentWrapper className="FixPlanContentWrapper">
                                <FixPlanContentTitleWrapper className="FixPlanContentTitleWrapper">
                                    중요한 일정을 고정해보세요!
                                </FixPlanContentTitleWrapper>
                                <FixPlanContentDateWrapper className="FixPlanContentDateWrapper">
                                    <DateBox>
                                        {(selectedSlot ? selectedSlot.start : new Date()).getMonth() + 1}
                                        <DateUnit>월</DateUnit>
                                    </DateBox>
                                    <DateBox>
                                        {(selectedSlot ? selectedSlot.start : new Date()).getDate()}
                                        <DateUnit>일</DateUnit>
                                    </DateBox>
                                </FixPlanContentDateWrapper>
                                <FixPlanContentTagNameInput
                                    placeHolder="태그 이름을 작성해주세요."
                                    onChange={(e) => setTagName(e.currentTarget.value)}
                                />
                                <FixPlanContentTimeWrapper className="FixPlanContentTimeWrapper">
                                    <FixPlanContentTimeTextWrapper>시간을 입력해주세요.</FixPlanContentTimeTextWrapper>
                                    <FixPlanContentTimeBox className="FixPlanContentTimeBox">
                                        <FixPlanContentTimeData
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
                                        <FixPlanContentTimeDataUnit>~</FixPlanContentTimeDataUnit>
                                        <FixPlanContentTimeData
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
                                    </FixPlanContentTimeBox>
                                </FixPlanContentTimeWrapper>
                                <FixPlanContentTagColorWrapper>
                                    {tagColors.map((color, idx) => {
                                        return (
                                            <FixPlanContentTagColorCircleBtn
                                                key={idx}
                                                tagcolor={color}
                                                onClick={(e) => {
                                                    setSelectedTagColor(e.currentTarget.getAttribute("tagcolor"));
                                                }}
                                            />
                                        );
                                    })}
                                </FixPlanContentTagColorWrapper>
                                <FixPlanContentAddButtonWrapper>
                                    <FixPlanContentAddButton onClick={() => addTagHandler()} />
                                </FixPlanContentAddButtonWrapper>
                            </FixPlanContentWrapper>
                        </RightWrapper>
                    </RightContainer>
                </FullContainer>
            </Content>
            <GardenSecond />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1280px) {
        height: 800px;
        width: 1120px;
    }
`;

const Content = styled.div`
    height: 62vw;
    width: 90%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    border: 1px solid black;
    background-color: #ffe7dd;
`;

const CalenderTitleContainer = styled.div`
    width: 65%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CalenderTitleInput = styled.input`
    width: 14vw;
    height: 2vw;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 0.8vw;
    background-color: white;
    font-size: 1vw;
    padding-left: 1vw;
`;

const FullContainer = styled.div`
    width: 100%;
    height: 55vw;
    display: flex;
`;

const LeftContainer = styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CalenderWrapper = styled.div`
    width: 93%;
    height: 93%;
    margin: 1vw;
    background-color: white;
`;

const RightContainer = styled.div`
    width: 35%;
    height: 100%;
`;

const RightWrapper = styled.div`
    width: 93%;
    height: 93%;
    margin: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TodoListContentWrapper = styled.div`
    width: 90%;
    height: 31vw;
    border: 1px solid black;
    background-color: white;
    border-radius: 1vw;
    margin-bottom: 2vw;
`;

const TodoListContentDateWrapper = styled.div`
    width: 5.8vw;
    height: 2vw;
    border: 1px solid black;
    margin: 1vw;
    background-color: ${({ theme }) => theme.colors.pink02};
    border-radius: 0.7vw;
    font-size: 1.4vw;
    font-weight: 600;
    font-family: Pretendard;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FixPlanContentWrapper = styled.div`
    width: 90%;
    height: 18vw;
    border: 1px solid black;
    border-radius: 1vw;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const FixPlanContentTitleWrapper = styled.div`
    width: 100%;
    height: 1vw;
    margin: 1vw;
    font-size: 1vw;
    font-family: Pretendard;
    font-weight: 600;
    letter-spacing: 0em;
`;

const FixPlanContentDateWrapper = styled.div`
    width: 5.8vw;
    height: 2vw;
    border: 1px solid black;
    margin-left: 1vw;
    background-color: ${({ theme }) => theme.colors.pink02};
    border-radius: 0.7vw;
    font-size: 1.4vw;
    font-weight: 600;
    font-family: Pretendard;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DateBox = styled.div`
    margin: 2px;
`;

const DateUnit = styled.span`
    display: inline-block;
    font-size: 0.9vw;
`;

const FixPlanContentTagNameInput = styled.input`
    width: 65%;
    height: 2.2vw;
    border: 1px solid black;
    margin: 1vw;
    border-radius: 1vw;
    padding-left: 10px;
`;

const FixPlanContentTimeWrapper = styled.div`
    width: 75%;
    height: 2.2vw;
    border: 1px solid black;
    margin-left: 1vw;
    border-radius: 1vw;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FixPlanContentTimeBox = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: end;
    margin-left: auto;
`;

const FixPlanContentTimeTextWrapper = styled.div`
    width: 55%;
    height: 100%;
    font-size: 1vw;
    font-family: Pretendard;
    font-weight: 600;
    letter-spacing: 0em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FixPlanContentTimeDataUnit = styled.div`
    height: auto;
    font-size: 1vw;
`;

const FixPlanContentTimeDataWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FixPlanContentTimeData = styled(DatePicker)`
    width: 2.5vw;
    height: auto;
    text-align: center;
    font-size: 0.8vw;
    opacity: 0.5;
    border: none;
`;

const FixPlanContentTagColorWrapper = styled.div`
    width: 100%;
    height: 3vw;
    margin-top: 0.3vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FixPlanContentTagColorCircleBtn = styled.button`
    width: 1.3vw;
    height: 1.3vw;
    border-radius: 50%; // 항상 원형을 유지하기 위해 50%로 설정
    border: 1px solid black;
    background-color: ${(props) => props.tagcolor};
    margin: 0.7vw;
`;
const FixPlanContentAddButtonWrapper = styled.div`
    width: 100%;
    height: 3vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FixPlanContentAddButton = styled(FaCirclePlus)`
    width: auto;
    border-radius: 2vw;
    height: 2vw;
    color: #ffe7dd;
    background-color: #ff824c;
`;
