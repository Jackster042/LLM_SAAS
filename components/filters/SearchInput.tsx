"use client";

import React, {useState, useEffect} from 'react'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {

    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || "";

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
      if(searchQuery) {
          const newUrl = formUrlQuery({
              params: searchParams.toString(),
              key: "topic",
              value: searchQuery,
          });

          router.push(newUrl,  {scroll: false});
      }else {
          if(pathName === "/companions") {
              const newUrl = removeKeysFromUrlQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["topic"],
              });

              router.push(newUrl, { scroll: false });
          }
      }
       }, 500)
    },[searchQuery, router, pathName, searchParams]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-3 h-9">
            <Image src="/icons/search.svg" alt="search" width={12} height={12}/>
            <input
                placeholder="Search companions..."
                className="outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}
export default SearchInput
