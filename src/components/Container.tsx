import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-red-white pl-5">{children}</div>;
};

export default Container;
