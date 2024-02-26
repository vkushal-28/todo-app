import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/modules/app.module.scss";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { replaceTodo, updateTodo } from "../slices/todoSlice";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const dragTodo = useRef(0);
  const dragOverTodo = useRef(0);

  console.log("first", todoList);
  const sortedTodoList = [...todoList];
  // sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  const handleSort = () => {
    const sortedTodoList = [...todoList];
    const temp = sortedTodoList[dragTodo.current];
    sortedTodoList[dragTodo.current]=sortedTodoList[dragOverTodo.current]
    sortedTodoList[dragOverTodo.current] = temp;
    dispatch(replaceTodo( sortedTodoList));

  };

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo, index) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              dragOverTodo={dragOverTodo}
              dragTodo={dragTodo}
              handleSort={handleSort}
            />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TodoList;
