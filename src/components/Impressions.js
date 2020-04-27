import React from "react";
import data from '../data/impressions-tree.json';

function TreeNode(props) {
    console.log('treenode props:', props);
    const hasChildren = props.node.children && props.node.children.length > 0;
    return (
        <div>
        <li>{props.title} {props.node.id}

        </li>
    {
        hasChildren &&
            <ImpressionsTree tree={props.node.children}/>
    }
        </div>
    );
}

function ImpressionsTree(props) {
    console.log('props', props);
    return (
        <ul>
            {props.tree.map(treeNode => (
                <TreeNode key={treeNode.id} title={treeNode.text} node={treeNode} />
            ))}
        </ul>
    );
}
class Impressions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'unloaded',
            tree: [],
            age: 0,
            agePlus20: 0,
        };
    }
    loadImpressionsTree() {
        console.log('data?', data);
        this.setState({tree: data, status: 'Loaded'});

    }
    handleChange = (e) =>{
        console.log('value:', e.target.value);
        this.setState({age: e.target.value}, () => {
            console.log('new age:', this.state.age);
            this.add20Years();
        });
    }
    add20Years() {
        const plus20 = parseInt(this.state.age) + 20;
        this.setState({agePlus20: plus20});
    }
    render() {
        return (
            <div>
                <div>Hello Impressions!</div>
                <div>Enter your age: <input type="number" defaultValue={this.state.age}  onChange={this.handleChange}/> </div>
                <button onClick={() => this.loadImpressionsTree()}>Load Impression Tree</button>
                <div>Status: {this.state.status}</div>
                <div>In 20 years, you'll be: {this.state.agePlus20} years old!</div>
                <ImpressionsTree tree={this.state.tree} />
            </div>
        );
    }
}

export default Impressions;