import dotenv from 'dotenv'
dotenv.config()
interface IConfig {
  port: number
  accessKeyId: string
  secretAccessKey: string
  s3Bucket: string
  s3BucketRegion: string
}

export const config: IConfig = {
  port: (process.env.PORT && parseInt(process.env.PORT)) || 5000,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  s3Bucket: process.env.AWS_S3_BUCKET || '',
  s3BucketRegion: process.env.AWS_S3_BUCKET_REGION || ''
}
