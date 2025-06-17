const redis = require("redis")

const redisClient = redis.createClient({
  // Add your Redis connection options here
  // For example:
  // host: 'localhost',
  // port: 6379,
  // password: 'your_redis_password'
})

redisClient.on("connect", () => console.log("Redis Connected!"))
redisClient.on("error", (err) => console.log("Redis Client Error", err))

// Connect to Redis (optional, you can also connect on demand)
// Note: In newer versions of `node-redis`, `connect()` returns a promise.
// You might want to handle it with `.then().catch()` or `await`
// if you want to ensure connection before starting your server.
redisClient.connect()

module.exports = redisClient
