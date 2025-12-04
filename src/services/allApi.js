import { commonApi } from "./commonApi"
import { serverURL } from "./serverURL"



// register - content type- application/json
export const registerAPI = async (reqBody) => {
    return await commonApi(`POST`, `${serverURL}/register`, reqBody)
}


// login - content type- application/json
export const loginAPI = async (reqBody) => {
    return await commonApi(`POST`, `${serverURL}/login`, reqBody)
}

// google login
export const googleLoginAPI = async (reqBody) => {
    return await commonApi(`POST`, `${serverURL}/google-login`, reqBody)
}

//  get home books
export const homeBookApi = async () => {
    return await commonApi(`GET`, `${serverURL}/all-home-book`)
}


// -----------------users----------------------------------------
// upload a book

export const uploadBookApi = async (reqBody, reqHeader) => {
    return await commonApi(`POST`, `${serverURL}/add-book`, reqBody, reqHeader)
}
// get all books
export const allBookApi = async (searchKey, reqHeader) => {
    return await commonApi(`GET`, `${serverURL}/all-book?search=${searchKey}`, "", reqHeader)

}
// get a view book
export const viewBookApi = async (id) => {
    return await commonApi(`GET`, `${serverURL}/view-book/${id}`)

}

//api to get update admin profile
export const updateUserProfileApi = async (reqBody,reqHeader) => {
    return await commonApi(`PUT`, `${serverURL}/user-profile-update`, reqBody, reqHeader)

}

// get all user books
export const getAllUserBookApi = async (reqHeader) => {
    return await commonApi(`GET`, `${serverURL}/user-books`, "", reqHeader)

}
// get all user brought books
export const getAllUserBroughtBooksApi = async (reqHeader) => {
    return await commonApi(`GET`, `${serverURL}/user-brought-books`, "", reqHeader)

}


// delete a user book
export const deleteUserBooksApi = async (id) => {
    return await commonApi(`DELETE`, `${serverURL}/delete-user-books/${id}`)

}

// make payment
export const makePaymentApi = async(reqBody,reqHeader)=>{
        return await commonApi(`PUT`,`${serverURL}/make-payment`,reqBody,reqHeader)

}


// -----------------------------------admin--------------------------------

// get all books
export const allBookAdminApi = async (reqHeader) => {
    return await commonApi(`GET`, `${serverURL}/admin-all-books`, "", reqHeader)

}

// api to approve books
export const approveBookApi = async (reqBody, reqHeader) => {
    return await commonApi(`PUT`, `${serverURL}/approve-books`, reqBody, reqHeader)

}

//api to get all users
export const getAllUsersApi = async (reqHeader) => {
    return await commonApi(`GET`, `${serverURL}/all-users`, "", reqHeader)

}

//api to get update admin profile
export const updateProfileApi = async (reqBody,reqHeader) => {
    return await commonApi(`PUT`, `${serverURL}/profile-update`, reqBody, reqHeader)

}

