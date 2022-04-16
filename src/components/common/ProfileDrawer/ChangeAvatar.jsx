import { Button, message } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

export default function ChangeAvatar() {
  const user = useUserStore(store => store.user);

  const setToken = useUserStore(store => store.setToken);

  const setUser = useUserStore(store => store.setUser);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleImageChange(e) {
    const [file] = e.target.files;

    e.target.value = '';

    if (!file.type.startsWith('image')) {
      message.error('File đã chọn không phải là một file ảnh!');
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append('file', file);

    // If user doesn't have avatar
    if (!user.img) {
      let uploadImgResponse;

      // Upload image
      try {
        uploadImgResponse = await axios.post('/image', formData);
      } catch (error) {
        setLoading(false);
        notifyError(error);
        return;
      }

      // Update user avatar with uploaded image
      try {
        const response = await axios.put(`/user/${user.id}`, {
          img: uploadImgResponse,
        });

        setToken(response);

        message.success('Cập nhật ảnh đại diện thành công!');
      } catch (error) {
        notifyError(error);
      } finally {
        setLoading(false);
      }

      return;
    }

    // User already have avatar

    // Update image
    try {
      await axios.put(`/image/${user.img}`, formData);

      message.success('Cập nhật ảnh đại diện thành công!');

      // Refresh avatar for <img/> tags to load the new image
      setUser({
        ...user,
        img: `${user.img}?${new Date().getTime()}`,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={handleClick} loading={loading}>
        Đổi ảnh đại diện
      </Button>

      <input
        onChange={handleImageChange}
        accept="image/*"
        ref={fileInputRef}
        hidden
        type="file"
      />
    </>
  );
}
