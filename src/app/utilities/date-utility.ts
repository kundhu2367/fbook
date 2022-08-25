export function DateUtility(postedDate: string): string {
    
    let postCreateDate = Date.parse(postedDate);
    let diffInSeconds = Math.floor(Date.now() - postCreateDate) / 1000;
    let result;

    if (diffInSeconds >= 60) {
      result = (diffInSeconds / 60);

      if (result >= 60) {
        result = result / 60;

        if (result >= 24) {
          result = result / 24;
          result = Math.floor(result);
          let suffix = result === 1 ? ' day' : ' days';
          return (result + suffix);
        }

        result = Math.floor(result);
        let suffix = result === 1 ? ' hour' : ' hours';
        return (result + suffix);
      }

      result = Math.floor(result);
      let suffix = result === 1 ? ' minute' : ' minutes';
      return (result + suffix);
    }

    diffInSeconds = Math.floor(diffInSeconds);
    let suffix = diffInSeconds === 1 ? ' second' : ' seconds';
    return (diffInSeconds + suffix);
    
}
