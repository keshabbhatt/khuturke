import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import {
	Flex,
	Box,
	IconButton,
	Stack,
	Text,
	Input,
	useToast,
} from "@chakra-ui/react";
import { FiTrash2, FiSave, FiX } from "react-icons/fi";
import { useColorMode } from "@chakra-ui/react";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useState } from "react";
import { createNote, deleteNote, updateNote } from "../db/notes";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeStore } from "../theme-store";
import "./note.css";
export function NoteEditorPage() {
	const today = new Date().toDateString();
	const toast = useToast();
	const location = useLocation();
	const navigate = useNavigate();
	const note = location.state?.note;
	const { colorMode } = useColorMode();
	const [confirmModal, setConfirmModal] = useState(false);
	const [content, setContent] = useState(note?.content);
	const [title, setTitle] = useState(note?.title ?? "New Title");
	const [isLoading, setIsLoading] = useState(false);
	const font = useThemeStore((state) => state.font);

	// Creates a new editor instance.
	const editor = useBlockNote(
		{
			theme: colorMode,
			initialContent: content,
			editorDOMAttributes: {
				class: `editor-${colorMode} font-${font}`,
			},
			onEditorContentChange: (e) => {
				// save this in db console.log(e.topLevelBlocks);
				setContent(e.topLevelBlocks);
			},
		},
		[colorMode]
	);

	function onSaveChanges() {
		setIsLoading(true);

		if (note) {
			note.updatedAt = today;
			note.title = title;
			note.content = content;

			updateNote(note)
				.then((res) => {
					toast({
						title: "Note updated!",
						status: "success",
						isClosable: true,
						duration: 5000,
					});
					navigate("/notes");
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: "Failed to update note!",
						status: "error",
						isClosable: true,
						duration: 5000,
					});
				});
		} else {
			const newNote = {
				title: title,
				content: content,
				updatedAt: today,
			};
			createNote(newNote)
				.then((res) => {
					toast({
						title: "Note created!",
						status: "success",
						isClosable: true,
						duration: 5000,
					});
					navigate("/notes");
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: "Failed to create note!",
						status: "error",
						isClosable: true,
						duration: 5000,
					});
				});
		}
	}

	function resetNoteState() {
		setContent(note?.content);
		setTitle(note?.title ?? "New Title");
	}

	function onDeleteNote() {
		deleteNote(note.id)
			.then((res) => {
				toast({
					title: "Note deleted!",
					status: "success",
					isClosable: true,
					duration: 5000,
				});
				navigate("/notes");
			})
			.catch((err) => {
				console.log(err);
				toast({
					title: "Failed to delete note!",
					status: "error",
					isClosable: true,
					duration: 5000,
				});
			});
	}

	// Renders the editor instance using a React component.
	return (
		<Stack>
			{note ? (
				<ConfirmationModal
					isOpen={confirmModal}
					onClose={() => {
						setConfirmModal(false);
					}}
					trueButtonColor="red"
					trueButtonText="Delete"
					falseButtonColor="default"
					title="Delete note"
					body="Are you sure you want to delete the note?"
					falseButtonAction={() => {
						setConfirmModal(false);
					}}
					trueButtonAction={onDeleteNote}
				/>
			) : (
				<ConfirmationModal
					isOpen={confirmModal}
					onClose={() => {
						setConfirmModal(false);
					}}
					trueButtonColor="red"
					trueButtonText="Discard"
					falseButtonColor="default"
					title="Discard note"
					body="Are you sure you want to discard the note?"
					falseButtonAction={() => {
						setConfirmModal(false);
					}}
					trueButtonAction={() => {
						resetNoteState();
						navigate("/notes");
					}}
				/>
			)}

			<Flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Box>
					<Input
						variant="unstyled"
						value={title}
						placeholder="Title"
						size="lg"
						fontSize="xx-large"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						width="3xl"
					/>
				</Box>
				<Flex>
					<Box>
						<IconButton
							aria-label="Save changes"
							icon={<FiSave />}
							colorScheme="blue"
							isLoading={isLoading}
							onClick={onSaveChanges}
						/>
					</Box>

					{note ? (
						<Box ml="1rem">
							<IconButton
								aria-label="Delete note"
								icon={<FiTrash2 />}
								colorScheme="red"
								onClick={() => {
									setConfirmModal(true);
								}}
							/>
						</Box>
					) : (
						<Box ml="1rem">
							<IconButton
								aria-label="Discard changes"
								icon={<FiX />}
								colorScheme="orange"
								onClick={() => {
									setConfirmModal(true);
								}}
							/>
						</Box>
					)}
				</Flex>
			</Flex>
			<Flex mb="2rem">
				<Box>
					<Text as="i">{note?.createdAt ?? today}</Text>
				</Box>
			</Flex>
			<Box
				minH="lg"
				backgroundColor={colorMode === "light" ? "#ddddd" : "grey.800"}
				borderRadius={10}
				pt="1rem"
				pb="1rem"
				mb="2rem"
			>
				<BlockNoteView editor={editor} />
			</Box>
		</Stack>
	);
}
