import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../components/AddTaskForm';
import AddListForm from '../components/AddListForm';
import List from '../components/List';
import { getLists, deleteItem, deleteList, logout, moveItem, getCurrentUserInfo } from '../ApiClient'; // Import the deleteItem function from your ApiClient

const DashboardPage = () => {
    const [lists, setLists] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); // Perform the logout operation
            navigate('/login'); // Navigate to login after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Function to handle list creation
    const handleListCreated = async (newList) => {
        console.log('New list created:', newList);
        setLists([...lists, newList]);
    };

    // Function to handle task creation
    const handleTaskAdded = (listId, newTask) => {
        setLists(lists.map(list => {
            if (list.id === parseInt(listId)) {
                const updatedList = { ...list, tasks: list.tasks ? [...list.tasks, newTask] : [newTask] };
                return updatedList;
            }
            return list;
        }));
    };    

    // Function to handle task deletion
    const handleTaskDeleted = async (listId, taskId) => {
        // Delete the task using the deleteItem function
        console.log('Deleting task:', taskId, 'from list:', listId);
        await deleteItem(listId, taskId);

        try {
            // Update the lists state after deletion
            setLists(lists.map(list => {
                if (list.id === parseInt(listId)) {
                    // Filter out the deleted task from the tasks array
                    console.log(taskId, list.tasks)
                    const tasksArray = Array.isArray(list.tasks) ? list.tasks : [];
                    const updatedTasks = tasksArray.filter(task => task.id !== taskId);
                    console.log('Updated tasks:', updatedTasks)
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            }));
        } catch (error) {
            console.error('Error deleting task dynamically:', error);
        }
    };

    // Function to handle list deletion
    const handleListDeleted = async (listId) => {
        // Call your API to delete the list here, for example:
        await deleteList(listId);

        // Update the lists state to filter out the deleted list
        setLists(lists.filter(list => list.id !== listId));
    };

    const handleTaskMoved = async (fromListId, taskId, toListId) => {
        try {
            await moveItem(fromListId, taskId, toListId);
            // Update UI to reflect the task move
            // This could involve re-fetching lists or manually adjusting the state to reflect the move
            // For simplicity, we'll just re-fetch lists here, but you could optimize by directly adjusting the state
            const listsData = await getLists();
            setLists(listsData.lists);
        } catch (error) {
            console.error('Error moving task:', error);
        }
    };

    // Fetch lists when the component mounts
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const listsData = await getLists();
                setLists(listsData.lists);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };
        fetchLists();
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getCurrentUserInfo();
                setUsername(userInfo.username); // Set username
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <h1>{username}'s To Do List</h1>
            <button onClick={handleLogout}>Logout</button>
            <AddListForm onListCreated={handleListCreated} />
            <AddTaskForm lists={lists} onTaskAdded={handleTaskAdded} />
            {lists.map((list) => (
                <List key={list.id} list={list} onTaskDeleted={handleTaskDeleted} onListDeleted={handleListDeleted} onTaskMoved={handleTaskMoved} lists={lists} />
            ))}
        </div>
    );
};

export default DashboardPage;