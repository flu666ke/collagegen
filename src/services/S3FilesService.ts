import * as AWS from 'aws-sdk'
import { Qid } from 'qid'

export interface S3ManagerConfig {
  accessKeyId: string
  secretAccessKey: string
  s3Bucket: string
  s3BucketRegion: string
}

export default function s3FilesService(config: S3ManagerConfig) {
  const { accessKeyId, secretAccessKey, s3BucketRegion, s3Bucket } = config

  if (!(accessKeyId && secretAccessKey && s3BucketRegion && s3Bucket)) {
    throw new Error('Required AWS S3 parameters are missing.')
  }

  const fileExtension = 'jpeg'

  AWS.config.update({
    region: s3BucketRegion,
    credentials: new AWS.Credentials({
      accessKeyId,
      secretAccessKey
    })
  })

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: s3Bucket }
  })

  async function uploadCollage(bufferCollage: any) {
    const qid = Qid()
    const key = `user-collages/${qid}.${fileExtension}`
    const params = {
      ACL: 'public-read',
      Bucket: s3Bucket,
      Key: key,
      Body: bufferCollage
    }

    try {
      await s3.upload(params).promise()

      return {
        id: qid,
        imageUrl: `https://${s3Bucket}.s3.${s3BucketRegion}.amazonaws.com/${key}`
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async function getCollage(collageId: string) {
    const params = {
      Bucket: s3Bucket,
      Key: `user-collages/${collageId}.${fileExtension}`
    }
    try {
      await s3.getObject(params).promise()

      return {
        id: collageId,
        imageUrl: `https://${s3Bucket}.s3.${s3BucketRegion}.amazonaws.com/user-collages/${collageId}.${fileExtension}`
      }
    } catch (err) {
      throw new Error(`Could not retrieve file from S3: ${err.message}`)
    }
  }

  return {
    uploadCollage,
    getCollage
  }
}

export type S3FilesService = ReturnType<typeof s3FilesService>
