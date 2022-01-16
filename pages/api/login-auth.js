import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
		const { username } = await req.body;

		//login data picture
		try {
			const data = { login, data, picture }
	
			const user = { login: login, data, picture: picture };
			req.session.user = user;
			await req.session.save();
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}

		req.session.user = {
			id: 230,
			admin: true,
		};
	},
	sessionOptions
);
