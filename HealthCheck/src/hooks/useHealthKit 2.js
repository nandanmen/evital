import {useState} from 'react';
import AppleHealthKit from 'rn-apple-healthkit';

const PERMS = AppleHealthKit.Constants.Permissions;

const useHealthKit = () => {
  const [data, setData] = useState(null);

  const options = {
    permissions: {
      read: [PERMS.HeartRate],
    },
  };

  AppleHealthKit.initHealthKit(options, () => {});

  AppleHealthKit.getHeartRateSamples(
    {
      startDate: new Date('sep 19 2017').toISOString(),
      limit: 5,
    },
    (err, results) => {
      if (err) {
        console.log(`Error returning latest height`, err);
      } else {
        if (!data) setData(results);
      }
    },
  );

  return data;
};

export default useHealthKit;
