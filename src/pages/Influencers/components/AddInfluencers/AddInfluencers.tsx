import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useFetchAndLoad from 'hooks/useFetchAndLoad';
import displayToast from 'utilities/toast.utility';
import { Card, Checkbox, DatePicker, FormInstance, Select, Image, Typography, AutoComplete } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Avatar, Input, Button, Form, InputNumber } from 'antd';
import { message, Upload } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getById, post, put } from 'services/admin.service';
import { getAll } from 'services/admin.service';
import profile from 'assets/images/profile.png';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage, auth } from 'utilities/firebase.utility';

import { beforeUpload, getBase64 } from 'utilities';
import './AddInfluencers.scss';
import Coache from 'models/Coache';
import { FormLabel, Switch } from '@chakra-ui/react';
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Dragger } = Upload;
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

function AddCoachee() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loadingImage, setLoading] = useState(false);

  const handleChangeImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
    }
  };

  const [coaches, setCoaches] = useState<{ value: string; label: string; }[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();
  const { id } = useParams();
  const initialValues = () => ({
    focusArea: '',
    // Coach: '',
    statusArea: null,
    urlImgFocusArea: null
  });


  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const { handleSubmit, setFieldValue, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialValues(),
      onSubmit: async (form, { resetForm }) => {
        try {
          if (window.location.pathname.includes('edit')) {
            await callEndpoint(put(id, form));
            displayToast('focus area actualizado con éxito', 'success');
          } else {
            await callEndpoint(post(form));
            displayToast('focus area creado con éxito', 'success');
          }
          navigate('/focusareas');
          resetForm();
        } catch (error: any) {
          if (error?.response?.data?.message) {
            displayToast(error.response.data.message, 'error');
          }
        }
      }
    });


  const GetData = async () => {
    const { data } = await callEndpoint(getAll());
    if (data.data) {
      setCoaches(data.data.map(x => ({ label: `${x.name} - ${x.email}`, value: x._id })));
    }
  }

  useEffect(() => { }, [loading]);
  useEffect(() => {
    if (window.location.pathname.includes('view') || window.location.pathname.includes('edit')) {
      callEndpoint(getById(id)).then(({ data }) => {
        for (const key in initialValues()) {
          if (Object.prototype.hasOwnProperty.call(data.data, key)) {
            const element = data.data[key];
            form.setFieldsValue({ [key]: element });
            setFieldValue(key, element);
            if (key === 'urlImgFocusArea') {
              setImageUrl(element)
            }
          }
        }
      });
    }
    if (window.location.pathname.includes('view')) {
      setComponentDisabled(true);
    }

    GetData();
  }, [])

  const TitleCustom = () => {
    if (window.location.pathname.includes('view')) {
      return <h2 className="title_table">Ver Focus area</h2>;
    } else if (window.location.pathname.includes('edit')) {
      return <h2 className="title_table">Editar Focus area</h2>;
    } else {
      return <h2 className="title_table">Crear Focus area</h2>;
    }
  }

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const imageRef = ref(
        storage,
        `focusareas/${id || file.uid}/${file.name}`
      );
      await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      setImageUrl(downloadUrl);
      setFieldValue('urlImgFocusArea', downloadUrl);
      onSuccess("Ok");
      return downloadUrl;
    } catch (err) {
      if (err instanceof Error) {
        onError({ err });
      }
    }
  };


  return (
    <div className="Coaches">
      <h2 className="title_table"><TitleCustom /></h2>
      <Card>
        <Form
          className='flex form-crud'
          layout='vertical'
          form={form}
          name="AddCoach control-ref"
          onFinish={handleSubmit}
          disabled={componentDisabled}
        >
          <div>
            <Dragger
              className='dragger-img'
              name="file"
              accept="image/*"
              customRequest={uploadImage}
              beforeUpload={beforeUpload}
              onChange={handleChangeImage}
              disabled={componentDisabled}
              height={400}>
              <Avatar size="large" className='avatar-img' src={imageUrl || profile} />
              <p className="ant-upload-hint">Haga clic o arrastre el archivo</p>
              <Meta className='flex justify-center mt-5' title="Coach: N/A" />
            </Dragger>
          </div>

          <div className='flex pl-5 column w-100'>

            <div className='mb-5'>
              <Form.Item name="focusArea"
                className="mr-5 AddCoach__input"
                label="Nombre focus area"
                rules={[{ required: true, message: 'Por favor introduce el nombre del coach.' }]}
              >
                <Input
                  name="focusArea"
                  className="Add__input_control"
                  placeholder="Introduce el nombre del are de foco"
                  onChange={handleChange}
                  value={values.focusArea}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Text>Status Area Focus</Text>

              <Form.Item name="statusArea"
                className="Add__input checkedfocusarea"
              >
                <Switch
                  size={'lg'}
                  defaultChecked={false}
                  isChecked={values.statusArea}
                  value={values.statusArea}
                  onChange={(e) => {

                    setFieldValue('statusArea', e.target.checked)
                  }}
                />
              </Form.Item>



              {/* <Form.Item name="Coach"
                className="Add__input"
                label="Coach"
                rules={[{ required: true, message: 'Por favor introduce Coach.' }]}
              >

                <Select
                  id="focusareacoach"
                  style={{ width: 200 }}
                  placeholder="Select a Coach"
                  optionFilterProp="coaches"
                  onChange={(e) => {
                    setFieldValue('Coach', e)
                  }}
                  options={coaches}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                </Select>
              </Form.Item> */}

            </div>



            <div className='flex justify-end'>
              <Button type="primary" htmlType="submit">
                {window.location.pathname.includes('edit') ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button style={{ marginLeft: 20 }} htmlType="button" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
              <Button style={{ marginLeft: 20 }} type="dashed" htmlType="button" onClick={() => form.resetFields()}>
                Borrar
              </Button>
            </div>

          </div>


        </Form>
      </Card>
    </div>
  );
}

export default AddCoachee;
