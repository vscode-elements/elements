let memoizedURL: string;

const getBaseURL = () => {
  if (memoizedURL) {
    return memoizedURL;
  }

  const s = (<HTMLScriptElement>document.querySelector('script[src*="vscwe"]'));

  if (s) {
    const matches = /(.+\/)vscwe/g.exec(s.src);

    if (!matches) {
      memoizedURL = '';
      return memoizedURL;
    }

    memoizedURL = matches[1];
    return memoizedURL;
  }

  memoizedURL = '';
  return memoizedURL;
}

export default getBaseURL;
