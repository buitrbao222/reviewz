import { Divider, Spin } from 'antd';
import axios from 'axios';
import MovieDetails from 'components/main/MovieDetails';
import MyReview from 'components/main/MyReview';
import OtherReviews from 'components/main/OtherReviews';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

export default function MovieDetailsPage() {
  const { id } = useParams();

  const user = useUserStore(store => store.user);

  const [loading, setLoading] = useState(2);

  const [details, setDetails] = useState();

  const [otherReviews, setOtherReviews] = useState();

  const [myReview, setMyReview] = useState();

  useEffect(() => {
    loadDetails();
    loadOtherReviews();
  }, []);

  async function loadDetails() {
    try {
      const response = await axios.get(`/movie/detail/${id}`);

      setDetails(response);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(x => x - 1);
    }
  }

  async function loadOtherReviews() {
    try {
      const reviews = await axios.get(`/review/movie/${id}`);

      let otherReviews = [];
      let myReview = undefined;

      reviews.forEach(review => {
        if (review.idUser === user?.id) {
          myReview = review;
          return;
        }

        if (review.verified) {
          otherReviews.push(review);
        }
      });

      setOtherReviews(otherReviews);
      setMyReview(myReview);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(x => x - 1);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spin size="large" className="scale-[3]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 py-[50px] text-dark">
      <MovieDetails details={details} />

      <Divider />

      <MyReview
        myReview={myReview}
        setMyReview={setMyReview}
        movieId={details.id}
      />

      <Divider />

      <OtherReviews reviews={otherReviews} />
    </div>
  );
}
