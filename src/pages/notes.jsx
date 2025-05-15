import {
	Box,
	Heading,
	Flex,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
	Text,
	Card,
	CardHeader,
	CardBody,
	SimpleGrid,
} from "@chakra-ui/react";
import { getAllNotes } from "../db/notes";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function NotesPage() {
	const navigate = useNavigate();
	const [notes, setNotes] = useState();
	const [notesList, setNotesList] = useState();
	useEffect(() => {
		getAllNotes().then((notes) => {
			setNotes(notes);
			setNotesList(notes);
		});
	}, []);

	const [search, setSearch] = useState();

	useEffect(() => {
		setNotesList(
			notes?.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
		);
	}, [search]);

	return (
		<Box>
			<Heading mb="2rem">Notes</Heading>
			<Flex justifyContent="space-between" alignItems="center" mb={4}>
				<Box w="md">
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<FiSearch color="gray.300" />
						</InputLeftElement>
						<Input
							variant="filled"
							type="text"
							placeholder="Title"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</InputGroup>
				</Box>
				<Box>
					<Button
						leftIcon={<FiPlusCircle />}
						onClick={() => {
							navigate("/note");
						}}
					>
						New Note
					</Button>
				</Box>
			</Flex>
			<SimpleGrid columns={3} spacing={4}>
				{notesList?.map((note) => (
					<Card
						key={note.id}
						onClick={() => {
							navigate("/note", { state: { note: note } });
						}}
						cursor="pointer"
						borderRadius={10}
					>
						<CardHeader>
							<Heading size="lg">{note.title}</Heading>
						</CardHeader>
						<CardBody>
							{" "}
							<Text as="i">{note.updatedAt}</Text>
						</CardBody>
					</Card>
				))}
			</SimpleGrid>
		</Box>
	);
}
