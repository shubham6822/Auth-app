export const erorrHandler = (statuscode, message) => {
    const erorr = new Error();
    erorr.statuscode = statuscode;
    erorr.message = message;
    return erorr;
}