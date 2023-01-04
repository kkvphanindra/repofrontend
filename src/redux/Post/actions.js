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
    ACTIVITYLOADING,
    POST_HIDE,
    POST_SAVE,
    POSTSHARE,
    POSTVERIFY,
    POSTGENUINE,
    POST_SUCCESS
} from './actionTypes';
import axios from 'axios';
import { BASE_URL} from '@env'

export const req = () => {
    console.log('started');
    return {
        type: REQ_START

    };
};

export const updateFields = (val, fieldId, isValid) => ({
    type: UPDATE_FIELDS,
    val,
    fieldId,
    isValid
})

export const blurFields = (fieldId) => ({
    type: BLUR_FIELDS,
    fieldId
})


export const stateCleanup = () => ({
    type: STATE_CLEANUP,
});



export const reqSuccess = (data) => ({
    type:POST_SUCCESS,
    data,
});

export const reqFailure = (error) => ({
    type: FAILURE,
    error: error,
});

export const reqSuccessNewPost = () => ({
    type: SUCCESS_NEW_POST,
})
export const reqStartNewPost = () => ({
    type: REQ_START_NEW_POST,
})
export const reqFailureNewPost = () => ({
    type: FAILURE_NEW_POST,
})

export const reqActivityLoading = () => ({
    type: ACTIVITYLOADING,
})

export const hidePost = () => ({
    type: POST_HIDE,
})

export const savePost = () => ({
    type: POST_SAVE,
})

export const sharePost = () => ({
    type: POSTSHARE,
})

export const verifyPost = () => ({
    type: POSTVERIFY,
})

export const genuinePost = () => ({
    type: POSTGENUINE,
})

export const getAllPostsByUserId = (id) => {
    return async (dispatch) => {
        dispatch(req());
        try {
            console.log("post id user",id)
            const response = await axios.get(
                BASE_URL+`/api/post/user/${id}?savedPost=false`
            )
            if (response.status) {
                dispatch(reqSuccess(response.data));
                // console.log(response.data)
            } 
        }
        catch (err) {
            console.log("cool")
            console.log("Request failed post");
            console.log(err.message)
            dispatch(reqFailure(err.message));
        }
    };
}

export const addNewPost = (post, userId, location, lat, long, image) => {
    return async (dispatch) => {
        // dispatch(reqStartNewPost());
        console.log("add new post", post, userId, lat, long,image)
        try {
            const formData = new FormData();
            formData.append('description', post)
            formData.append('userId', userId)
            formData.append('location', location)
            formData.append('latitude', lat)
            formData.append('longitude', long)
            formData.append('images', image!==null?{
                uri: image.path==null?null:image.path,
                type: image.mime|| null,
                name: image.filename || `filename${image.size}.jpg`,
            }:null);
            const response = await axios.post(
                BASE_URL+`/api/post`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log("new post res", response.data)
            if (response) {
                // console.log('COMPLETE RESPONSE DATA:', response.data)
                console.log(response.data)
                dispatch(reqSuccessNewPost());
                dispatch(stateCleanup())
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


export const addPostLike = (postId, userId) => {
    return async (dispatch) => {
        // dispatch(reqActivityLoading());
        console.log(postId, userId)
        try {
            const response = await axios.post(
                BASE_URL+`/api/post-likes/${userId}`,
                {
                    userId: userId,
                    postId: postId
                }
            )
            console.log(response.data)
            if (response.headers.error) {
                console.log(response.headers.error);
            }
            else if (response) {
                // console.log('COMPLETE RESPONSE DATA:', response.data)
                // dispatch(reqActivityLoading());
                // console.log("add post like",response)
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

export const postHide = (post, userId) => {
    return async (dispatch) => {
        dispatch(reqStartNewPost());
        console.log(post, userId)
        try {
            const response = await axios.post(
                BASE_URL+`/api/post/${post}/user/${userId}`,
                {
                    isHide: true
                }
            )
            if (response) {
                console.log("post hide action log", response.data)
                dispatch(hidePost(response.data))
                dispatch(getAllPostsByUserId(userId));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}

export const postSave = (post, userId) => {
    return async (dispatch) => {
        dispatch(reqStartNewPost());
        console.log(post, userId)
        try {
            const response = await axios.post(
                BASE_URL+`/api/post/${post}/user/${userId}`,
                {
                    isSave: true
                }
            )
            if (response) {
                console.log("post save action log", response.data)
                dispatch(savePost(response.data))
                dispatch(getAllPostsByUserId(userId));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}

export const postShare = (post, userId) => {
    return async (dispatch) => {
        dispatch(reqStartNewPost());
        console.log(post, userId)
        try {
            const response = await axios.post(
                BASE_URL+`/api/post-share`,
                {
                    postId: post,
                    userId: userId
                }
            )
            if (response) {
                console.log("post share action log", response.data)
                dispatch(sharePost(response.data))
                dispatch(getAllPostsByUserId(userId));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}

export const postVerify = (user, userId) => {
    return async (dispatch) => {
        dispatch(reqStartNewPost());
        console.log(user, userId)
        try {
            const response = await axios.post(
                BASE_URL+`/api/verify/user/${userId}`,
                {
                    verifiedTo: user,
                }
            )
            if (response) {
                console.log("post share action log", response.data)
                dispatch(verifyPost(response.data))
                dispatch(getAllPostsByUserId(userId));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}

export const postGenuine = (user, userId) => {
    return async (dispatch) => {
        dispatch(reqStartNewPost());
        console.log(user, userId)
        try {
            const response = await axios.get(
                BASE_URL+`/api/verify/user/${userId}`,
            )
            if (response) {
                console.log("post share action log", response.data)
                dispatch(genuinePost(response.data))
                dispatch(getAllPostsByUserId(userId));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailureNewPost(err.message));
        }
    };
}