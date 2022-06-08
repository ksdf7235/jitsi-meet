import { useMutation } from "@apollo/client";
import React from "react";
import { EXIT_QUERY } from "./mutation";

function Backbtn(value) {
    const { name } = value;
    const [backdata] = useMutation(EXIT_QUERY);

    const back = () => {
        backdata({
            variables: {
                participantNameKr: name,
            },
        });

        history.back();
    };
    return (
        <div id="back_btn_layout">
            <div id="back_btn" onClick={back}>
                <span>돌아가기</span>
            </div>
        </div>
    );
}

export default Backbtn;
