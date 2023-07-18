import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import React, { useState } from "react";

import { dummy } from "./dummy";
import { EXIT_QUERY, LOG_EXIT_QUERY } from "./mutation";

function Backbtn(value) {
    const dbNow = dayjs().add(9, "hour");
    const [EnterTime, setEnterTime] = useState(dbNow);
    const { name, location } = value;
    const hostNameEng = location.substr(1);
    const hostNameKr = dummy
        .filter((a) => a.roomNameEng === hostNameEng)
        .map((data) => data.roomNamekr)[0];
    const [backdata] = useMutation(EXIT_QUERY);
    const [logbackdata] = useMutation(LOG_EXIT_QUERY);

    const back = () => {
        logbackdata({
            variables: {
                participantNameKr: name,
                hostNameEng,
                hostNameKr,
                enteredDate: EnterTime,
            },
        });
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
