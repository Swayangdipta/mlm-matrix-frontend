import React from "react";
import Tree from "react-d3-tree";

const TeamTree = ({ data }) => {
  const containerStyles = { width: "100%", height: "500px" };

  return (
    <div className="w-full h-screen mt-30">
      <Tree collapsible data={data} orientation="vertical" 
            translate={{
                x: (window.innerWidth - 40 )/ 2, 
                y: 100
            }}  
            separation={{ siblings: 2, nonSiblings: 2 }} // Increases spacing
            nodeSize={{ x: 200, y: 200 }} // Increases the gap between nodes
        />
    </div>
  );
};

export default TeamTree

