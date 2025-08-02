import React from 'react'

import CompanionCard from "@/components/companion/CompanionCard";
import CompanionList from "@/components/companion/CompanionList";
import {getSubjectColor} from "@/lib/utils";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import Cta from "@/components/companion/CTA";

const Page = async () => {

    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionCompanions = await getRecentSessions(10)

  return (
    <main>
        <h1>Popular Companions</h1>
        <section className="home-section">
            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}
        </section>

        <section className={"home-section"}>
            <CompanionList
            title="Recently completed sessions"
            companions={recentSessionCompanions}
            classNames="w-2/3 max-lg:w-full"
            />
            <Cta />
        </section>
    </main>
  )
}

export default Page