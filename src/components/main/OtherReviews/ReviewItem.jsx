import { Rate, Tag } from 'antd';
import clsx from 'clsx';
import Avatar from 'components/common/Avatar';
import moment from 'moment';
import { useMemo } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function ReviewItem(props) {
  const { review, className, hasShadow = true, hasPadding = true } = props;

  const { content, createdAt, star, user } = review || {};

  const { img, username } = user || {};

  const dateString = useMemo(
    () => moment(createdAt).format('DD/MM/YYYY'),
    [createdAt]
  );

  return (
    <div
      className={clsx(
        'flex items-start gap-4 bg-white rounded-sm w-fit',
        hasShadow && 'shadow-md',
        hasPadding && 'p-4',
        className
      )}
    >
      <Avatar imgId={img} className="shrink-0" />

      <div>
        <div className="text-base font-medium">{username}</div>

        <div className="mt-4 text-sm leading-none opacity-80">{dateString}</div>

        <div className="flex gap-2 mt-4 text-xl leading-none text-primary">
          <Rate
            value={star}
            count={10}
            character={({ index, value }) =>
              index < value ? <FaStar /> : <FaRegStar />
            }
            disabled
          />
        </div>

        <div className="mt-2 text-base whitespace-pre-wrap">{content}</div>

        <div className="mt-4">
          {review.tagsObj.map(hashtag => (
            <Tag key={hashtag.id}>{hashtag.name}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
