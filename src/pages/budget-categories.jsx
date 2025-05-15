import {
  Box,
  Flex,
  Heading,
  useToast,
  Button,
  useDisclosure,
  Card,
  Text,
} from "@chakra-ui/react";
import {
  getAllBudgetItemsForMonth,
  createBudgetItem,
  editBudgetItem,
  deleteBudgetItem,
} from "../http/budget";
import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { CreateEditBudgetItemModal } from "../components/CreateEditBudgetItemModal";
import { BudgetItemCard } from "../components/BudgetItemCard";

export function BudgetCategoriesPage() {
  const [budgetItems, setBudgetItems] = useState();
  const [actionType, setActionType] = useState();
  const [currentBudgetItem, setCurrentBudgetItem] = useState();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    populateBudgetItems();
  }, []);

  function populateBudgetItems() {
    getAllBudgetItemsForMonth(new Date(), true).then((res) => {
      if (res.status === 200) {
        res.json().then((jsonData) => setBudgetItems(jsonData.items));
      } else {
        toast({
          title: "Somthing went wrong, try again later!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  }

  function onEditBudgetItem(updatedBudgetItem) {
    console.log(updatedBudgetItem);
    editBudgetItem(updatedBudgetItem)
      .then(() => {
        toast({
          title: "Budget item edited",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        populateBudgetItems();
      })
      .catch((err) => console.log(err));
  }

  function onAddBudgetItem(newBudgetItem) {
    createBudgetItem(newBudgetItem)
      .then(() => {
        toast({
          title: "Budget item added",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        populateBudgetItems();
      })
      .catch((err) => console.log(err));
  }

  function onDeleteBudgetItem(budgetItemId) {
    deleteBudgetItem(budgetItemId)
      .then(() => {
        toast({
          title: "Budget item deleted!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        populateBudgetItems();
      })
      .catch((err) => console.log(err));
  }

  function displayEditBudgetItemModal(budgetItem) {
    console.log("edit");
    onOpen();
    setActionType("edit");
    setCurrentBudgetItem(budgetItem);
  }

  function displayAddBudgetItemModal() {
    console.log("add");
    onOpen();
    setActionType("add");
    setCurrentBudgetItem();
  }

  return (
    <Box>
      {isOpen && (
        <CreateEditBudgetItemModal
          isEdit={actionType === "edit"}
          onItemAction={
            actionType === "add" ? onAddBudgetItem : onEditBudgetItem
          }
          budgetItem={currentBudgetItem}
          onClose={onClose}
        />
      )}
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">
        <Heading>Budget Categories</Heading>
        <Box>
          <Button
            onClick={displayAddBudgetItemModal}
            leftIcon={<FiPlusCircle />}
          >
            Add Item
          </Button>
        </Box>
      </Flex>
      {budgetItems?.length ? (
        <Flex>
          {console.log(budgetItems)}
          {budgetItems.map((budgetItem) => (
            <Box flex={"50%"} key={budgetItem.id}>
              <BudgetItemCard
                budgetItem={budgetItem}
                handleEdit={displayEditBudgetItemModal}
                handleDelete={onDeleteBudgetItem}
              />
            </Box>
          ))}
        </Flex>
      ) : (
        <Card>
          <Box textAlign="center" py={4} bgColor="gray.700" borderRadius="md">
            <Text>No Budget Items.</Text>
          </Box>
        </Card>
      )}
    </Box>
  );
}
