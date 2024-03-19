import React from "react";

type FrameProps = {
    url: string;
};
const Frame = ({ url }: FrameProps) => {
    const lastParam = url.split("/").pop();

    return (
        <div className="aspect-video p-5">
            <iframe
                className=" h-full w-full rounded-lg"
                src={`https://www.youtube.com/embed/${lastParam}`}
                width={560}
                height={315}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Frame;
