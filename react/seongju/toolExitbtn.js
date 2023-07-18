import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { dummy } from "./dummy";
import { EXIT_QUERY, LOG_EXIT_QUERY } from "./mutation";

function Exitbtn({ children }) {
    const dbNow = dayjs().add(9, "hour");
    const [Enter, setEnter] = useState(dbNow);
    const [backdata] = useMutation(EXIT_QUERY);
    const [logbackdata] = useMutation(LOG_EXIT_QUERY);
    const hostNameEng = window.location.pathname.substr(1);
    const hostNameKr = dummy
        .filter((a) => a.roomNameEng === hostNameEng)
        .map((data) => data.roomNamekr)[0];

    const back = () => {
        logbackdata({
            variables: {
                participantNameKr: children.props.name,
                hostNameEng,
                hostNameKr,
                enteredDate: Enter,
            },
        });
        backdata({
            variables: {
                participantNameKr: children.props.name,
            },
        });
    };
    return (
        <div id="ExitBtn" onClick={back}>
            {children}
        </div>
    );
}

export default Exitbtn;
