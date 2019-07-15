import React from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import useInput from "../Hooks/useInput";
import Input from "./Input";
import { Instagram, Compass, HeartEmpty, User} from "./Icons";
import {useQuery} from "react-apollo-hooks";
import { ME } from "../SharedQueries";



const Header = styled.header`
    ${props=>props.theme.whiteBox}
    width:100%;
    border: 0;
    border-bottom:${props=>props.theme.boxBorder};
    border-radius:0px;
    margin-bottom: 60px;
    display:flex;
    justify-content:center;
    align-items:center
    padding:25px 0px;
    background-color:white;
    z-index:2;
`;
const HeaderWrapper = styled.div`
    width:100%;
    max-width:${props=>props.theme.maxWidth};
    display:flex;
    justify-content:center;
`;

const HeaderColumn = styled.div`

width:33%;
text-align:center;
&:first-child{
    margin-right:auto;
    text-align:left;
}
&:last-child{
    margin-left:auto;
    text-align:right;
}
`;
const SearchInput = styled(Input)`
 background-color : ${props=>props.theme.bgColor};
 padding: 5px;
 height: auto;
 font-size:14px;
 border-radiuts : ${props=>props.theme.borderRadius};
 text-align:center;
 width:70%
 &::placeholder{
     opacity:0.7;
     font-weight: 200;
 };
 

`
const HeaderLink = styled(Link)`
    &:not(:last-child){
     margin-right:30px;
    }
`

export default withRouter(({ history }) => {
    const search = useInput("");
    const {data} = useQuery(ME);

    const onSearchSubmit = e => {
      e.preventDefault();
      history.push(`/search?term=${search.value}`);
    };
    return (
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <Link to="/">
              <Instagram />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            <form onSubmit={onSearchSubmit}>
              <SearchInput value={search.value}
               placeholder="Search"
              onChange={search.onChange} />
            </form>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderLink to="/explore">
              <Compass />
            </HeaderLink>
            <HeaderLink to="/notifications">
              <HeartEmpty />
            </HeaderLink>
           {!data.me ?  <HeaderLink to="/#">
              <User />
            </HeaderLink> :  <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    );
  });