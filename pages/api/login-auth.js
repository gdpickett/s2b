import { withIronSessionApiRoute } from "iron-session/next";
import Image from "next/image";
import { useState } from "react";
import { FacebookLogin } from "../Components/FacebookLogin";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "salon2bomb",
    password: process.env.SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"|false,
    },
  },
);