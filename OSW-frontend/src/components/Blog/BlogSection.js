import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useMediaQuery,
  ChakraProvider,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { hostname } from "../../hostname";
import { AddIcon } from "@chakra-ui/icons";
import PostCard from "./PostCard";

const MediaSection = ({ userType }) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [Personal, setPersonal] = useState(false);
  const [isLSmallScreen] = useMediaQuery("(max-width: 800px)");

  const navigate = useNavigate();
  const toast = useToast();
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
            await setUser(payload); // Set user state with decoded data
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
  // Fetch all blogs when the component mounts
  const fetchBlogs = async () => {
    const url = `${hostname}/blogs`;
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

    try {
      const res = await fetch(url, options);
      const blogsData = await res.json();
      console.log(blogsData);
      setPersonal(false);
      setBlogs(blogsData.blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchPersonalBlogs = async () => {
    let options;

    if (localStorage.getItem("userAuthToken")) {
      console.log(localStorage.getItem("userAuthToken"));
      options = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("userAuthToken"),
      };
    } else {
      options = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminAuthToken"),
      };
    }
    try {
      const response = await fetch(`${hostname}/personal-blogs`, {
        method: "GET",
        headers: options,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBlogs(data.blogsData);
        setPersonal(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch events:", errorData);
        // Handle the error or display an error message to the user
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error getting Personal Blogs!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      // Handle the error or display an error message to the user
    }
  };
  if (!blogs || blogs.length === 0) {
    return (
      <ChakraProvider>
        <Navbar />
        <div
          style={{
            backgroundImage: "url('../bg.png')",
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
            height={"85vh"}
            mx="auto"
            borderWidth="1px"
            p={2}
            bg={"white"}
            borderRadius="md"
            boxShadow="md"
            mt={4}
            mb={2}
            bgColor={"rgba(186, 182, 182, 0.4)"}
          >
            <Heading as={"h1"} mb={4}>
              NO Blogs
            </Heading>
            <Button
              onClick={() =>
                userType !== "ngo"
                  ? navigate(-1)
                  : navigate("/Ngo/media/create")
              }
              colorScheme="teal"
              mb={4}
              bg="white"
              color="skyblue"
              // w={"15vw"}
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
              _hover={{ boxShadow: "0px 4px 6px skyblue" }}
              _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              {userType !== "ngo" ? "Back" : "Create New Blog"}
            </Button>
          </Box>
        </div>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Navbar />
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          maxWidth={{ base: "95vw", lg: "90vw" }}
          mx="auto"
          height={"85vh"}
          overflowY={"scroll"}
          scrollBehavior={"smooth"}
          mt={4}
          mb={2}
          borderWidth="1px"
          p={2}
          bgColor={"rgba(186, 182, 182, 0.4)"}
          backdropFilter="auto"
          backdropBlur="8px"
          borderRadius="md"
          boxShadow="xl"
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
          {user && (
            <>
              <Flex
                justifyContent="flex-start"
                position="absolute"
                top="10px"
                left="10px"
              >
                <Button
                  colorScheme="teal"
                  mr={2}
                  onClick={() => fetchPersonalBlogs()}
                >
                  Personal Blogs
                </Button>
                <Button colorScheme="teal" onClick={() => fetchBlogs()}>
                  All Blogs
                </Button>
              </Flex>
            </>
          )}
          {/* <Flex justifyContent={"center"}> */}
          <Heading
            as="h1"
            mb={4}
            style={{
              color: "#56B847",
              textDecorationLine: "underline",
              textDecorationColor: "teal",
              textDecorationThickness: "4px",
            }}
          >
            All Blogs
          </Heading>

          {/* {userType === "ngo" && ( */}
          {/* )} */}
          {user && (
            <div
              style={{
                marginLeft: "80vw",
                marginTop: "-6vh",
                marginBottom: "5vh",
              }}
            >
              <Button
                onClick={() => navigate("/post-blogs")}
                bg="white"
                color="teal"
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                //   _hover={{ boxShadow: "0px 4px 6px teal" }}
                //   _active={{ boxShadow: "0px 2px 4px" }}
              >
                {/* Create New */}
                {!isLSmallScreen ? (
                  "Create New"
                ) : (
                  <IconButton as={AddIcon} boxSize={6} bg={"transparent"} />
                )}
              </Button>
            </div>
          )}
          {/* </Flex> */}
          <Flex justifyContent={"center"}>
            <Flex flexWrap="wrap" justifyContent={"center"} gap={2}>
              {blogs &&
                blogs.map((blog) => {
                  return (
                    <PostCard
                      setBlogs={setBlogs}
                      blog={blog}
                      user={user}
                      personal={Personal}
                      key={blog._id}
                    />
                  );
                })}
            </Flex>
          </Flex>
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default MediaSection;
