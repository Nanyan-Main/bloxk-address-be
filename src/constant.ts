export const ADDRESS_COLLECTION_NAME = 'addresses';
export const MAX_LENGTH_ADDRESS = Number(process.env.MAX_LENGTH_ADDRESS) || 100;
export const MIN_LENGTH_ADDRESS = Number(process.env.MIN_LENGTH_ADDRESS) || 40;
export const CSV_FIELDS = ['name', 'createdAt', 'userIp'];
export const RateLimits = {
  all: {
    limit: 10,
    ttl: 1, // in minutes
  },
};

export const ONE_MINUTE = 60 * 1000;
