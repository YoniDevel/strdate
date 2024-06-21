const FullISOStringRegex: RegExp = /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))(?:[T](?:\d{2}):(?:\d{2})(?::(?:\d{2})(?:\.\d{1,9})?)?(?:Z)?)$/;
const nonFullISOStringRegex: RegExp = /^\d{4}-(0[1-9]|1[0-2])$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
const shortDateRegex: RegExp = /^(?:(0[1-9]|1[0-2])[-\/](0[1-9]|[12][0-9]|3[01])[-\/]([0-9]{4}))$|^(?:(\d{4})[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[12][0-9]|3[01]))$/;
const longDateRegex: RegExp = /^(?:(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(0?[1-9]|[12][0-9]|3[01])\s(\d{4}))$|^(?:(0?[1-9]|[12][0-9]|3[01])\s(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4}))$/;

export default {
    longDateRegex,
    shortDateRegex,
    FullISOStringRegex,
    nonFullISOStringRegex,
};
