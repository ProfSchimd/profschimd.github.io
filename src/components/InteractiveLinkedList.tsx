"use client";
import React, { useState } from 'react';

interface ListNode {
  id: number;
  value: string;
  isNew?: boolean;
  isFloating?: boolean;
  isRemoving?: boolean;
}

type AnimationStep = 'creating' | 'positioning' | 'linking' | 'highlighting' | 'unlinking' | 'removing' | null;

interface NodeProps {
  node: ListNode;
  index: number;
  isLast: boolean;
  animationStep: AnimationStep;
}

const InteractiveLinkedList: React.FC = () => {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [animationStep, setAnimationStep] = useState<AnimationStep>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const addNode = async (): Promise<void> => {
    if (!inputValue.trim() || isAnimating) return;
    
    setIsAnimating(true);
    const newNodeId: number = Date.now();
    const newNode: ListNode = { id: newNodeId, value: inputValue.trim(), isNew: true };
    
    // Step 1: Create new node (show it separately)
    setAnimationStep('creating');
    setNodes(prev => [{ ...newNode, isFloating: true }, ...prev]);
    
    await sleep(1000);
    
    // Step 2: Position the new node and prepare for linking
    setAnimationStep('positioning');
    setNodes(prev => prev.map((node, index) => 
      index === 0 ? { ...node, isFloating: false } : node
    ));
    
    await sleep(800);
    
    // Step 3: Update the link (show connection)
    setAnimationStep('linking');
    
    await sleep(1000);
    
    // Step 4: Complete - remove animation states
    setAnimationStep(null);
    setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
    setInputValue('');
    setIsAnimating(false);
  };

  const removeNode = async (): Promise<void> => {
    if (nodes.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    // Step 1: Highlight the node to be removed
    setAnimationStep('highlighting');
    setNodes(prev => prev.map((node, index) => 
      index === 0 ? { ...node, isRemoving: true } : node
    ));
    
    await sleep(800);
    
    // Step 2: Update links (bypass the first node)
    setAnimationStep('unlinking');
    
    await sleep(1000);
    
    // Step 3: Remove the node
    setAnimationStep('removing');
    setNodes(prev => prev.slice(1));
    
    await sleep(500);
    
    setAnimationStep(null);
    setIsAnimating(false);
  };

  const Node: React.FC<NodeProps> = ({ node, index, isLast, animationStep }) => {
    const getNodeClasses = (): string => {
      let baseClasses = "relative bg-blue-500 text-white rounded-lg p-4 min-w-20 text-center font-bold transition-all duration-700 transform z-2";
      
      if (node.isFloating) {
        baseClasses += " -translate-y-20 opacity-70 scale-110 bg-green-500";
      } else if (node.isNew && animationStep === 'positioning') {
        baseClasses += " scale-105 bg-green-500";
      } else if (node.isNew && animationStep === 'linking') {
        baseClasses += " bg-green-500";
      } else if (node.isRemoving) {
        baseClasses += " bg-red-500 scale-110";
      }
      
      return baseClasses;
    };

    const getArrowClasses = (): string => {
      let baseClasses = "absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 text-5xl font-bold transition-all duration-500";
      
      if (animationStep === 'linking' && index === 0) {
        baseClasses += " text-green-500 scale-125";
      } else if (animationStep === 'unlinking' && index === 1) {
        baseClasses += " text-red-500 opacity-30";
      }
      
      return baseClasses;
    };

    return (
      <div className="relative flex items-center">
        <div className={getNodeClasses()}>
          <div className="text-sm mb-1">Node</div>
          <div className="text-lg">{node.value}</div>
          <div className="text-xs mt-1 opacity-75">
            {index === 0 ? 'Head' : `Index ${index}`}
          </div>
        </div>
        {!isLast && (
          <div className={getArrowClasses()}>
            →
          </div>
        )}
      </div>
    );
  };

  const getStepDescription = (): string => {
    switch (animationStep) {
      case 'creating':
        return '📝 Step 1: Creating new node with the input value';
      case 'positioning':
        return '📍 Step 2: Positioning the new node at the head position';
      case 'linking':
        return '🔗 Step 3: Updating links - new node points to the old head';
      case 'highlighting':
        return '🎯 Step 1: Identifying the head node to remove';
      case 'unlinking':
        return '🔓 Step 2: Updating head pointer to skip the first node';
      case 'removing':
        return '🗑️ Step 3: Removing the old head node from memory';
      default:
        return nodes.length === 0 
          ? '🎓 Add your first node to start learning linked lists!' 
          : `📊 Linked List with ${nodes.length} node${nodes.length !== 1 ? 's' : ''}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addNode();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Interactive Linked List Tutorial
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn how linked lists work by adding and removing nodes with step-by-step animations
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter node value..."
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            onKeyPress={handleKeyPress}
            disabled={isAnimating}
          />
          <div className="flex gap-2">
            <button
              onClick={addNode}
              disabled={!inputValue.trim() || isAnimating}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add to Head
            </button>
            <button
              onClick={removeNode}
              disabled={nodes.length === 0 || isAnimating}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Remove Head
            </button>
          </div>
        </div>
      </div>

      {/* Animation Status */}
      <div className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
        <div className="text-blue-800 dark:text-blue-200 font-medium">
          {getStepDescription()}
        </div>
      </div>

      {/* Linked List Visualization */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 mb-8 overflow-x-auto">
        <div className="flex items-center justify-center min-h-32">
          {nodes.length === 0 ? (
            <div className="text-gray-400 text-lg text-center">
              <div className="text-4xl mb-2">📝</div>
              <div>No nodes yet. Add one to get started!</div>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              {nodes.map((node, index) => (
                <Node 
                  key={node.id} 
                  node={node} 
                  index={index} 
                  isLast={index === nodes.length - 1}
                  animationStep={animationStep}
                />
              ))}
              <div className="bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg p-4 min-w-20 text-center font-bold">
                <div className="text-sm mb-1">NULL</div>
                <div className="text-lg">∅</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">🔗 How Linked Lists Work</h2>
          <div className="font-thin">
            <div><span className="font-bold">Nodes</span>: Each element contains data and a pointer to the next node</div>
            <div><span className="font-bold">Head</span>: The first node in the list (entry point)</div>
            <div><span className="font-bold">Pointers</span>: References that connect nodes together</div>
            <div><span className="font-bold">NULL</span>: Marks the end of the list</div>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">⚡ Operations</h2>
          <div className="font-thin">
            <div><span className="font-bold">Add to Head</span>: O(1) - Create node → Point to old head → Update head pointer</div>
            <div><span className="font-bold">Remove Head</span>: O(1) - Update head to next node → Free old head</div>
            <div><span className="font-bold">Memory</span>: Dynamic allocation, nodes can be anywhere in memory</div>
            <div><span className="font-bold">Benefit</span>: Efficient insertion/deletion at the beginning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLinkedList;