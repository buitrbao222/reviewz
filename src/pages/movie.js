import { Divider, Spin } from 'antd';
import axios from 'axios';
import MovieDetails from 'components/main/MovieDetails';
import MyReview from 'components/main/MyReview';
import Reviews from 'components/main/Reviews';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from 'store/userStore';
import notifyError from 'utils/notifyError';

export default function MovieDetailsPage() {
  const { id } = useParams();

  const user = useUserStore(store => store.user);

  const [loading, setLoading] = useState(2);

  const [details, setDetails] = useState();

  const [reviews, setReviews] = useState();

  const [myReview, setMyReview] = useState();

  useEffect(() => {
    loadDetails();
    loadReviews();
  }, []);

  async function loadDetails() {
    try {
      const response = await axios.get(`/movie/detail/${id}`);

      console.log('Get movie details response', response);

      let otherReviews = [];
      let myReview;

      response.reviews.forEach(review => {
        if (review.idUser === user.id) {
          myReview = review;
        } else {
          otherReviews.push(review);
        }
      });

      setReviews(otherReviews);

      setMyReview(myReview);

      setDetails(response);
    } catch (error) {
      console.log('Get movie details error', error);

      notifyError(error);
    } finally {
      setLoading(x => x - 1);
    }
  }

  async function loadReviews() {
    try {
      const response = await axios.get(`/review/movie/${id}`);

      console.log('Get movie reviews response', response);

      setReviews(response);
    } catch (error) {
      console.log('Get movie reviews error', error);

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
        movieId={details.id}
        refresh={loadReviews}
      />

      <Divider />

      <Reviews reviews={reviews} />
    </div>
  );
}
