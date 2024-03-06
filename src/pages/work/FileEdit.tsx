import { apis } from '@/http/api';
import { Button, Card, Tree, TreeProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';


export default () => {
    const [directory, setDirectory] = useState([]);
    const [code, setCode] = useState(null)
    const [currentFileValue, setCurrentFileValue] = useState(null)
    const [currentFileName, setCurrentFileName] = useState<any>(null)


    function editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        // editor.focus();
    }
    function onChange(newValue, e) {
        console.log('onChange', newValue, e);
        setCurrentFileValue(newValue)
    }
    useEffect(() => {
        if (currentFileName) {
            apis.WORK.FileManage.getFileContent({ fileName: currentFileName }).then(
                res => {
                    console.log("resss", res)
                    setCode(res)
                }
            )
        }



    }, [currentFileName])
    useEffect(() => {
        apis.WORK.FileManage.getDirectory().then(
            res => {
                console.log("dir", res)
                setDirectory([res])
            }
        )
    }, [])

    function updateFile() {
        console.log("currentFileValue\n", currentFileValue)
        let url = process.env.REACT_APP_ENV == apis.envs.prodEnv ? apis.envs.prod_url + "/api/work/files/content" : process.env.REACT_APP_ENV == apis.envs.localEnv ? apis.envs.local_url + "/api/work/files/content" : apis.envs.dev_url + "/api/work/files/content";
        axios.put(url, { fileName: currentFileName, fileContent: currentFileValue }).then(
            res => {
                console.log("update", res)
            }
        )

    }
    const options: any = {
        language: ["python"]
    }
    const leftGridStyle: React.CSSProperties = {
        width: '30%',
        textAlign: 'center',
    };
    const rightGridStyle: React.CSSProperties = {
        width: '70%',
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        const theinfo: any = info;
        if (theinfo.node.directory == false) {
            setCurrentFileName(selectedKeys[0])
        }
    };


    return (
        <div>
            <Card title="Hello  here is file edit page">
                <Card.Grid style={leftGridStyle}>
                    <Tree
                        defaultExpandAll
                        onSelect={onSelect}
                        treeData={directory}

                    />
                </Card.Grid>
                <Card.Grid style={rightGridStyle}>
                    <MonacoEditor
                        width="800"
                        height="600"
                        language="python"
                        theme="vs-dark"
                        value={code}
                        options={options}
                        onChange={onChange}
                        editorDidMount={editorDidMount}
                    />
                </Card.Grid>
            </Card>


            <Button type="primary" onClick={updateFile}>SAVE</Button>

        </div>
    );
};