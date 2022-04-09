import { Divider } from 'antd';
import Image from 'components/common/Image';
import DetailLine from 'components/main/MovieDetails/DetailLine';
import moment from 'moment';
import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function MovieDetails(props) {
  const { details } = props;

  const releaseDate = useMemo(() => {
    if (!details?.releaseDate) {
      return '';
    }

    return moment(details.releaseDate).format('DD/MM/YYYY');
  }, [details?.releaseDate]);

  return (
    <div className="flex items-start gap-6">
      <Image id={details?.img} className="w-80 aspect-[3/4] shrink-0" />

      <div>
        <h1 className="text-4xl text-dark">{details?.nameEn}</h1>

        <Divider />

        <div className="flex flex-col gap-2">
          <DetailLine title="Ngày ra mắt">{releaseDate}</DetailLine>

          <DetailLine title="Thể loại">
            {details?.categoriesObj.map((x, index, arr) => (
              <Fragment key={x.id}>
                <Link to={`/search?category=${x.id}`}>{x.name}</Link>

                {index < arr.length - 1 && ', '}
              </Fragment>
            ))}
          </DetailLine>

          <DetailLine title="Diễn viên">
            {details?.actorsObj.map((x, index, arr) => (
              <Fragment key={x.id}>
                <Link to={`/search?actor=${x.id}`}>{x.name}</Link>

                {index < arr.length - 1 && ', '}
              </Fragment>
            ))}
          </DetailLine>

          <DetailLine title="Đạo diễn">
            {details?.directorsObj.map((x, index, arr) => (
              <Fragment key={x.id}>
                <Link to={`/search?director=${x.id}`}>{x.name}</Link>

                {index < arr.length - 1 && ', '}
              </Fragment>
            ))}
          </DetailLine>

          <DetailLine title="Lượt đánh giá">
            {details?.reviews.length} lượt
          </DetailLine>

          {Boolean(details?.starAvg) && (
            <DetailLine title="Điểm trung bình">{details?.starAvg}</DetailLine>
          )}
        </div>

        <Divider />

        <div className="flex-1 text-sm">{details?.summary}</div>
      </div>
    </div>
  );
}
