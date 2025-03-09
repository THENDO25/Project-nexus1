'use client'

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const slides = [
    {
        id: 1,
        title: "Male",
        description: "Browse our exclusive male collection, look stylish",
        image: "/b8.jpeg",
        bg: "bg-[#D3D3D3]",
        url: "/",
      },
      {
        id: 2,
        title: "Female",
        description: "Browse our exclusive female collection, look stylish",
        image: "/a_shopping_landing_page_background_image_with (5).jpeg",
        bg: "bg-[#D3D3D3]",
        url: "/",
      },
      {
        id: 3,
        title: "Sale",
        description: "Get up to 50% OFF",
        image: "/graphic_t_shirts (4).jpeg",
        bg: "bg-[#D3D3D3]",
        url: "/",
      },

]

const Homeslider = () => {
 
        const [current, setCurrent] = useState(0);

      
        return (
          <div className="h-[calc(100vh-80px)] overflow-hidden">
            <div
              className="w-max h-full flex transition-all ease-in-out duration-1000"
              style={{ transform: `translateX(-${current * 100}vw)` }}
            >
              {slides.map((slide) => (
                <div
                  className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
                  key={slide.id}
                >
                  {/* text*/}
                  <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                    <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                      {slide.description}
                    </h2>
                    <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                      {slide.title}
                    </h1>
                    <Link href={slide.url}>
                      <button className="rounded-md bg-black text-white py-3 px-4 ">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                  {/* image*/}
                  <div className="h-1/2 xl:w-1/2 xl:h-full relative">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
              {slides.map((slide, index) => (
                <div
                  className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
                    current === index ? "scale-150" : ""
                  }`}
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                >
                  {current === index && (
                    <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      };
      

export default Homeslider