import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/nxdf_Header";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProfileUrl, PubKey } from "../component/lib/atom";
import cookies from "react-cookies";
import { getTestNFTLIST } from "../component/lib/api";
import { ethers } from "ethers";
import D_one from "../artifacts/contracts/nftTest.sol/TRabbit.json";
/*
 * Replace the elements below with your own.
 *
 * Note: The corresponding styles are in the ./index.styled-components file.
 */
const ProfilePage = (props) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 10);
    const [PubK, setPubkey] = useRecoilState(PubKey);
    const [profile, setProfile] = useRecoilState(ProfileUrl);
    const contractAddress = "0xD8b004C7e56760a9EB704A1CeCF89A7B1989BE83";
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider?.getSigner();
    const contract = new ethers.Contract(contractAddress, D_one.abi, signer);
    const [stakeData, setStake] = useState({});
    const pubkey = cookies.load("pubkey");
    const profileCookie = cookies.load("profile");
    const { isLoading, data } = useQuery(["nftdata", pubkey], getTestNFTLIST);
    useEffect(() => {
        if (PubK === "") {
            return setPubkey(pubkey);
        }
        if (!profileCookie || (profileCookie === "" && data.length !== 0)) {
            data?.map(async (props) => {
                console.log(props?.name?.split("#")[1]);
                const result = await contract?.getIsBlock(
                    props?.name?.split("#")[1]
                );
                console.log(`여기:${result}`);
            });
        }
        // data?.map((prop) => console.log(prop));
    }, [pubkey, PubK, setPubkey, isLoading, profileCookie]);

    const SetItem = (prop) => {
        setStake(prop);
    };
    const SetStake = async () => {
        const result = await contract?.setIsBlock(
            stakeData?.name?.split("#")[1]
        );
        if (result) {
            cookies.save("profile", stakeData, {
                path: "/", // 쿠키 값을 저장하는 서버 경로
                expires, // 유효 시간
            });
        }
    };
    const SetUnStake = async () => {
        const result = await contract?.setIsBlockBeZero(
            profileCookie?.name?.split("#")[1]
        );
        if (result) {
            setStake("");
            cookies.save("profile", "", {
                path: "/", // 쿠키 값을 저장하는 서버 경로
                expires, // 유효 시간
            });
        }
    };

    /**
     * Redirects to another page generated by replacing the path in the original URL
     * with the given path.
     *
     * @param {(string)} pathname - The path to navigate to.
     * @returns {Function}
     */
    return (
        <Welcome>
            <Header />
            <Div>
                <h1>Utility Setting</h1>
                <WalletSec>
                    <Wel>
                        <span>polygon</span>
                        <span>:</span>
                        <span>{pubkey}</span>
                    </Wel>
                    <span>
                        Your MetaAxel PFP will be registered by staking program.
                        The smart contract lets you not to transfer while you
                        use NXDF Meet service. However, the PFP holder can
                        unstake whenever he/she wants not to use this service in
                        this page.
                    </span>
                </WalletSec>
                <ProfileSetting>
                    <MyNFTs>
                        <h1>My NFTs</h1>
                        <MyNFTsSec>
                            {data?.map((props, i) => (
                                <MyNFTContent
                                    stake={
                                        stakeData?.name?.split("#")[1] ===
                                        props.name?.split("#")[1]
                                    }
                                    key={i}
                                    onClick={() => SetItem(props)}
                                >
                                    <img src={props?.image} />
                                    <MynftsMiniDesc>
                                        <span>{props?.name}</span>
                                        <span>
                                            {`Type : ${props?.properties?.files[0]?.type}`}
                                        </span>
                                    </MynftsMiniDesc>
                                </MyNFTContent>
                            ))}
                        </MyNFTsSec>
                    </MyNFTs>
                    <MyStake>
                        <StakeBtnSec onClick={SetStake} />
                        <UnStakeBtnSec onClick={SetUnStake} />
                    </MyStake>
                    <MyProfile>
                        <h1>My Profile Utility</h1>
                        <MyNFTsSec>
                            <SeletctNFT>
                                {!profileCookie || profileCookie !== "" ? (
                                    <>
                                        <SeletctNFTImg
                                            src={
                                                profileCookie?.image ??
                                                "/images/avatar.png"
                                            }
                                            height={"50%"}
                                            width={"100%"}
                                        />
                                        <NFTTitleSec>
                                            <h4>{profileCookie?.name}</h4>
                                            <span>
                                                {`Type : ${
                                                    profileCookie?.properties
                                                        ?.files[0]?.type ??
                                                    "None"
                                                }`}
                                            </span>
                                        </NFTTitleSec>
                                        <AttrSec>
                                            {profileCookie?.attributes?.map(
                                                (data, i) => (
                                                    <AttrDiv key={"attr" + i}>
                                                        <AttrSpan>
                                                            {data?.trait_type}
                                                        </AttrSpan>
                                                        <AttrSpan>
                                                            {data?.value}
                                                        </AttrSpan>
                                                    </AttrDiv>
                                                )
                                            )}
                                        </AttrSec>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </SeletctNFT>
                        </MyNFTsSec>
                    </MyProfile>
                </ProfileSetting>
            </Div>
        </Welcome>
    );
};

// 제일 바깥쪽 레이아웃 잡기
const Welcome = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AttrSec = styled.div`
    width: 100%;
    margin-top: 1rem;
`;
const NFTTitleSec = styled.div`
    width: 100%;
    margin: 1rem 0px;
`;

const AttrDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const AttrSpan = styled.span`
    margin-bottom: 0.5rem;
    display: block;
    width: 40%;
    background-color: white;
    object-fit: cover;
`;

const Wel = styled.div`
    padding: 1rem 0px;
`;

const Div = styled.div`
    width: 50%;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    color: #797979;

    h1 {
        text-align: center;
    }
`;

const WalletSec = styled.div`
    margin: 2rem 0px;
    display: flex;
    flex-direction: column;
`;

const StakeBtnSec = styled.div`
    cursor: pointer;
    margin: 0.5rem;
    padding: 0.5rem;
    min-height: 60px;
    background-image: url("/images/stake_icon.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;
const UnStakeBtnSec = styled(StakeBtnSec)`
    background-image: url("/images/unstake_icon.svg");
`;

const ProfileSetting = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MyNFTs = styled.div`
    width: 40%;
`;

const MyNFTsSec = styled.div`
    width: 100%;
    min-height: 400px;
    margin-top: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    background-color: #fafdff;
`;

const MyNFTContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem;
    border: ${(props) =>
        props.stake ? "1px solid black" : "1px solid #e0e0e0"};
    img {
        width: 10%;
        height: 50%;
        min-height: 50px;
        min-width: 50px;
        margin-right: 0.5rem;
    }
`;
const MyStake = styled.div`
    width: 20%;
`;

const MynftsMiniDesc = styled.div`
    display: flex;
    flex-direction: column;
`;

const SeletctNFT = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const SeletctNFTImg = styled.img`
    background-color: gray;
    min-height: 200px;
    min-width: 200px;
    max-height: 300px;
    max-width: 300px;
`;
const MyProfile = styled.div`
    width: 40%;
`;

export const ImgSt = styled.img`
    width: 100%;
    height: 100%;
    min-height: 50px;
    min-width: 50px;
`;

export default ProfilePage;
