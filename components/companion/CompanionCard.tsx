"use client";

import React, { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {removeBookmark, addBookmark} from "@/lib/actions/companion.actions";

type CompanionComponentProps = {
   id: string,
    name: string,
    topic: string,
    subject: string,
    duration: number,
    color: string
    bookmarked: boolean,
}

const CompanionCard = ({
    id,name,topic,subject,duration,color,bookmarked
                       } : CompanionComponentProps) => {

    const [ isBookmarked, setIsBookmarked ] = useState<boolean>(bookmarked);
    const pathname = usePathname();

    const handleBookmark = async () => {
        try {
            if (isBookmarked) {
                await removeBookmark(id, pathname);
            } else {
                await addBookmark(id, pathname);
            }
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error("Error updating bookmark:", error);
        }
    };

    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark" onClick={handleBookmark}>
                    <Image
                        src={
                            isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
                        }
                        alt="bookmark"
                        width={12.5}
                        height={15}
                    />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image
                    src="/icons/clock.svg"
                    alt="duration"
                    width={13.5}
                    height={13.5}
                />
                <p className="text-sm">{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard;
