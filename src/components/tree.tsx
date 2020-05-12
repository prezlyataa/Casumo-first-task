import React, { Fragment, useState, useEffect } from 'react';
import TreeNode from './treeNode';

const Tree = (props: any) => {
    const [data, setData] = useState({});
    const { treeData } = props;

    useEffect(() => setData(treeData), []);

    const changeOpenValue = (data: any, node: any) => {
        Object.values(data).forEach((item: any) => {
            if(node.type === 'parent' && item.id === node.id) {
                item.isOpen = !node.isOpen;
            }
            if(Array.isArray(item.children)) {
                changeOpenValue(item.children, node)
            }
        });

        setData({...data});
    }

    const handleToggleNode = (node: any, e: any) => {
        e.preventDefault();
        e.stopPropagation();
        changeOpenValue(data, node);
    }

    console.log(data)

    return(
        <Fragment>
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