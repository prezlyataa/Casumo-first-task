import React, { Fragment, useState, useEffect } from 'react';
import TreeNode from './treeNode';

const Tree = (props: any) => {
    const [data, setData] = useState({});
    const { treeData } = props;

    useEffect(() => setData(treeData), []);

    return(
        <Fragment>
            {Object.values(data).map((node: any) => (
                <TreeNode
                    key={`${node.type}.${node.id}`}
                    node={node}
                    level={0}
                />
            ))}
        </Fragment>
    );
};

export default Tree;