import React, { Fragment, useState, useEffect } from 'react';
import TreeNode from './treeNode';
import './styles.css';

const Tree = (props: any) => {
    const [data, setData] = useState({});
    const [isExpandedAll, setIsExpandedAll] = useState(false);
    const { treeData } = props;

    useEffect(() => setData(treeData), [treeData]);

    const changeOpenValue = (data: any, node: any) => {
        Object.values(data).forEach((item: any) => {
            if(node.type === 'parent' && item.id === node.id) item.isOpen = !node.isOpen;
            if(Array.isArray(item.children)) changeOpenValue(item.children, node);
        });

        setData({...data});
    }

    const getParentNodes = (data: any) => {
        const parentNodes: any[] = [];
        const generateParentNodes = (data: any) => {
            data.forEach((node: any) => {
                if(node.type === 'parent') parentNodes.push(node);
                if(Array.isArray(node.children)) generateParentNodes(node.children);
            })
        }

        generateParentNodes(data);

        return parentNodes;
    }

    const isOpenAllNodes = (data: any) => {
        const parentNodes = getParentNodes(data);
        const isOpenAll = parentNodes.every((node: any) => node.isOpen === true);

        return isOpenAll;
    }

    const handleToggleNode = (node: any, e: any) => {
        e.preventDefault();
        e.stopPropagation();
        changeOpenValue(data, node);

        if (isOpenAllNodes(Object.values(data))) setIsExpandedAll(true);
    }

    const handleExpandCollapseAll = (data: any, bool: boolean) => {
        data.forEach((node: any) => {
            if(node.type === 'parent') node.isOpen = bool;
            if(Array.isArray(node.children)) handleExpandCollapseAll(node.children, bool);
        });

        setData({...data});
        setIsExpandedAll(bool);
    }

    return(
        <Fragment>
            {!isExpandedAll 
                ? <button className='button' onClick={() => handleExpandCollapseAll(Object.values(data), true)}>Expand all</button>
                : <button className='button' onClick={() => handleExpandCollapseAll(Object.values(data), false)}>Collapse all</button>
            }
            {Object.values(data).map((node: any) => (
                <TreeNode
                    key={`${node.type}.${node.id}`}
                    node={node}
                    level={0}
                    onToggleNode={handleToggleNode}
                />
            ))}
        </Fragment>
    );
};

export default Tree;