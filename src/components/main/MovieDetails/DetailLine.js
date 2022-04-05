import clsx from 'clsx';

export default function DetailLine(props) {
  const { title, className, children } = props;

  return (
    <div className={clsx('flex whitespace-pre-wrap', className)}>
      <div className="font-medium">{`${title}: `}</div> {children}
    </div>
  );
}
