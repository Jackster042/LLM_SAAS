import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className={"cta-section"}>
            <div className={"cta-badge"}>Start learning you way</div>
            <h2 className={"text-3xl font-bold"}>Build a Personalized Learning Companion</h2>
            <p>
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>
            <Image
            src="/images/cta.svg"
            alt="cta"
            width={362}
            height={232}
            />
            <button className={"btn-primary"} style={{ backgroundColor: "#FE5933" }}>
                <Image
                src="/icons/plus.svg"
                alt={"plus"}
                width={12}
                height={12}
                />
                <Link href={`/companions/new`}>
                    Build a New Companion
                </Link>
            </button>
        </section>
    )
}

export default Cta;

