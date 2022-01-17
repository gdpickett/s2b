// mock the user api
export default async () => {
    // sleep 500
    await new Promise(res => setTimeout(res, 500));

    if (document.cookie.includes("salon2bomb")) {
        // authorized
        return {
            name: name,
            picture: picture,
            email: email
        };
    }

    // not authorized
    const error = new Error("Not authorized!");
    error.status = 403;
    throw error;
};