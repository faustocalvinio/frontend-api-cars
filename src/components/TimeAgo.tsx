import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export const TimeAgo = ({ lastUpdate }: { lastUpdate: string }) => {
   const [timeSince, setTimeSince] = useState("");
   useEffect(() => {
      const date = dayjs(lastUpdate);
      const formattedDate = date.format("DD-MM-YYYY HH:mm:ss");
      setTimeSince(formattedDate);
   }, [lastUpdate]);

   return <span className="text-lg">{timeSince}</span>;
};
