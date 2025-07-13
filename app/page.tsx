import React from 'react'

import CompanionCard from "@/components/companion/CompanionCard";
import CompanionList from "@/components/companion/CompanionList";
import Cta from "@/components/companion/CTA";

const Page = () => {
  return (
    <main>
        <h1>Popular Companions</h1>
        <section className="home-section">
            <CompanionCard
            id={"123"}
            name={"Neura the Brainy Explorer"}
            topic={"Neural network of the brain"}
            subject={"science"}
            duration={45}
            color={"#ffda6e"}
            />
            <CompanionCard
            id={"456"}
            name={"Countsy the Number Wizard"}
            topic={"Derivatives and Integrals"}
            subject={"science"}
            duration={30}
            color={"#e5odff"}
            />
            <CompanionCard
            id={"678"}
            name={"Verba the Vocabulary Virtuoso"}
            topic={"English Literature and Grammar"}
            subject={"language"}
            duration={60}
            color={"#BDE7FF"}
            />
        </section>

        <section className={"home-section"}>
            <CompanionList />
            <Cta />
        </section>

    </main>
  )
}

export default Page