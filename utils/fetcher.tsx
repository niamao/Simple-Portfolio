import { createClient, groq } from "next-sanity";
import clientConfig from "./sanity-client-config";
import { Profile } from "@/types/Profile"

export async function getProjects() {
	return createClient(clientConfig).fetch(
		groq`*[_type == "projects"]{
			_id,
			createdAt,
			title,
			description,
			"images": images[]{
				asset->{
					_id,
					_createdAt,
					url
				}
			},
			repoUrl,
			liveUrl
		  }`
	)
}

export async function getProfile(): Promise<Profile[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "profile"]{
			_id,
			"profile_picture": profile_picture.asset->url,
			intro,
			about_me,
			skills,
			email,
			github,
			linkedin
		}`
	);
}