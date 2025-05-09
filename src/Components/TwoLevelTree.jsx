import React, { useEffect, useState } from 'react';
import { getTwoLevelDownline } from '../Components/helper/apiCalls'; // Adjust path as needed
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TreeNode = ({ user, level = 0 }) => {
  const [showCard, setShowCard] = useState(false);

  const imageSizes = ['80px', '60px', '45px'];
  const size = imageSizes[level] || '35px';

  return (
    <div className="flex flex-col items-center relative">
      {/* User Image */}
      <div
        className="relative group z-0"
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
        onClick={() => setShowCard((prev) => !prev)}
      >
        <img
          src="/user3d.png"
          alt={user.name}
          className="rounded-full border-2 border-blue-500 hover:border-blue-700 transition-all duration-300"
          style={{ width: size, height: size }}
        />

        {/* Info Card */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-white p-3 rounded-lg shadow-lg border w-48 z-[1000]"
            >
              <p className="font-bold">{user.name}</p>
              <p>{user.mobile}</p>
              <p>ID: {user.referralCode}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Children Nodes */}
      {user.children?.length > 0 && (
        <div className="relative mt-6 w-full flex justify-center">
          {/* Vertical line from parent to horizontal line */}
          <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-400 z-0 -translate-x-1/2" />

          {/* Horizontal line connecting all children */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-400 z-0 mx-auto" />

          {/* Children with individual vertical lines */}
          <div className="flex justify-center gap-6 w-full mt-6">
            {user.children.map((child, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-400 z-0 -translate-x-1/2" />
                <TreeNode user={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const TwoLevelTree = ({userId}) => {
    const [treeData, setTreeData] = useState(null);
    // const user = lsService.get('user');
  
    useEffect(() => {
      const fetchTree = async () => {
        const res = await getTwoLevelDownline(userId);
        if (res.status === 200) {
          setTreeData(res.data);
        }
      };
      fetchTree();
    }, []);
  
    if (!treeData) return <div className="text-center py-6">Loading...</div>;
  
    return (
      <div className="p-6 overflow-auto">
        <div className="flex justify-center">
          <TreeNode user={treeData} />
        </div>
      </div>
    );
  };
  
  export default TwoLevelTree;