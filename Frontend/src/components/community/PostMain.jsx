import React, { useEffect, useState } from "react";
import PostList from "./PostList";

const PostMain = (props) => {
  useEffect(() => {}, [props.postData]);
  return (
    <>
      <PostList postData={props.postData} />
    </>
  );
};

export default PostMain;
