import '../styles/globals.css'
import { SWRConfig } from "swr";
import fetchJson from '../lib/fetchJson';

//import {SessionProvider} from 'next-auth/react'

//function MyApp({ Component,...pageProps }) {
function MyApp({ Component, ...pageProps }) {
	return (
		<>
			<SWRConfig value={{fetcher: fetchJson,onError: (err) => {
						console.error(err);
					},
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</>
	)
}

export default MyApp
