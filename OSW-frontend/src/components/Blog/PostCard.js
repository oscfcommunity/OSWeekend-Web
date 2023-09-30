import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import PostDeleteAlert from "./PostDeleteAlert";
import PostUpdateAlert from "./PostUpdateAlert";
import { hostname } from "../../hostname";

const PostCard = ({ blog, setBlogs, user, personal }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(blog.content, "text/html");

    // Extract text from HTML content
    const textContent = htmlDoc.documentElement.textContent || "";

    // Limit the text to a certain number of lines
    const maxLines = 4;
    const txt = textContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .slice(0, maxLines)
      .join(" ");

    setContent(txt);

    const images = htmlDoc.getElementsByTagName("img");
    const thumbimg = images.length > 0 ? images[0].src : null;

    setThumbnail(thumbimg);
  }, [blog]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogPage/${blogId}`);
  };

  const handleDeleteBlog = async (blogId, event) => {
    event.stopPropagation();

    setIsDeleteDialogOpen(false);

    // const token = localStorage.getItem("NgoAuthToken");
    let token;
    if (localStorage.getItem("userAuthToken")) {
      token = localStorage.getItem("userAuthToken");
      console.log(token);
    } else {
      token = localStorage.getItem("adminAuthToken");
    }

    if (!token) {
      navigate("/");
    }

    try {
      // Replace this with your logic to fetch the blog post using the id
      const response = await fetch(`${hostname}/blog/deleteblog/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      });
      const Data = await response.json();
      console.log(Data);

      if (!Data.success) {
        toast({
          title: "Error deleting blog",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      toast({
        title: "Successfully deleted Post !!!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      // navigate("/Ngo/media");
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error fetching blog",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const handleEditBlog = (blogId, event) => {
    event.stopPropagation();

    setIsUpdateDialogOpen(false);

    // if (userType !== "ngo") {
    //   toast({
    //     title: "Not Allowed",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    //   return;
    // }

    navigate(`/blog/update/${blogId}`, { replace: true });
  };

  return (
    <Box
      key={blog._id}
      borderWidth="1px"
      p={4}
      mb={4}
      borderRadius="md"
      _hover={{ boxShadow: "2xl", cursor: "pointer" }}
      onClick={() => handleBlogClick(blog._id)}
      width={{ base: "100%", md: "48%", lg: "32%" }}
      height="auto"
      position="relative"
      bg={"#FBFBFB"}
    >
      {thumbnail && (
        <Box
          mb={2}
          width="100%"
          height="150px"
          borderRadius="md"
          overflow="hidden"
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        >
          <Image
            src={thumbnail}
            alt="Thumbnail"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      )}

      <Box mt={thumbnail ? 2 : 6}>
        <Heading
          as="h2"
          size="lg"
          mb={2}
          noOfLines={1}
          textOverflow={"ellipsis"}
          title={`${blog.title}`}
        >
          {blog.title}
        </Heading>
        <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
          <Flex color="gray.400" justifyItems={"center"} width={"80%"}>
            <Image
              src={blog.profile_pic || "/user-avatar.jpg"}
              alt={blog.author}
              title={blog.author}
              boxSize="30px"
              borderRadius="full"
              m={0}
              mr={2}
            />
            <Text
              display={"inline-block"}
              title={blog.author}
              maxWidth={"40%"}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {blog.author}&nbsp;
            </Text>{" "}
            -{" "}
            <Text
              display={"inline-block"}
              width={"40%"}
              title={new Date(blog.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {new Date(blog.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </Flex>
          {user && (
            <>
              {(personal || user.type === "admin") && (
                <Flex
                  _groupHover={{ opacity: 1 }} // Visible on hover
                >
                  <IconButton
                    icon={<DeleteIcon />}
                    variant="ghost"
                    _hover={{ color: "black", bgColor: "transparent" }}
                    color="red"
                    aria-label="Delete"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeleteDialogOpen(true);
                    }}
                    title="Delete Post"
                  />
                  <IconButton
                    icon={<EditIcon />}
                    variant="ghost"
                    _hover={{ color: "blue", bgColor: "transparent" }}
                    color="black"
                    aria-label="Edit"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUpdateDialogOpen(true);
                    }}
                    title="Edit Post"
                  />
                </Flex>
              )}
            </>
          )}
        </Flex>
        <Text
          noOfLines={thumbnail ? 3 : 8}
          fontSize={"medium"}
          overflow="hidden"
          textOverflow="ellipsis"
          textAlign={"justify"}
        >
          {content}
        </Text>
      </Box>
      <PostDeleteAlert
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={(e) => handleDeleteBlog(blog._id, e)}
      />
      <PostUpdateAlert
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        onDelete={(e) => handleEditBlog(blog._id, e)}
      />
    </Box>
  );
};

export default PostCard;
