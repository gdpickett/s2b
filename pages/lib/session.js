export default sessionOptions(
    {
        password: process.env.SECRET,
        cookieName: "salon2bomb",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production" | false,
        }
    }
)