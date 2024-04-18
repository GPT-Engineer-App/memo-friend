// Complete the Index page component for a note-taking app similar to Google Keep
import { useState } from "react";
import { Box, Button, Flex, Input, Text, VStack, useColorMode, useColorModeValue, IconButton, HStack } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput("");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <VStack p={4}>
      <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound="true" size="lg" alignSelf="flex-end" onClick={toggleColorMode} />
      <Flex w="100%" p={4} alignItems="center">
        <Input placeholder="Type your note here..." value={input} onChange={(e) => setInput(e.target.value)} variant="filled" bg={bgColor} color={color} />
        <Button ml={2} onClick={addNote} leftIcon={<FaPlus />} colorScheme="pink">
          Add Note
        </Button>
      </Flex>
      <VStack w="100%" spacing={4}>
        {notes.map((note, index) => (
          <HStack key={index} w="100%" p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" spacing={4}>
            <Text flex="1" wordBreak="break-word">
              {note}
            </Text>
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => deleteNote(index)} aria-label={`Delete note ${index}`} />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
