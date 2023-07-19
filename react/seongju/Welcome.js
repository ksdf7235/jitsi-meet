// import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { dummy, dummy2 } from "./dummy";
// import { ENTER_QUERY } from "./mutation";

const Layout = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
`;

const BlockLayout = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BlockContentLayout = styled.div`
    width: 40%;
    min-height: 80vh;
    background-color: #f0f1f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    border-radius: 2rem;
    margin: 1rem;
`;

const BlockGrid = styled.div`
    width: 100%;
    display: grid;
    margin-top: 1rem;
    min-height: 800px;
    gap: 2rem;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
`;

const BlockHeader = styled.div`
    min-height: 150px;
    width: 100%;
    height: 40%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid black;
    h1 {
        color: black;
        font-size: 3rem;
        text-align: center;
        margin-bottom: 1rem;
        strong {
            color: red;
            font-weight: 700;
        }
        b {
            color: blue;
            font-weight: 700;
        }
    }
    span {
        font-size: 1rem;
        color: gray;
        text-align: center;
    }
`;

const EnterBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 32px;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
    border-radius: 10px;
    box-shadow: 0px 36px 62px rgba(0, 0, 0, 0.11);
`;

const BlockDivide = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.div`
    margin-left: 2rem;
    font-size: 3rem;
    font-weight: 700;
`;

const Button = styled.div`
    width: 100%;
    min-height: 3rem;
    background: linear-gradient(45deg, #9281e1, #de2f89);
    font-size: 2rem;
    font-weight: 700;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    #btn_img {
        margin-right: 5px;
    }
    a:link {
        color: white;
        text-decoration: none;
    }
    a:visited {
        color: white;
        text-decoration: none;
    }
    a:hover {
        color: white;
        text-decoration: none;
    }
`;

const Num = styled.div`
    margin-left: 2rem;
    font-size: 3rem;
    font-weight: 700;
`;

function Welcome(props) {
    const { name } = props;
    // const [enterData] = useMutation(ENTER_QUERY);
    const onClick = (hostNameKr, hostNameEng) => {
        // enterData({
        //     variables: {
        //         participantNameKr: name,
        //         hostNameEng,
        //         hostNameKr,
        //     },
        // });
    };
    return (
        <Layout>
            <BlockLayout>
                <BlockContentLayout>
                    <BlockHeader>
                        <h1>
                            스마트 <strong>경로당</strong> 회의방 목록
                        </h1>
                        <span>입장하실 회의방 버튼을 눌러주세요</span>
                    </BlockHeader>
                    <BlockGrid>
                        {dummy.map((item, i) => (
                            <EnterBlock key={i}>
                                <BlockDivide>
                                    <Num>
                                        <span>{i + 1}</span>
                                    </Num>
                                    <Title>
                                        <span>{item.roomNamekr}</span>
                                    </Title>
                                </BlockDivide>
                                <BlockDivide>
                                    <Button
                                        onClick={() =>
                                            onClick(
                                                item.roomNamekr,
                                                item.roomNameEng
                                            )
                                        }
                                    >
                                        <a href={`${item.roomNameEng}`}>
                                            <img
                                                id="btn_img"
                                                src="/images/video.svg"
                                            ></img>
                                            <span>입장하기</span>
                                        </a>
                                    </Button>
                                </BlockDivide>
                            </EnterBlock>
                        ))}
                    </BlockGrid>
                </BlockContentLayout>

                <BlockContentLayout>
                    <BlockHeader>
                        <h1>
                            스마트 <b>타운</b> 회의방 목록
                        </h1>
                        <span>입장하실 회의방 버튼을 눌러주세요</span>
                    </BlockHeader>
                    <BlockGrid>
                        {dummy2.map((item, i) => (
                            <EnterBlock key={i}>
                                <BlockDivide>
                                    <Num>
                                        <span>{i + 1}</span>
                                    </Num>
                                    <Title>
                                        <span>{item.roomNamekr}</span>
                                    </Title>
                                </BlockDivide>
                                <BlockDivide>
                                    <Button onClick={() => onClick()}>
                                        <a href={`${item.roomNameEng}`}>
                                            <img
                                                id="btn_img"
                                                src="/images/video.svg"
                                            ></img>
                                            <span>입장하기</span>
                                        </a>
                                    </Button>
                                </BlockDivide>
                            </EnterBlock>
                        ))}
                    </BlockGrid>
                </BlockContentLayout>
            </BlockLayout>
        </Layout>
    );
}
export default Welcome;
