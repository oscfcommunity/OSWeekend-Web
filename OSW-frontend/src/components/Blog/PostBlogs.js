import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostEditor from "./PostEditor";
import "./PostBlog.css";
import { hostname } from "../../hostname";
import {
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ChakraProvider,
} from "@chakra-ui/react";

const PostBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    let errorMessage = "";

    if (!title.trim() && !content.trim()) {
      errorMessage = "Please provide a title and content!";
    } else if (!title.trim()) {
      errorMessage = "Post title is required!";
    } else if (!content.trim()) {
      errorMessage = "Post content is required!";
    }

    if (errorMessage) {
      toast({
        title: errorMessage,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    // Perform submission logic here
    console.log("Title:", title);
    console.log("Content:", content);
    let token;
    if (localStorage.getItem("userAuthToken")) {
      token = localStorage.getItem("userAuthToken");
    } else {
      token = localStorage.getItem("adminAuthToken");
    }

    try {
      const response = await fetch(`${hostname}/blog/createblog`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const createdPost = await response.json();
        console.log("Post created:", createdPost);
        // Perform any additional actions after successful post creation
        toast({
          title: "Successfully created the post.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        // Reset form fields
        setTitle("");
        setContent("");

        navigate(`/blogPage/${createdPost._id}`);
      } else {
        console.log("Post creation failed");
        // Handle error case
        errorMessage = "Error creating post else case.";

        toast({
          title: errorMessage,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);

      errorMessage = "Error creating post";

      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    // Reset form fields
    setTitle("");
    setContent("");
  };

  const handlePreview = () => {
    console.log("preview button clicked");

    if (!title.trim() && !content.trim()) {
      toast({
        title: "Please provide a title and content!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    } else if (!title.trim()) {
      toast({
        title: "Post title is required!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    } else if (!content.trim()) {
      toast({
        title: "Post content is required!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setPreviewOpen(true);
  };

  return (
    <ChakraProvider>
      <div>
        <Navbar />

        <Box
          mx={{ base: 2, md: "auto" }}
          maxW={{ base: "none", md: "80vw" }}
          mt={8}
          borderWidth="1px"
          p={2}
          bg={"white"}
          borderRadius="md"
          boxShadow="md"
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>

            <PostEditor content={content} setContent={setContent} />
          </FormControl>

          <Flex justifyContent="center" mt={4}>
            <Button onClick={handlePreview} mx={1}>
              preview
            </Button>
            <Button onClick={handleSubmit} mx={1}>
              Submit
            </Button>
          </Flex>
          <Modal isOpen={isPreviewOpen} onClose={() => setPreviewOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Preview</ModalHeader>
              <ModalCloseButton color={"red"} colorScheme={"transparent"} />
              <ModalBody>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default PostBlogs;
