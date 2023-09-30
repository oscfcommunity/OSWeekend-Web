import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useToast,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import PostEditor from "./PostEditor";
import Navbar from "../Navbar";
import { hostname } from "../../hostname";

const UpdateBlog = () => {
  const { id } = useParams();
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      const url = `${hostname}/blog/${id}`;
      let token;
      if (localStorage.getItem("userAuthToken")) {
        token = localStorage.getItem("userAuthToken");
        console.log(token);
      } else {
        token = localStorage.getItem("adminAuthToken");
      }
      const options = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };

      try {
        // Replace this with your logic to fetch the blog post using the id
        const response = await fetch(url, options);
        const Data = await response.json();
        console.log(Data);

        // setBlog(Data.postData);
        setTitle(Data.blogData.title);
        setContent(Data.blogData.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

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
      console.log(token);
    } else {
      token = localStorage.getItem("adminAuthToken");
    }

    try {
      const response = await fetch(`${hostname}/blog/updateblog/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post updated :", data);
        // Perform any additional actions after successful post creation
        toast({
          title: "Successfully updated the post.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        // Reset form fields
        setTitle("");
        setContent("");

        navigate(`/blogPage/${data.blogData._id}`);
      } else {
        console.log("Post updation failed");
        // Handle error case
        errorMessage = "Error updating post else case.";

        toast({
          title: errorMessage,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);

      errorMessage = "Error updating post";

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

export default UpdateBlog;
