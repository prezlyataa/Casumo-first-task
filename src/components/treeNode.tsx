import React from 'react';

const TreeNode = (props: any) => {
    const { node, level } = props;

    const getPaddingLeft = (level: any, node: any) => {
        let paddingLeft = level * 10;
        if (node.children) paddingLeft += 10;
        return paddingLeft;
    }

    return(
        <div style={{paddingLeft: getPaddingLeft(level, node)}}>
            {/* <p>
                {node.type === 'parent'
                && (node.isOpen
                ? <i className="fa fa-angle-down" aria-hidden="true"></i>
                : <i className="fa fa-angle-right" aria-hidden="true"></i>
                )}
            </p> */}
            <p>{`id: ${node.id} type: ${node.type}`}</p>
            {node.type === 'parent' && node.children.map((childNode: any) => (
                <TreeNode
                    key={`${childNode.type}.${childNode.id}`}
                    node={childNode}
                    level={level + 1}
                />
            ))}
        </div>
    );
};

export default TreeNode;