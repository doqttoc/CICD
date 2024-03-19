import axios from "axios";
import React, { useState } from 'react';

import { useEffect } from 'react';

import { Card, Divider } from "antd";

import { apis } from "@/http/api";
import MonacoEditor from 'react-monaco-editor';





export default () => {
  useEffect(() => {
    // 在组件加载完成后，执行数据加载操作
    loadData();
  }, []);

  const [imageContent, setImageContent] = useState(null);
  const [imageLine, setImageLine] = useState(null);
  const [imageName, setImageName] = useState("File Name:")

  function loadData() {
    apis.userManageApi.get({}).then(
      res => {
        console.log("data", res)
      }
    )
  }

  const [imageBase64, setImageBase64] = useState('');

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setImageName(file.name)
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;
      setImageBase64(base64String as string);
      let url = process.env.REACT_APP_ENV == apis.envs.prodEnv ? apis.envs.prod_url + "/api/baiduyun/getFontFromImage" : process.env.REACT_APP_ENV == apis.envs.localEnv ? apis.envs.local_url + "/api/baiduyun/getFontFromImage" : apis.envs.dev_url + "/api/baiduyun/getFontFromImage";
      console.log("url", url)
      axios.post(url, { "imageBase64": encodeURIComponent(base64String as string) }).then(
        res => {
          if (res.status == 200 && res.data.flag == true) {
            // const positionRes = res.data.data.positionRes.replaceAll('\n', '<br>')
            const positionRes = res.data.data.positionRes
            setImageContent(positionRes)
            setImageLine(res.data.data.lineRes)
          }
        }
      )
    };

    reader.readAsDataURL(file);
  }

  function editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    // editor.focus();
  }
  function onChange(newValue, e) {
    console.log('onChange', newValue, e);
    // setCurrentFileValue(newValue)
  }


  const CardHeader = (
    <div>
      <h3>{imageName}</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

    </div>
  )

  const options: any = {
    language: ["python", "sql", "shell"]
  }



  return (
    <div >
      <h1>hey man come on  just practice everyday!</h1>
      <Divider></Divider>
      <div>
        <Card title={CardHeader} bordered={false} >
          {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
          <h3>origin image:</h3>
          {imageBase64 && <img src={imageBase64} alt="Selected Image" width={700} />}
          <h3>pos res:</h3>
          {/* <div dangerouslySetInnerHTML={{ __html: imageContent }} /> */}
          <MonacoEditor
            width="800"
            height="600"
            language="python"
            theme="vs-dark"
            value={imageContent}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
          />
          <Divider ></Divider>
          <h3>line res:</h3>
          <p>
            {imageLine}
          </p>
        </Card>
      </div>


    </div>
  );
};