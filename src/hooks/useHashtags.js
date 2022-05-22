import axios from 'axios';
import { useEffect, useState } from 'react';
import notifyError from 'utils/notifyError';

export default function useHashtags({
  loadOnMount = true,
  onLoadSuccess,
} = {}) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(loadOnMount);

  async function loadData() {
    setLoading(true);

    try {
      const response = await axios.get('tag');

      setData(response);

      onLoadSuccess?.(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOnMount && loadData();
  }, []);

  return { loadData, data, loading };
}
