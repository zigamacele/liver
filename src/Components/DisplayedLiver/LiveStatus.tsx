import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function LiveStatus({ member }: { member: any }) {
  function startedStreaming(startTime: string) {
    const difference = +new Date() - +new Date(startTime);
    const diffDuration = moment.duration(-difference).humanize(true);
    if (diffDuration === 'Invalid date') return 'starting soon';
    return diffDuration;
  }
  return (
    <div className="fixed text-xs top-0 left-0 w-screen h-16 dark:bg-slate-800/80 bg-slate-100/80 py-2 backdrop-blur-sm z-50 fade-in">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between px-3">
          <div>
            <div className="flex flex-col">
              <span className="text-[10px] font-light">
                {member.org || member.channel.org}
              </span>
              <span>{member.name || member.channel.english_name}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className="flex items-center gap-1.5">
              <div className="bg-red-500 h-2 w-2 rounded-full">
                <div className=" bg-red-500 h-2 w-2 rounded-full animate-ping"></div>
              </div>
              <span>{member.viewers || member.live_viewers || 0}</span>
            </div>
            <div className="flex gap-1 items-center">
              <ClockIcon className="h-4 w-4" />
              <span>
                {startedStreaming(member.started || member.start_actual)}
              </span>
            </div>
          </div>
        </div>
        <Marquee speed={45}>{member.title}</Marquee>
      </div>
    </div>
  );
}
