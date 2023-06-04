import { Card, Title, Subtitle, Text, Divider } from "@tremor/react";
import React from "react";

const SimpleNewsCard = ({
  title = "Demo News Title",
  author = "Author",
  date = "1 June 2023",
  image = "https://crypto.snapi.dev/images/v1/a/p/bitcoin2-313516.jpg",
}) => {
  return (
    <div className="relative text-left">
      <div>
        <img src={image} className="rounded-md brightness-75 drop-shadow-md" />
      </div>
      <div className="absolute top-0.5 p-2">
        <div className="overflow-hidden text-ellipsis">
          <Title color="white" className="text-sm">
            {title}
          </Title>
        </div>
        <Subtitle color="white">{date}</Subtitle>
        <Text color="white">{author}</Text>
      </div>
    </div>
  );
};

export default SimpleNewsCard;
