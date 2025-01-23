"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { ApodContext } from "@/contexts/ApodContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useContext, useLayoutEffect, useRef } from "react";

export default function Home() {
  const { apodData, isLoading, error } = useContext(ApodContext);

  const featuredImgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (featuredImgRef?.current) {
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
  }, []);

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
          <div ref={featuredImgRef} className="mx-auto relative">
            <div className="relative">
              <Image
                src={`${apodData?.url}`}
                alt={`${apodData?.title}`}
                fill={true}
                className="!relative"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
