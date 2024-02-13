import styled from "styled-components";
import todoEmpty from "../../assets/images/todoEmpty.svg";
import todoFill from "../../assets/images/todoFill.svg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

/** 화분 정보 -> 투두 */
export default function TodoContainer({ todoTitle, complete }) {
    // TODO : 누르면 complete 변경되는거 PATCH
    if (complete) {
        return (
            <Container>
                <TodoTitleContainer>
                    <WateringWrapper src={todoFill} />
                    <TodoTextWrapper>{todoTitle}</TodoTextWrapper>
                </TodoTitleContainer>
                <EditButton />
            </Container>
        )
    } else return (
        <Container>
            <TodoTitleContainer>
                <WateringWrapper src={todoEmpty} />
                <TodoTextWrapper>{todoTitle}</TodoTextWrapper>
            </TodoTitleContainer>
            <EditButton />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: auto;
    height: 50%;
    margin: 10px 20px;
    align-items: center;
    justify-content: space-between;
`

const TodoTitleContainer = styled.div`
    display: flex;
    cursor: pointer;
`

const WateringWrapper = styled.img`
    height: 20px;
    margin-right: 10px;
`

const TodoTextWrapper = styled.div`
    
`

const EditButton = styled(HiOutlineDotsHorizontal)`
    height: 16px;
    width: 16px;
    padding: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.25s;

    ${Container}:hover &{
        opacity: 1;
    }
`