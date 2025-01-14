export const calculateTimeDiff = (date) => {
  const now = new Date();
  const executed = new Date(date);
  const diff = parseInt((now.getTime() - executed.getTime()) / 1000 / 60);
  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${parseInt(diff / 60)}시간 전`;
  return `${parseInt(diff / 1440)}일 전`;
}

export const setCancelableInterval = (callback, time) => {
  let flag = true;

  const tick = () => {
    setTimeout(() => {
      if (!flag) return;
      callback();
      tick();
    }, time);
  }

  tick();

  return () => { flag = false; };
};
