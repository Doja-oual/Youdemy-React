import React, { useState, useEffect } from 'react';
import { getTags } from '../services/api';
import ErrorMessage from '../components/common/ErrorMessage';
import TagList from '../components/tags/TagList';
import Loader from '../components/common/Loader';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} retry={() => setLoading(true)} />;

  return (
    <div>
      <h1 className="text-2xl font-bold">Tags</h1>
      <TagList tags={tags} />
    </div>
  );
};

export default Tags;
