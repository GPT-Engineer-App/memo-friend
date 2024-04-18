// Complete the Index page component for a note-taking app similar to Google Keep
import { useState, useEffect } from "react";
import { Box, Button, Flex, Input, Text, VStack, useColorMode, useColorModeValue, IconButton, HStack } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const fetchNotes = async () => {
  const response = await fetch("https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes", {
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });
  const data = await response.json();
  return data.map((note) => note.note);
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");

  const addNote = async () => {
    if (input.trim()) {
      await fetch("https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes", {
        method: "POST",
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: input }),
      });
      setInput("");
      fetchNotes().then(setNotes);
    }
  };

  const deleteNote = async (index) => {
    const noteToDelete = notes[index];
    await fetch(`https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes?note=eq.${noteToDelete}`, {
      method: "DELETE",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
        "Content-Type": "application/json",
      },
    });
    fetchNotes().then(setNotes);
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
