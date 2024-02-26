import React from 'react';
import { Toaster } from 'react-hot-toast';
import TodoList from './components/TodoList';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO App</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <TodoList />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
