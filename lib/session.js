export const sessionOptions = {
    password: process.env.SECRET,
    cookieName: "salon2bomb",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" | false,
    }
}
export default sessionOptions