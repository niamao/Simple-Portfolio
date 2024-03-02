import { PortableTextBlock } from "sanity";

export type Profile = {
    _id: string;
    profile_picture: string;
    intro: PortableTextBlock[];
    about_me: PortableTextBlock[];
    skills: string[],
    email: string,
    github: string,
    linkedin: string
}