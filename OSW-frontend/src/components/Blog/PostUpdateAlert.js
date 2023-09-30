import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";

const PostUpdateAlert = ({ isOpen, onClose, onDelete }) => {
  const cancelRef = useRef();

  return (
    <ChakraProvider>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to Update Post ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} ml={-10} mr={3}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onDelete} mr={-10}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
};

export default PostUpdateAlert;
