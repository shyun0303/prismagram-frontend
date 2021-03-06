import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar"
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import Helmet from "react-helmet";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";


const Wrapper = styled.div`
    min-height : 100vh;
`;

const Header = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin : 0 auto;
    margin-bottom:40px;
`;

const HeaderColumn = styled.div``;


const Username = styled.span`
    font-size:26px;
    margin-bottom:10px;
    display:block;
`;
const UsernameRow = styled.div`
    display:flex;
    align-items:center;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px
`;

const Count = styled.li`
    font-size:16px;
    &:not(:last-child){
        margin-right:10px;
    }
`;

const FullName = styled(FatText)`
    font-size:16px;
`

const Bio = styled.p`
    margin: 10px 0px
`;

const Posts = styled.div`

    display:grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows:200px;
    grid-auto-rows: 200px;

`;

export default  ({data,loading,logOut})=> 
{    if(loading){
        return (
        <Wrapper>
            <Loader />    
        </Wrapper>)
    }else if(!loading&&data&&data.seeUser){
        const { seeUser : {
            id,
            avatar,
            username,
            fullName,
            isFollowing,
            isSelf,
            bio,
            followingCount,
            followersCount,
            postsCount,
            posts
        }} = data;
        return (
        <Wrapper>
        <Helmet>
            <title>{username} | Profile</title>
        </Helmet>
        <Header>
            <HeaderColumn>
                <Avatar size="lg" url={avatar}/>
           </HeaderColumn>
             <HeaderColumn>
                 <UsernameRow>              
                <Username>{username}</Username>  
                  {isSelf ? <Button onClick={logOut} text ={"Log out"}/>: <FollowButton id ={id} isFollowing={isFollowing}/>}
                 </UsernameRow>
                <Counts>
                    <Count><FatText text={String(postsCount)} /> posts</Count>
                    <Count><FatText text={String(followersCount)} /> 팔로워</Count>
                    <Count><FatText text={String(followingCount)} /> 팔로잉</Count>
                </Counts>
                <FullName text ={fullName}/>
                <Bio>{bio}</Bio>
            </HeaderColumn>
        </Header>
        <Posts>
            {posts && posts.map(post =>(
                <SquarePost 
                    key = {post.id}
                    likeCount={post.likeCount}
                    commentCount ={post.commentCount}
                    file = {post.files[0]}
                />
            ))}
        </Posts>
                </Wrapper>)
    }
    return null;
}