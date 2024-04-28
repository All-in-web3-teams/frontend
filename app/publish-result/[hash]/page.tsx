'use client'
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function PublishResult({ params }: { params: { hash: string } }) {
  const router = useRouter()
  const { hash } = params


  return <div className="flex flex-col justify-between lg:flex-row">
    {hash}
  </div>
}
