"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { ApodContext } from "@/contexts/ApodContext";
import { MarsContext } from "@/contexts/MarsContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useContext, useLayoutEffect, useRef } from "react";

export default function Home() {
  const { apodData, isLoading, error } = useContext(ApodContext);
  const { marsData } = useContext(MarsContext);

  const featuredImgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (featuredImgRef) {
      const currentRef = featuredImgRef.current;
      gsap.fromTo(
        currentRef,
        {
          opacity: 0,
          visibility: "hidden",
          width: "20%",
        },
        {
          opacity: 1,
          visibility: "visible",
          width: "70%",
          scrollTrigger: {
            trigger: currentRef,
            start: "top 80%",
            end: "top 20%",
            scrub: 2,
          },
        }
      );
    }
  });

  if (isLoading) {
    return <Loader label={"Fetching Data..."} />;
  }

  if (error) {
    console.log(error);
    return <Loader label={"Error while fetching data."} />;
  }

  return (
    <>
      <section className="min-h-dvh pt-40 pb-20 text-center">
        <Container>
          <time
            dateTime={apodData?.date}
            className="text-3xl font-medium text-slate-300 block mb-5"
          >
            {apodData?.date}
          </time>
          <h1 className="text-7xl font-semibold tracking-tight underline mb-10">
            {apodData?.title}
          </h1>
          <p className="text-base font-medium tracking-tighter text-slate-500 mb-10">
            {apodData?.explanation}
          </p>
          <div ref={featuredImgRef} className="mx-auto">
            <img
              src={apodData?.hdurl}
              alt={apodData?.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Container>
      </section>
      <section className="py-32">
        <Container>
          <h2 className="text-center text-6xl font-bold mb-10">Pics of Mars Curiosity Rover</h2>
          <ul className="flex flex-wrap md:-mx-5">
            {marsData &&
              marsData?.photos.map((photo) => (
                <li key={photo.id} className="pb-10 md:w-1/2 md:px-5 lg:w-1/3">
                  <Link href={"#"} className="group">
                    <div className="h-full overflow-hidden rounded-md">
                      <img
                        src={photo.img_src}
                        alt={"mars image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      />
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
