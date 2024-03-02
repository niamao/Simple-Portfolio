const author = "Neo";
const description =
	"I'm a Web Developer based in the Philippines. Working towards creating web applications that make life easier.";
const url = "https://neoisaacamao-v1.vercel.app";
export const AppMetadata = {
	metadataBase: new URL(url),
	title: {
		default: `${author} | Home`,
		template: `%s | ${author}`
	},
	description: description,
	icons: {
		icon: "/eyeglasses.png"
	},
	keywords: [
		"Neo Isaac Amao",
		"Neo Isaac Amao - web developer",
		"Frontend developer",
		"ReactJS/NextJS/VueJS developer",
		"Portfolio website",
		"Frontend Developer Portfolio"
	],
	creator: author,
	authors: [{ name: author, url }],
};
