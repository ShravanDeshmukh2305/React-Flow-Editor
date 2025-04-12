import React, { useState, useCallback, createContext, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ProductNode from "./ProductNode";

export const FlowContext = createContext();

const nodeTypes = {
  productNode: ProductNode,
};

const FlowEditorInner = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [id, setId] = useState(1);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  const addNode = (product) => {
    const newNode = {
      id: `${id}`,
      type: "productNode",
      data: { title: product.title, price: product.price },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setId(id + 1);
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setNodes((nds) => nds.filter((n) => !deleted.find((d) => d.id === n.id)));
    },
    [setNodes]
  );

  const onEdgesDelete = useCallback(
    (deleted) => {
      setEdges((eds) => eds.filter((e) => !deleted.find((d) => d.id === e.id)));
    },
    [setEdges]
  );

  const onSelectionChange = ({ nodes, edges }) => {
    setSelectedNodes(nodes || []);
    setSelectedEdges(edges || []);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNodes.length > 0) onNodesDelete(selectedNodes);
        if (selectedEdges.length > 0) onEdgesDelete(selectedEdges);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodes, selectedEdges, onNodesDelete, onEdgesDelete]);

  return (
    <FlowContext.Provider value={{ addNode }}>
      <div className="flex flex-1 h-full bg-gradient-to-tr from-gray-50 to-gray-100 rounded-lg shadow-inner overflow-hidden">
        <div className="w-1/4 border-r bg-white p-4">{children}</div>
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            className="rounded-md"
          >
            <MiniMap />
            <Controls />
            <Background gap={12} size={1.5} />
          </ReactFlow>
        </div>
      </div>
    </FlowContext.Provider>
  );
};

const FlowEditor = ({ children }) => (
  <ReactFlowProvider>
    <FlowEditorInner>{children}</FlowEditorInner>
  </ReactFlowProvider>
);

export default FlowEditor;

