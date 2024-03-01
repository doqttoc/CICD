import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Card, Divider, Modal, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const App: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ]);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageContent, setImageContent] = useState(null);
    const [imageLine, setImageLine] = useState(null);
    const [imageName, setImageName] = useState("File Name")

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType) as string;
        }

        setPreviewImage(file.url || (file.preview as string));
        // setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        console.log(info)


        setFileList(info.fileList);
        if (info.file.status == 'done' || info.file.status == 'error') {
            processImage(info.file)
        }

    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    function getBase64(file: FileType) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);

            reader.readAsDataURL(file);
        });
    }

    async function processImage(file: UploadFile) {
        try {
            console.log("thefile", file)
            setImageName(file.name)
            // console.log("thumbUrl", file.thumbUrl)
            const base64: string | number | boolean = await getBase64(file.originFileObj) as string | number | boolean;
            const encodedBase64 = encodeURIComponent(base64);
            console.log("encodedBase64", encodedBase64)
            setImageUrl(encodedBase64)

            // 使用encodedBase64进行后续操作，比如发送到服务器等
            // console.log("encodedBase64", imageUrl);

            await axios.post("http://localhost:7700/api/baiduyun/getFontFromImage", { "imageBase64": encodedBase64 }).then(
                res => {
                    console.log("resssss", res)
                    if (res.status == 200 && res.data.flag == true) {
                        const positionRes = res.data.data.positionRes.replaceAll('\n', '<br>')
                        console.log(positionRes)
                        setImageContent(positionRes)
                        setImageLine(res.data.data.lineRes)
                    }
                }
            )
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }


    return (
        <>
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <div>
                <Card title={imageName} bordered={false} style={{ width: 800 }}>

                    <h3>origin image:</h3>
                    {
                        fileList.length>=2 ? <img src={previewImage} /> : null
                    }

                    <h3>pos res:</h3>
                    <div dangerouslySetInnerHTML={{ __html: imageContent }} />
                    <Divider ></Divider>
                    <h3>line res:</h3>
                    <p>
                        {imageLine}
                    </p>
                </Card>
            </div>
            <Divider dashed />
        </>
    );
};

export default App;