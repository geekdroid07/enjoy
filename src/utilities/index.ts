import type { RcFile } from 'antd/es/upload/interface';
import { message } from 'antd';

export * from './firebase.utility';
export * from './load-abort.utility';


export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt2M;
};