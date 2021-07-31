import d3 from '../../../lib/d3';

export const formatDate = d3.timeFormat('%m-%d-%Y');
export const parseDate = d3.timeParse('%m-%d-%Y');
export const formatTime = d3.timeFormat('%I:%M %p');
export const formatIso = d3.isoFormat;
export const parseIso = d3.isoParse;
