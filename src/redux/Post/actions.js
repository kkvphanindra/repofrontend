import {
    REQ_START,
    BLUR_FIELDS,
    SUCCESS,
    FAILURE,
    UPDATE_FIELDS,
    STATE_CLEANUP,
    SUCCESS_NEW_POST,
    REQ_START_NEW_POST,
    FAILURE_NEW_POST,
    ACTIVITYLOADING
} from './actionTypes';
import axios from 'axios';


export const req = () => {
    console.log('started');
    return {
        type: REQ_START

    };
};

export const updateFields = (val,fieldId,isValid) => ({
    type:UPDATE_FIELDS,
    val,
    fieldId,
    isValid
})

export const blurFields = (fieldId) => ({
    type:BLUR_FIELDS,
    fieldId
})


export const stateCleanup = () => ({
    type: STATE_CLEANUP,
});



export const reqSuccess = (data) => ({
    type: SUCCESS,
    data,
});

export const reqFailure = (error) => ({
    type: FAILURE,
    error: error,
});

export const reqSuccessNewPost = ()=>({
    type: SUCCESS_NEW_POST,
})
export const reqStartNewPost = ()=>({
    type: REQ_START_NEW_POST,
})
export const reqFailureNewPost = ()=>({
    type: FAILURE_NEW_POST,
})

export const reqActivityLoading = ()=>({
    type: ACTIVITYLOADING,
})

export const getAllPostsByUserId = (id) => {
    return async (dispatch) => {
        dispatch(req());
        try {const response = await axios.get(
                `http://10.0.2.2:3800/api/post/user/${id}`
            )
            if (response.status) {
                dispatch(reqSuccess(response.data));
                console.log(response.data)
            } else {
                dispatch(reqFailure("Some Error Occured. Try Again Later"));
            }
        }
        catch (err) {
            console.log("cool")
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailure(err.message));
        }
    };
}

export const addNewPost = (post,userId) => {
        return async (dispatch) => {
            dispatch(reqStartNewPost());
            console.log(post,userId)
            try {
                const response = await axios.post(
                    `http://10.0.2.2:3800/api/post`,
                    {
                        description :post,
                        userId:userId
                    }
                )
                // console.log(response.data)
                if (response.headers.error) {
                    dispatch(reqFailureNewPost('Please Enter Valid Inputs'));
                    console.log(response.headers.error);
                }
                else if (response) {
                    // console.log('COMPLETE RESPONSE DATA:', response.data)
                    console.log(response)
                    dispatch(reqSuccessNewPost());
                    // dispatch(stateCleanup())
                    // dispatch(getAllPostsByUserId(userId))
                }
                else {
                    dispatch(reqFailureNewPost('Please Enter Valid Inputs'));    
                }
            }
            catch (err) {
                console.log("Request failed");
                console.log(err.message)
                dispatch(reqFailureNewPost(err.message));
            }
        };
    }


export const addPostLike = (postId,userId) => {
    return async (dispatch) => {
        // dispatch(reqActivityLoading());
        console.log(postId,userId)
        try {
            const response = await axios.post(
                `http://10.0.2.2:3800/api/post-likes`,
                {
                    userId:userId,
                    postId:postId
                }
            )
            console.log(response.data)
            if (response.headers.error) {
                console.log(response.headers.error);
            }
            else if (response) {
                // console.log('COMPLETE RESPONSE DATA:', response.data)
        // dispatch(reqActivityLoading());
                console.log(response)
                dispatch(getAllPostsByUserId(userId));
            }
            else {
                dispatch(reqFailureNewPost('Some Error Occured'));    
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}
    