import axios from "axios";
import {
    REQ_START,
    MESSAGE_SUCCESS,
    MESSAGE_FAILURE,
    FETCH_MESSAGE_BY__CHAT_ID
} from "./actionTypes";


export const req = () => {
    console.log("yo");
    return { type: REQ_START };
};

export const reqSuccess = (data) => ({
    type: MESSAGE_SUCCESS,
    data,
});

export const reqFailure = (error) => ({
    type: MESSAGE_FAILURE,
    error: error,
});



export const reqMessageByChatId = (id) => ({
    type: FETCH_MESSAGE_BY__CHAT_ID,
    id: id,
});


export const getAllMessageByChatId = (id) => {
    return async (dispatch) => {

        dispatch(req());
        axios
            .get(`http://10.0.2.2:8000/api/message/chat/${id}?userId=4c2a6dd0-46d9-11ed-9445-bdea7f855e09`)
            .then((response) => {
                console.log("COMPLETE RESPONSE DATA: ", response.data);
                if (response.status) {
                    dispatch(reqSuccess(response.data));
                } else {
                    dispatch(reqFailure("Error getting Message by chat id"));
                    console.log(
                        "Something's not right! Please try again after some time."
                    );
                }
            })
            .catch((err) => {
                dispatch(reqFailure(err.message));
            });
    };
};
