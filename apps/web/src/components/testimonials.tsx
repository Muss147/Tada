"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "In the last year, Samsung tested 4x more advertising assets with Quantilope, reduced costs per tested ad by 80%, and reduced turnaround time from 10 working days at bigger agencies to a pre-read of data after 48 hours. That's just unbeatable.",
    author: "Florian Bauer",
    title: "Head of Consumer and Market Insights",
    company: "Coca-Cola",
    logo: "/images/cocacola.png",
  },
  {
    id: 2,
    quote:
      "The platform has revolutionized how we approach market research. The speed and accuracy of insights we get from Quantilope allows us to make data-driven decisions faster than ever before.",
    author: "Sarah Chen",
    title: "VP of Marketing Research",
    company: "PepsiCo",
    logo: "/images/pepsico.png",
  },
  {
    id: 3,
    quote:
      "Working with this team has been transformative for our business. Their innovative approach to consumer insights has helped us launch three successful products this quarter.",
    author: "Michael Rodriguez",
    title: "Director of Product Strategy",
    company: "Glovo",
    logo: "/images/glovo.png",
  },
];

// Default testimonial
export function DefaultTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsAnimating(false);
    }, 150);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 150);
  };

  const currentTestimonial = testimonials[currentIndex];
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        {/* Quote Icon */}
        <div className="absolute top-6 left-6 text-blue-200">
          <Quote size={32} />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          disabled={isAnimating}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          disabled={isAnimating}
        >
          <ChevronRight size={20} />
        </button>

        {/* Content */}
        <div
          className={`transition-all duration-300 ${
            isAnimating
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {/* Quote */}
          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 relative z-10 font-medium">
            "{currentTestimonial?.quote}"
          </blockquote>

          {/* Author Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-gray-900 text-lg mb-1">
                {currentTestimonial?.author}
              </div>
              <div className="text-gray-600 text-sm">
                {currentTestimonial?.title}
              </div>
            </div>

            {/* Company Logo */}
            <div className="flex items-center">
              <Image
                src={currentTestimonial?.logo || ""}
                alt={currentTestimonial?.company || ""}
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}
