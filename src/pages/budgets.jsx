import {
  Box,
  Flex,
  Heading,
  Button,
  Card,
  Text,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { getAllBudgets, changeActiveBudget, deleteBudget } from "../db/budgets";
import { useLiveQuery } from "dexie-react-hooks";
import { BudgetCard } from "../components/BudgetCard";
import { useEffect, useState } from "react";
export function BudgetsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  let [currentActiveBudget, setCurrentActiveBudget] = useState();
  const budgets = useLiveQuery(async () => {
    return await getAllBudgets();
  }, []);

  useEffect(() => {
    let activeBudgetId = budgets?.find((b) => b.isActive)?.id;
    console.log(activeBudgetId);
    setCurrentActiveBudget(activeBudgetId);
    if (budgets && !activeBudgetId) {
      toast({
        title: "No active budget!",
        status: "warning",
        isClosable: true,
        duration: 5000,
      });
    }
  }, [budgets]);

  function activateBudget(newBudgetId) {
    if (currentActiveBudget === newBudgetId) {
      toast({
        title: "Cannot deactivate only budget!",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      return;
    }
    changeActiveBudget(currentActiveBudget, newBudgetId)
      .then(() => {
        setCurrentActiveBudget(newBudgetId);
        toast({
          title: "Budget activated!",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Failed to activate budget!",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      });
  }

  function handleDeleteBudget(budgetId) {
    console.log(currentActiveBudget, budgetId);
    if (currentActiveBudget === budgetId) {
      toast({
        title: "Failed to delete budget!",
        description:
          "Cannot delete an active budget. Please change the current active budget and try again!",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      return;
    }
    deleteBudget(budgetId)
      .then(() => {
        toast({
          title: "Budget deleted successfully!",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to delete budget!",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      });
  }
  function redirectToEditPage(budgetId) {
    navigate("/budgets/" + budgetId);
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">
        <Heading>Budgets</Heading>
        <Box>
          <Button
            leftIcon={<FiPlusCircle />}
            onClick={() => {
              navigate("/budgets/0");
            }}
          >
            New Budget
          </Button>
        </Box>
      </Flex>
      {budgets?.length !== 0 ? (
        <SimpleGrid columns={3} spacing={4}>
          {budgets?.map((budget) => {
            return (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onActivate={activateBudget}
                onDelete={handleDeleteBudget}
                onEdit={redirectToEditPage}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <Card>
          <Box textAlign="center" py={4} bgColor="gray.700" borderRadius="md">
            <Text>No Budgets found</Text>
          </Box>
        </Card>
      )}
    </Box>
  );
}
