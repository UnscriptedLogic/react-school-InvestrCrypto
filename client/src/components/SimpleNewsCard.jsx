import { Card, Title, Subtitle, Text, Divider } from "@tremor/react";
import React from "react";

const SimpleNewsCard = ({
  title = "Demo News Title",
  author = "Author",
  date = "1 June 2023",
  image = "https://crypto.snapi.dev/images/v1/a/p/bitcoin2-313516.jpg",
}) => {
  return (
    <Card className="p-0" decoration="left" decorationColor="purple">
      <div className="relative m-0">
        <div className="m-0 w-full overflow-hidden">
          <img
            src={image}
            className="h-48 w-full rounded-md object-cover brightness-75"
          />
        </div>
        <div className="absolute top-1 -mt-1 h-full w-full">
          <div className="flex h-full w-full flex-col justify-between rounded-md bg-gradient-to-t from-transparent via-transparent to-black p-4">
            <Title className="text-xl text-white">{title}</Title>
            <div>
              <Subtitle className="text-md text-white">{author}</Subtitle>
              <Subtitle className="text-md text-white">{date}</Subtitle>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimpleNewsCard;
