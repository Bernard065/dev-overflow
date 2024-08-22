import Image from "next/image";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  title: string;
  value: string | number;
  href?: string;
  textStyles?: string;
  isAuthour?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  title,
  value,
  textStyles,
  isAuthour,
  href,
}: MetricProps) => {
  return (
    <div className="flex-center flex-wrap gap-1">
      <div className="size-4 overflow-hidden rounded-full">
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`object-cover ${href ? "" : ""}`}
        />
      </div>
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        <span className={`small-regular ${isAuthour ? "max-sm:hidden" : ""}`}>
          {title}
        </span>
      </p>
    </div>
  );
};

export default Metric;
