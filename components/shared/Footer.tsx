import React from 'react'
import { socials } from "@/constants";
import Image from "next/image";

const Footer = () => {
    return (

        <div className="flex items-center justify-center gap-12 w-full max-md:flex-col py-4 px-4 space-x-2 mb-12 mt-10">


            <p className="opacity-70 text-lg"> &copy; Jackster042. All rights reserved.</p>
            <p className="footer-tos">Privacy Policy</p>
            <p className="footer-tos">Contact us</p>
            <p className="footer-tos">Terms of use</p>


            {/*<ul className="flex flex-1 justify-center gap-3 max-md:mt-10 md:justify-end">*/}
            <ul className="flex justify-between gap-3">
                {socials.map(({ id, url, icon, title }) => (
                    <li key={id}>
                        <a
                            href={url}
                            className="flex size-10 items-center justify-center rounded-full border-2 border-s4/25 bg-s1/5 transition-all duration-500 hover:border-s4"
                        >
                            <Image
                                src={icon}
                                alt={title}
                                className="size-2/3 object-contain bg-[#FE5933] rounded-full object-fit"
                                width={16}
                                height={16}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Footer
