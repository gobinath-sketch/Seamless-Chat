import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Chat from './pages/chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout currentPageName="Chat">
              <Chat />
            </Layout>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <Layout currentPageName="Chat">
              <Chat />
            </Layout>
          } 
        />
      </Routes>
    </div>
  );
}

export default App; 