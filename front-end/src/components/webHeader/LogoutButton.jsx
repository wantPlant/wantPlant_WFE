import styled from 'styled-components';
import Logout from '../../assets/images/logout.svg';

export default function BookButton(){
    return(
        <Wrapper>
            <Img src={Logout}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 20px;
    height: 20px;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`