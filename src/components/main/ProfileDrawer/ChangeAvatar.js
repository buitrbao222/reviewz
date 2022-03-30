import { Button, message } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';
import useUserStore from 'store/userStore';

export default function ChangeAvatar() {
  const user = useUserStore(store => store.user);

  const setToken = useUserStore(store => store.setToken);

  const setUser = useUserStore(store => store.setUser);

  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  function handleClick() {
    inputRef.current?.click();
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

        console.log('Upload image response', uploadImgResponse);
      } catch (error) {
        console.log('Upload image error', error);

        setLoading(false);

        return;
      }

      // Update user avatar with uploaded image
      try {
        const response = await axios.put(`/user/${user.id}`, {
          img: uploadImgResponse,
        });

        console.log('Update user response', response);

        setToken(response);

        message.success('Cập nhật ảnh đại diện thành công!');
      } catch (error) {
        console.log('Update user error', error);
      } finally {
        setLoading(false);
      }

      return;
    }

    // User already have avatar

    // Update image
    try {
      const response = await axios.put(`/image/${user.img}`, formData);

      console.log('Update image response', response);

      message.success('Cập nhật ảnh đại diện thành công!');

      // Refresh avatar for <img/> tags to load the new image
      setUser({
        ...user,
        img: `${user.img}?${new Date().getTime()}`,
      });
    } catch (error) {
      console.log('Update image error', error);
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
        ref={inputRef}
        hidden
        type="file"
      />
    </>
  );
}
