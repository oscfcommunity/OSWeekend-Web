import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  ChakraProvider,
  Button,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import PostDeleteAlert from "./PostDeleteAlert";
import PostUpdateAlert from "./PostUpdateAlert";
import { hostname } from "../../hostname";
import Navbar from "../Navbar";

const ShowBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const getUser = async () => {
      if (localStorage.getItem("userAuthToken")) {
        const token = localStorage.getItem("userAuthToken");

        if (token) {
          try {
            // Split the token into its parts
            const tokenParts = token.split(".");

            // Base64-decode and parse the payload part (the second part)
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      } else {
        const token = localStorage.getItem("adminAuthToken");
        if (token) {
          try {
            // Split the token into its parts
            const tokenParts = token.split(".");

            // Base64-decode and parse the payload part (the second part)
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log(payload.type);
            setUser(payload); // Set user state with decoded data
          } catch (error) {
            // Handle decoding error (e.g., token is invalid)
            console.error("Error decoding JWT token:", error);
          }
        }
      }
    };
    getUser();
    // console.log(user.type);
  }, []);
  const theme = extendTheme({
    styles: {
      global: {
        h1: {
          fontSize: "2em",
          fontWeight: "bolder",
          marginTop: "32px",
          marginBottom: "16px",
        },
        h2: {
          fontSize: "1.5em",
          fontWeight: "bolder",
          marginTop: "24px",
          marginBottom: "16px",
        },
        h3: {
          fontSize: "1.17em",
          fontWeight: "bolder",
          marginTop: "18.72px",
          marginBottom: "16px",
        },
        h4: {
          fontSize: "1em",
          fontWeight: "bolder",
          marginTop: "16px",
          marginBottom: "16px",
        },
        h5: {
          fontSize: ".83em",
          fontWeight: "bolder",
          marginTop: "13.28px",
          marginBottom: "16px",
        },
        h6: {
          fontSize: ".67em",
          fontWeight: "bolder",
          marginTop: "10.72px",
          marginBottom: "16px",
        },
        p: {
          fontSize: "md",
          textAlign: "justify",
        },
        a: {
          color: "blue.500",
          textDecoration: "underline",
        },
        ul: {
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        },
        ol: {
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        },
        li: {
          marginBottom: "0.5rem",
        },
        img: {
          display: "block",
          margin: "0 auto",
        },
      },
    },
  });

  var options;

  let token;
  if (localStorage.getItem("userAuthToken")) {
    token = localStorage.getItem("userAuthToken");
    console.log(token);
  } else {
    token = localStorage.getItem("adminAuthToken");
  }

  options = {
    headers: {
      "Content-type": "application/json",
      authorization: token,
    },
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const url = `${hostname}/blog/${id}`;

      try {
        // Replace this with your logic to fetch the blog post using the id
        const response = await fetch(url, options);
        const Data = await response.json();
        console.log(Data);

        if (!Data.success) {
          setBlog({});
          toast({
            title: "Error fetching blog",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }

        setBlog(Data.blogData);
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
    fetchBlog();
  }, [id]);

  const handleDeleteBlog = async (blogId) => {
    setIsDeleteDialogOpen(false);

    if (localStorage.getItem("adminAuthToken")) {
      toast({
        title: "Not Allowed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      // Replace this with your logic to fetch the blog post using the id
      const response = await fetch(`${hostname}/blog/deleteblog/${blogId}`, {
        method: "DELETE",
        ...options,
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

      setBlog({});
      toast({
        title: "Successfully deleted Post !!!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigate(`/blogs`);
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

  const handleEditBlog = (blogId) => {
    setIsUpdateDialogOpen(false);
    // if (userType !== "user") {
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

  if (!blog) {
    return (
      <ChakraProvider theme={theme}>
        <div
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            maxWidth={{ base: "95vw", lg: "80vw" }}
            height={"80vh"}
            mx="auto"
            mt={8}
            mb={2}
            p={{ base: 4, lg: 8 }}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bgColor={"rgba(255, 255, 255, 0.76)"}
            backdropFilter="auto"
            backdropBlur="8px"
            overflowX={"scroll"}
          >
            <Heading as={"h1"} mb={4}>
              Blog Not Found
            </Heading>
            <Button
              // onClick={() =>
              //   userType !== "ngo" ? navigate(-1) : navigate("/Ngo/media/create")
              // }
              colorScheme="teal"
              mb={4}
              bg="white"
              color="skyblue"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
              _hover={{ boxShadow: "0px 4px 6px skyblue" }}
              _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              {/* {userType !== "ngo" ? "Back" : "Create New Blog"} */} Back
            </Button>
          </Box>
        </div>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <div
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Navbar />
        <Box
          maxWidth={{ base: "95vw", lg: "80vw" }}
          height={"80vh"}
          mx="auto"
          mt={8}
          mb={2}
          p={{ base: 4, lg: 8 }}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          bgColor={"rgba(255, 255, 255, 0.76)"}
          backdropFilter="auto"
          backdropBlur="8px"
          overflowY={"scroll"}
          css={{
            "&::-webkit-scrollbar": { width: "5px" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(107,164,245, 0.6)",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(107,164,245,1)",
            },
          }}
        >
          <Heading
            as="h4"
            mb={5}
            noOfLines={{ base: 2, md: 4 }}
            textOverflow={"ellipsis"}
          >
            {blog.title}
          </Heading>
          <Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
            <Flex
              alignItems="center"
              color="gray.400"
              justifyItems={"center"}
              width={"80%"}
            >
              <Image
                boxSize="40px"
                borderRadius="full"
                m={0}
                mr={2}
                src={blog.profile_pic ? blog.profile_pic : "/user-avatar.jpg"}
                alt={blog.user_author}
                title={blog.user_author}
              />
              <Text
                display={"inline-block"}
                title={blog.author}
                maxWidth={"40%"}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {blog.user_author ? blog.user_author : blog.admin_author}
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

            {/* {(userType === "ngo" || userType === "admin") && ( */}
            {user && (
              <Flex
                alignItems="center"
                justifyContent="center"
                _groupHover={{ opacity: 1 }} // Visible on hover
              >
                <IconButton
                  icon={<DeleteIcon />}
                  variant="ghost"
                  _hover={{ color: "black", bgColor: "transparent" }}
                  color="red"
                  aria-label="Delete"
                  size="md"
                  onClick={() => {
                    setIsDeleteDialogOpen(true);
                  }}
                />
                {/* {userType === "ngo" && ( */}
                <IconButton
                  icon={<EditIcon />}
                  variant="ghost"
                  _hover={{ color: "blue", bgColor: "transparent" }}
                  color="black"
                  aria-label="Edit"
                  size="md"
                  onClick={() => {
                    setIsUpdateDialogOpen(true);
                  }}
                />
                {/* )} */}
              </Flex>
            )}

            {/* )} */}
          </Flex>

          <Box width="100%" overflowWrap="break-word">
            <Text dangerouslySetInnerHTML={{ __html: blog.content }} />
          </Box>
        </Box>
        <PostDeleteAlert
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => handleDeleteBlog(blog._id)}
        />
        <PostUpdateAlert
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onDelete={() => handleEditBlog(blog._id)}
        />
      </div>
    </ChakraProvider>
  );
};

export default ShowBlog;
