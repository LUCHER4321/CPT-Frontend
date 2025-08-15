import { TreeProp } from "../enums";

export const treeProps = new Map([
    [TreeProp.TREE, {
            icon: "fa-tree",
            name: "Tree"
    }],
    [TreeProp.NODE, {
            icon: "fa-circle",
            name: "Node"
    }],
    [TreeProp.COLLABORATORS, {
            icon: "fa-users",
            name: "Collaborators"
    }],
    [TreeProp.COMMENTS, {
        icon: "fa-comment",
        name: "Comments"
    }]
])