import { Badge, Box, Button, Checkbox, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useToDo from '../store/useToDo';
import { RiDeleteBin6Line } from "react-icons/ri";

const Hero = () => {
    const [task, setTask] = useState('');
    const [filter, setFilter] = useState('all');
    const { addTask, markAsDone, deleteTask, deleteSelectedTasks, toggleTaskSelection, getTasks, selectedTasks } = useToDo();

    const handleAddTask = () => {
        if (task.trim()) {
            addTask({ title: task, status: 'unfulfilled' });
            setTask('');
        }
    };

    const handleMarkAsDone = (taskToMark) => {
        markAsDone(taskToMark);
    };

    const handleDeleteTask = (taskToDelete) => {
        deleteTask(taskToDelete);
    };

    const handleDeleteSelectedTasks = () => {
        deleteSelectedTasks();
    };

    const handleToggleTaskSelection = (taskToToggle) => {
        toggleTaskSelection(taskToToggle);
    };

    const handleDoubleClick = (taskToToggle) => {
        handleToggleTaskSelection(taskToToggle);
    };

    const tasks = getTasks(filter)(useToDo.getState());

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            p={4}
            gap={5}
        >
            <Text
                className='text'
                fontSize={{ base: '30px', md: '36px' }}
                fontWeight={700}
                mb={5}
            >
                Lista de tarefas
            </Text>
            <Flex justifyContent={'space-around'} alignItems={'center'} gap={2} >
                <Input
                    placeholder='Digite sua tarefa'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <Button w={'130px'} colorScheme='blue' onClick={handleAddTask}>
                    Adicionar
                </Button>
            </Flex>
            <Box>
                <Flex gap={2} justifyContent={'space-around'} alignItems={'center'}>
                    <Badge
                        cursor={'pointer'}
                        borderRadius={5}
                        colorScheme='purple'
                        variant={'outline'}
                        onClick={() => setFilter('unfulfilled')}
                    >
                        Em Andamento
                    </Badge>
                    <Badge
                        cursor={'pointer'}
                        borderRadius={5}
                        colorScheme='green'
                        variant={'outline'}
                        onClick={() => setFilter('done')}
                    >
                        Concluídas
                    </Badge>
                    <Badge
                        cursor={'pointer'}
                        borderRadius={5}
                        colorScheme='purple'
                        variant={'outline'}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </Badge>
                </Flex>
            </Box>
            <Flex justifyContent={'space-between'} alignItems={'center'} w={'380px'}>
                <Box>
                    {selectedTasks.length > 0 && (
                        <Text fontSize='sm' color='gray.500'>{selectedTasks.length} selecionado(s)</Text>
                    )}
                </Box>
            </Flex>
            <Box w={'380px'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} flexDir={'column'} gap={5} >
                {tasks.map((task, index) => (
                    <Flex
                        w={'100%'}
                        border={'2px solid '}
                        borderRadius={'10px'}
                        p={5}
                        key={index}
                        justifyContent="space-between"
                        alignItems="center"
                        onDoubleClick={() => handleDoubleClick(task)}
                        bg={selectedTasks.some((t) => t.title === task.title) ? 'black' : 'transparent'}
                        color={selectedTasks.some((t) => t.title === task.title) ? 'white' : ''}
                    >
                        <Flex alignItems={'center'} justifyContent={'space-around'} gap={2}>
                            <Checkbox
                                isChecked={task.status === 'done'}
                                onChange={() => handleMarkAsDone(task)}
                            />
                            <Text textDecor={task.status === 'done' ? 'line-through' : 'none'}>{task.title}</Text>
                        </Flex>
                        {task.status === 'unfulfilled' && (
                            <IconButton
                                icon={<RiDeleteBin6Line />}
                                borderRadius={'100%'}
                                onClick={() => handleDeleteTask(task)}
                                aria-label="Delete Task"
                            />
                        )}
                    </Flex>
                ))}
                <Button variant={'outline'} colorScheme='red' onClick={handleDeleteSelectedTasks} disabled={selectedTasks.length === 0}>
                    Delete selected
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
